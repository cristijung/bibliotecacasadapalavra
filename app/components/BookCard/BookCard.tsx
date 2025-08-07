'use client';

import { useState } from 'react';
import styles from './BookCard.module.scss';
import { FaShareAlt, FaHeart } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi'; // ver aqui depois ...
import BookModal from './bookModal/BookModal'; 

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    cover: string;
    description: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = (platform: 'facebook' | 'instagram') => {
    const bookUrl = window.location.href; // URL da page atual
    const bookTitle = encodeURIComponent(book.title);
    const bookDescription = encodeURIComponent(book.description); // ainda não usado

    if (platform === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${bookUrl}&quote=${bookTitle}`,
        '_blank'
      );
    } else if (platform === 'instagram') {      
      alert('Compartilhe no Instagram: Salve a imagem da capa e use a hashtag #BibliotecaCasaDaPalavra');
    }
  };

  return (
    <>
      <div className={styles.bookCard}>
        {/* depois trocar para Image */}
        <img
          src={book.cover}
          alt={`Capa do Livro: ${book.title}`}
          className={styles.bookCover}
        />
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>Por {book.author}</p>
        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${isFavorited ? styles.favorited : ''}`}
            onClick={() => setIsFavorited(!isFavorited)}
            aria-label="Favoritar"
          >
            <FaHeart />
          </button>
          <div className={styles.shareButtonGroup}>
            <button
              className={styles.actionButton}
              onClick={() => handleShare('facebook')}
              aria-label="Compartilhar no Facebook"
            >
              <FaShareAlt />
            </button>
            <button
              className={styles.actionButton}
              onClick={() => handleShare('instagram')}
              aria-label="Compartilhar no Instagram"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
        <button className={styles.viewButton} onClick={() => setIsModalOpen(true)}>
          Ver Detalhes
        </button>
      </div>
      {isModalOpen && (
        <BookModal book={book} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}