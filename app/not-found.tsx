import Link from 'next/link';
import styles from './not-found.module.scss'; 

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Página Não Encontrada</h2>
      <p className={styles.description}>
        Ops! Parece que a página que você está procurando se perdeu entre as estantes.
        Não se preocupe, vamos te guiar de volta para a Casa da Palavra.
      </p>
      <Link href="/" className={styles.homeButton}>
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}