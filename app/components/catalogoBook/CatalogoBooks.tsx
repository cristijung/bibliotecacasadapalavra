import CardCatalogo from "./CardCatalogo";
import { promises as fs } from "fs";
import path from "path";

import styles from "./CatalogoBooks.module.scss";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  categoria: string;
}

export default async function CatalogoBooks() {
  const filePath = path.join(process.cwd(), "app", "data", "bookscat.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const booksData: Book[] = JSON.parse(fileContents);

  return (
    <div className={styles.catalogoContainer}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Nosso Catálogo</h1>

          <p className={styles.subtitle}>
            Descubra mundos e explore nossa vasta coleção de livros.
          </p>
        </header>
       
        <section className={styles.booksSection}>
          <div className={styles.booksGrid}>
            {booksData.map((book) => (
              <CardCatalogo key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
