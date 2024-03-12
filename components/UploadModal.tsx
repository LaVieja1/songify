"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useUploadModal from "@/hooks/useUploadModal";

import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";

const UploadModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const uploadModal = useUploadModal();

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
		// Upload to supabase
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