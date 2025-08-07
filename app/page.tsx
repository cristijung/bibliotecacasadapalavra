import Hero from "./components/hero/Hero";
import BookCard from "./components/BookCard/BookCard";
import styles from "./page.module.scss";
import Image from "next/image";
import LogoHome from "./../public/logo_bi.png";

// lib para ler o arquivo JSON
import { promises as fs } from 'fs';
import path from 'path';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
}

// função assíncrona para buscar os dados.
export default async function Home() {  
  const filePath = path.join(process.cwd(), 'app', 'data', 'books.json');
  // lê o arquivo JSON como uma string
  const fileContents = await fs.readFile(filePath, 'utf8');
  // converte a string JSON para um array de objetos TypeScript
  const booksData: Book[] = JSON.parse(fileContents);

  return (
    <div className={styles.pageContainer}>
      <main>
        <Hero />
        <div className={styles.principal}>
          <section className={styles.section}>
            <div className={styles.headerContent}>
              <Image
                src={LogoHome}
                alt="Biblioteca Casa Da Palavra"
                width={200}
                height={200}
                className={styles.logoSection}
              />
              <div className={styles.textContainer}>
                <h2 className={styles.sectionTitle}>
                  Novidades na Casa da Palavra
                </h2>
                <p className={styles.sectionSubtitle}>
                  Confira os títulos recém chegados à nossa coleção.
                </p>
              </div>
            </div>
            
            <div className={styles.bookGrid}>
              {/* map dinâmico do componente BookCard */}
              {booksData.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.eventsSection}`}>
            <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
            <p className={styles.sectionSubtitle}>
              Participe de nossos workshops, clubes de leitura e encontros com
              autores.
            </p>
            <div className={styles.eventList}>
              <div className={styles.eventCard}>
                <h3>Clube do Livro: Ficção Científica</h3>
                <p>Data: 15 de Agosto, 19:00h</p>
                <p>Local: Sala de Leitura 3</p>
                <button className={styles.eventButton}>Inscreva-se</button>
              </div>
              <div className={styles.eventCard}>
                <h3>Workshop de Escrita Criativa</h3>
                <p>Data: 22 de Agosto, 10:00h</p>
                <p>Local: Auditório Principal</p>
                <button className={styles.eventButton}>Inscreva-se</button>
              </div>
            </div>
          </section>
          
          <section className={`${styles.section} ${styles.aboutCtaSection}`}>
            <div className={styles.aboutContent}>
              <h2 className={styles.sectionTitle}>
                Sobre a Biblioteca Casa da Palavra
              </h2>
              <p>
                Somos um refúgio para amantes da leitura e buscadores de
                conhecimento. Nossa missão é promover a cultura, incentivar a
                leitura e ser um ponto de encontro para a comunidade.
              </p>
              <p>
                Com uma vasta coleção de livros, eventos culturais e um ambiente
                acolhedor, a Casa da Palavra é o seu lar para todas as
                histórias.
              </p>
            </div>
            <div className={styles.ctaContent}>
              <h2 className={styles.sectionTitle}>Torne-se um Membro!</h2>
              <p>
                Tenha acesso ilimitado à nossa coleção, participe de eventos
                exclusivos e muito mais.
              </p>
              <button className={styles.joinButton}>Cadastre-se Agora</button>
            </div>
          </section>
        </div>
      </main>

     
    </div>
  );
}