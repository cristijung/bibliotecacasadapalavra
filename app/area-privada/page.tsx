"use client"; 

import React from 'react';


export default function PrivateAreaPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh', 
      backgroundColor: '#fff',
      color: '#333',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#6a1b9a' 
      }}>Bem-vindo(a) à Área Privada!</h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#555',
        maxWidth: '600px',
        lineHeight: '1.5'
      }}>
        Parabéns! Você acessou uma página restrita.
        Aqui você poderá encontrar conteúdo exclusivo, gerenciar seu perfil e muito mais.
      </p>
      <p style={{
        marginTop: '1.5rem',
        fontSize: '1rem',
        color: '#777'
      }}>
        Este é apenas UM COMPONENTE MOCK. Futuramente, adicionaremos a lógica real e os dados desta área consumindo uma API de cadastro/login
      </p>
    </div>
  );
}
