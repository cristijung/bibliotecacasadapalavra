'use client';

import styles from './BookModal.module.scss';

interface BookModalProps {
  book: {
    title: string;
    author: string;
    cover: string;
    description: string;
  };
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.bookDetails}>
          <img
            src={book.cover}
            alt={`Capa do Livro: ${book.title}`}
            className={styles.modalCover}
          />
          <div className={styles.bookInfo}>
            <h2 className={styles.modalTitle}>{book.title}</h2>
            <p className={styles.modalAuthor}>Autor: {book.author}</p>
            <p className={styles.modalDescription}>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}