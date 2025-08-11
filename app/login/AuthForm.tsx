"use client"; 

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useRouter } from 'next/navigation'; // useRouter para redirecionamento

import styles from "./LoginAuth.module.scss";

// tipos para um usuário simplificado para armazenar no localStorage - isto está mockado
interface User {
  email: string;
  password: string;
}


// validação para Login
const loginSchema = z.object({  
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// validação para Cadastro
const registerSchema = z.object({  
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

// aqui o Zod é usacdo p extrair o tipo q foi inferido nos schem e a lib
// deduz com base na estrutura declarada anteriormente vai assumir que:
// email é string e senha é string
type CombinedAuthFormInputs = z.infer<typeof loginSchema> & {
  confirmPassword?: string;
};

// functions utilitarias para o localStorage
const LOCAL_STORAGE_KEY = "mock_users";

const getUsersFromLocalStorage = (): User[] => {
  if (typeof window !== 'undefined') { // garantindo que estamos no ambiente do navegador
    const usersJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }
  return [];
};

const saveUsersToLocalStorage = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }
};

export default function AuthForm() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null); 
  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CombinedAuthFormInputs>({ 
    resolver: zodResolver(isRegisterMode ? registerSchema : loginSchema),
  });

  const onSubmit: SubmitHandler<CombinedAuthFormInputs> = async (data) => {
    setAuthMessage(null); 

    try {
      // simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const users = getUsersFromLocalStorage();

      if (isRegisterMode) {
        // aqui vai a lógica do REGISTRO com localStorage depois se substitui pela API
        const userExists = users.some(user => user.email === data.email);
        if (userExists) {
          throw new Error("E-mail já cadastrado. Por favor, faça login.");
        }

        const newUser: User = { email: data.email, password: data.password };
        saveUsersToLocalStorage([...users, newUser]);
        
        setAuthMessage("Cadastro realizado com sucesso! Faça login para continuar.");
        setIsRegisterMode(false); // voltando para o modo de login após o cadastro
        reset();
      } else {
        // aqui vai a lógica do LOGIN com localStorage depois se substitui pela API
        const foundUser = users.find(
          user => user.email === data.email && user.password === data.password
        );

        if (!foundUser) {
          throw new Error("E-mail ou senha incorretos.");
        }

        setAuthMessage("Login realizado com sucesso! Redirecionando para a área privada...");
        // simular a persistência de sessão, podemos salvar um token mock no localStorage aqui q depois pode ser na API
        if (typeof window !== 'undefined') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUserEmail', data.email);
        }
        router.push('/area-privada'); 
      }
    } catch (error: unknown) { 
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
