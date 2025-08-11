"use client"; 

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"; 

import styles from "./LoginAuth.module.scss";

// validação para Login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

//  validação para Cadastro
const registerSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], // caminho para exibir o erro no campo de confirmação ......
});

type CombinedAuthFormInputs = z.infer<typeof loginSchema> & {
  confirmPassword?: string;
};

export default function AuthForm() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null); // msg de sucesso/erro

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CombinedAuthFormInputs>({ 
    resolver: zodResolver(isRegisterMode ? registerSchema : loginSchema),
  });

  // Handler de submissão do formulário
  const onSubmit: SubmitHandler<CombinedAuthFormInputs> = async (data) => {
    setAuthMessage(null); // limpando as mensagens anteriores

    try {
      if (isRegisterMode) {
        // aqui vai a Lógica de REGISTRO e depois se substitui pela API de registro
        console.log("Tentativa de Registro:", data);
        // simulação de API
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        if (data.email === "erro@exemplo.com") {
          throw new Error("E-mail já cadastrado!");
        }
        setAuthMessage("Cadastro realizado com sucesso! Faça login para continuar.");
      } else {
        // aqui vai a Lógica de LOGIN e depois se substitui pela API de registro
        console.log("Tentativa de Login:", data);
        // simulação de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (data.email !== "test@exemplo.com" || data.password !== "senha123") {
          throw new Error("E-mail ou senha incorretos.");
        }
        setAuthMessage("Login realizado com sucesso! Redirecionando..."); //dá para colocar um spinner
        // exemplo de redirecionamento após o login
        // será preciso importar useRouter do 'next/navigation' para isso -- IMPORTANTE
        // import { useRouter } from 'next/navigation';
        // const router = useRouter();
        // router.push('/dashboard'); 
      }
      reset(); // limpando o formulário após o sucesso
    } catch (error: unknown) { 
      // tratameno seguro do tipo 'unknown' -- acima normalmente se usaria o 'any' mas..., não é boa prática
      if (error instanceof Error) {
        setAuthMessage(error.message || "Ocorreu um erro. Tente novamente.");
      } else if (typeof error === 'string') {
        setAuthMessage(error || "Ocorreu um erro desconhecido.");
      } else {
        setAuthMessage("Ocorreu um erro desconhecido.");
      }
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(prev => !prev);
    reset(); 
    setAuthMessage(null); 
  };

  return (
    <div className={styles.authBox}>
      <h1 className={styles.title}>{isRegisterMode ? "Cadastre-se" : "Entrar"}</h1>

      <div className={styles.formToggle}>
        <button
          type="button"
          className={!isRegisterMode ? styles.active : ""}
          onClick={() => setIsRegisterMode(false)}
        >
          Entrar
        </button>
        <button
          type="button"
          className={isRegisterMode ? styles.active : ""}
          onClick={() => setIsRegisterMode(true)}
        >
          Cadastre-se
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {authMessage && (
          <p className={authMessage.includes("sucesso") ? "text-green-600 mb-4" : "text-red-600 mb-4"}>
            {authMessage}
          </p>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>E-mail</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={styles.input}
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Senha</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={styles.input}
            placeholder="********"
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        {isRegisterMode && (
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={styles.input}
              placeholder="********"
            />
            {errors.confirmPassword && (
              <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : (isRegisterMode ? "Cadastrar" : "Entrar")}
        </button>
      </form>

      <p className={styles.switchText}>
        {isRegisterMode ? "Já tem uma conta?" : "Não tem uma conta?"}
        <button type="button" onClick={toggleMode}>
          {isRegisterMode ? "Entrar" : "Cadastre-se"}
        </button>
      </p>
    </div>
  );
}
