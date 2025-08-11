"use client";

import React from "react";
import AuthForm from "./AuthForm";
import pageStyles from "./LoginPage.module.scss";

import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function LoginPage() {
  return (
    <div className={pageStyles.loginPageContainer}>
      <div className={pageStyles.contentWrapper}>
        <div className={pageStyles.infoColumn}>
          <h2 className={pageStyles.exclusiveAreaTitle}>Área Exclusiva</h2>
          <p className={pageStyles.exclusiveAreaText}>
            Faça login ou cadastre-se para acessar conteúdos personalizados,
            gerenciar suas preferências e explorar recursos especiais feitos sob
            medida para você!
          </p>

          <h2>Nossos Contatos</h2>
          <div className={pageStyles.contactItem}>
            <FaPhone size={24} />
            <a href="tel:+555135190097">+55 51 9999-9999</a>
          </div>
          <div className={pageStyles.contactItem}>
            <MdEmail size={24} />
            <a href="mailto:contato@biblioteca.com.br">
              contato@casadapalavra.com.br
            </a>
          </div>
          <div className={pageStyles.contactItem}>
            <FaMapMarkerAlt size={24} />
            <p>
              Av. Protásio Alves, 12345 - Petrópolis, Porto Alegre - RS,
              91310-000
            </p>
          </div>
          <p className={pageStyles.contactItem}>
            <FaWhatsapp size={24} />
            Fale Conosco no WhatsApp
          </p>

          <h3 className={pageStyles.horario}>Horário de Atendimento</h3>
          <p>Segunda a Sexta: 08h às 18h</p>
          <p>Sábados: 09h às 13h</p>
          <p>(Atendimento de emergência - Consulte-nos)</p>
        </div>

        <div className={pageStyles.formColumn}>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
