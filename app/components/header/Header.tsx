
import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* aqui vao o logo */}
        <Link href="/" className={styles.logo}>
          <h1>Biblioteca Casa da Palavra</h1>
        </Link>

        {/* navegação principal */}
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/" className={styles.navLink}>Home</Link></li>
            <li><Link href="/catalogo" className={styles.navLink}>Catálogo</Link></li>
            <li><Link href="/eventos" className={styles.navLink}>Eventos</Link></li>
            <li><Link href="/sobre" className={styles.navLink}>Sobre</Link></li>
            <li><Link href="/contato" className={styles.navLink}>Contato</Link></li>
          </ul>
        </nav>

        {/* barra de pesquisa e icon de user */}
        <div className={styles.actions}>
          <input type="text" placeholder="Pesquisar livros..." className={styles.searchBar} />
          <button className={styles.userButton}>          
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

