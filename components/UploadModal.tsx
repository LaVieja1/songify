"use client";

import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";

const UploadModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const uploadModal = useUploadModal();
	const {user} = useUser();
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			author: '',
			title: '',
			song: null, // NULL porque son archivos.
			image: null,
		}
	})

	const onChange = (open: boolean) => {
		if (!open) {
			reset();
			uploadModal.onClose();
		}
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);

			const imageFile = values.image?.[0];
			const songFile = values.song?.[0];

			if (!imageFile || !songFile || !user) {
				toast.error('Campos restantes');
				return;
			}

			const uniqueID = uniqid();

			// Subir canción
			const {
				data: songData,
				error: songError,
			} = await supabaseClient
				.storage
				.from('songs')
				.upload(`song-${values.title}-${uniqueID}`, songFile, {
					cacheControl: '3600',
					upsert: false,
				})

			if (songError) {
				setIsLoading(false);
				return toast.error('Hubo un error al subir tu canción');
			}

			//Subir imagen
			const {
				data: imageData,
				error: imageError,
			} = await supabaseClient
				.storage
				.from('images')
				.upload(`image-${values.title}-${uniqueID}`, imageFile, {
					cacheControl: '3600',
					upsert: false,
				})

			if (imageError) {
				setIsLoading(false);
				return toast.error('Hubo un error al subir tu imagen');
			}

			const {
				error: supabaseError
			} = await supabaseClient
				.from('songs')
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					image_path: imageData.path,
					song_path: songData.path,
				});

			if (supabaseError) {
				setIsLoading(false);
				return toast.error(supabaseError.message);
			}

			router.refresh();
			setIsLoading(false);
			toast.success('Canción subida');
			reset();
			uploadModal.onClose();
			
		} catch (error) {
			toast.error('Hubo un error al subir tu canción');
		} finally {
			setIsLoading(false);
		}
	};

	return ( 
		<Modal title="¡Subí tus canciones!" description="Subir un archivo mp3" isOpen={uploadModal.isOpen} onChange={onChange}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4"
			>
				<Input 
					id="title"
					disabled={isLoading}
					{...register('title', { required: true })}
					placeholder="Título de la canción"
				/>
				<Input 
					id="author"
					disabled={isLoading}
					{...register('author', { required: true })}
					placeholder="Autor"
				/>
				<div>
					<div className="pb-1">
						Seleccionar un archivo mp3
					</div>
					<Input 
						id="song"
						type="file"
						disabled={isLoading}
						accept=".mp3"
						{...register('song', { required: true })}
					/>
				</div>
				<div>
					<div className="pb-1">
						Seleccionar una imagen
					</div>
					<Input 
						id="image"
						type="file"
						disabled={isLoading}
						accept="image/*"
						{...register('image', { required: true })}
					/>
				</div>
				<Button disabled={isLoading} type="submit">
					Subir
				</Button>
			</form>
		</Modal>
	 );
}
 
export default UploadModal;