'use client'; 

import React, { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logo_bi_nobg.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image src={Logo} alt="Casa Da Palavra" width={50} height={50} />
          <Link href="/" className={styles.logo}>
            <h1>Biblioteca Casa da Palavra</h1>
          </Link>
        </div>

        {/* menu de hambúrguer */}
        <button className={styles.menuToggle} onClick={toggleMenu}>
          <div className={isMenuOpen ? styles.open : ''}></div>
          <div className={isMenuOpen ? styles.open : ''}></div>
          <div className={isMenuOpen ? styles.open : ''}></div>
        </button>

        <div className={`${styles.navContainer} ${isMenuOpen ? styles.open : ''}`}>
          {/* nav principal */}
          <nav className={styles.nav}>
            <ul>
              <li><Link href="/" className={styles.navLink} onClick={toggleMenu}>Home</Link></li>
              <li><Link href="/catalogo" className={styles.navLink} onClick={toggleMenu}>Catálogo</Link></li>
              <li><Link href="/eventos" className={styles.navLink} onClick={toggleMenu}>Eventos</Link></li>
              <li><Link href="/sobre" className={styles.navLink} onClick={toggleMenu}>Sobre</Link></li>
              <li><Link href="/blog" className={styles.navLink} onClick={toggleMenu}>Blog</Link></li>
              <li><Link href="/contato" className={styles.navLink} onClick={toggleMenu}>Contato</Link></li>
            </ul>
          </nav>

          {/* search bar e icone do user */}
          <div className={styles.actions}>
            <input type="text" placeholder="Pesquisar livros..." className={styles.searchBar} />            
            <Link href="/login" className={styles.userButton} aria-label="Área do Usuário">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
