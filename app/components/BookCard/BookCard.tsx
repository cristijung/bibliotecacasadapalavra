'use client';

import styles from './BookCard.module.scss';
import { FaShareAlt, FaHeart } from 'react-icons/fa';
import BookModal from './bookModal/BookModal';
import { useState } from 'react';
import { useFavorites, Book } from '../../context/FavoritesContext'; 

interface BookCardProps {
  book: Book; // Use a tipagem do contexto
}

export default function BookCard({ book }: BookCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const compartilhar = (platform: 'facebook' | 'instagram') => {
    const bookUrl = window.location.href; 
    const bookTitle = encodeURIComponent(book.title);

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
        <img
          src={book.cover}
          alt={`Capa do Livro: ${book.title}`}
          className={styles.bookCover}
        />
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>Por {book.author}</p>
        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${isFavorite(book.id) ? styles.favorited : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Favoritar"
          >
            <FaHeart />
          </button>
          <div className={styles.shareButtonGroup}>
            <button
              className={styles.actionButton}
              onClick={() => compartilhar('facebook')}
              aria-label="Compartilhar no Facebook"
            >
              <FaShareAlt />
            </button>
            <button
              className={styles.actionButton}
              onClick={() => compartilhar('instagram')}
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