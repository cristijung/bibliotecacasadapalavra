
import React from 'react';
import styles from './Hero.module.scss';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        {/* Título principal da seção Hero */}
        <h2 className={styles.headline}>Sua Casa para Histórias e Conhecimento</h2>
        {/* Subtítulo ou tagline */}
        <p className={styles.tagline}>
          Descubra mundos, aprenda algo novo e conecte-se com a magia da leitura.
        </p>
        {/* Chamada para ação */}
        <Link href="/catalogo" className={styles.ctaButton}>
          Explore Nosso Catálogo
        </Link>
      </div>
    </section>
  );
};

