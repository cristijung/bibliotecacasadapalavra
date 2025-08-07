import styles from './Footer.module.scss';

export default function Footer() {
    return(
        <>
        <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            &copy; 2025 Biblioteca Casa da Palavra. Todos os direitos
            reservados.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>FB</a>
            <a href="#" className={styles.socialIcon}>IG</a>
            <a href="#" className={styles.socialIcon}>TW</a>
          </div>
        </div>
      </footer>
        
        </>
    );
}