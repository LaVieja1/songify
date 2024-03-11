"use client";

import { useRouter } from "next/navigation";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Bienvenido otra vez"
      description="Inicia sesión para continuar"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: "Correo electrónico",
              email_input_placeholder: "Ingresa tu correo",
              password_label: "Contraseña",
              password_input_placeholder: "Ingresa tu contraseña",
              button_label: "Iniciar sesión",
              link_text: "¿No tienes una cuenta? Registrate",
            },
            sign_up: {
              email_label: "Correo electrónico",
              email_input_placeholder: "Ingresa tu correo",
              password_label: "Contraseña",
              password_input_placeholder: "Ingresa tu contraseña",
              button_label: "Registrate",
              link_text: "¿Ya tienes una cuenta? Inicia sesión",
            },
            forgotten_password: {
              link_text: "¿Olvidaste tu contraseña?",
              email_label: "Correo electrónico",
              email_input_placeholder: "Ingresa tu correo",
              button_label: "Enviar mail",
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
