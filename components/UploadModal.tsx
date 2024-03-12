"use client";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";

const UploadModal = () => {
	const uploadModal = useUploadModal();

	const onChange = (open: boolean) => {
		if (!open) {
			//Reset the form
			uploadModal.onClose();
		}
	}

	return ( 
		<Modal title="¡Subí tus canciones!" description="Subir un archivo mp3" isOpen={uploadModal.isOpen} onChange={onChange}>
			Subir contenido
		</Modal>
	 );
}
 
export default UploadModal;