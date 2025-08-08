"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorite, useCart } from "../../hooks/usePersistence";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

import styles from "./CardBook.module.scss";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  categoria: string;
}

interface CardCatalogoProps {
  book: Book;
}

export default function CardCatalogo({ book }: CardCatalogoProps) {
  const { isFavorite, toggleFavorite } = useFavorite(book.id);
  const { isInCart, toggleCart } = useCart(book.id);

  return (
    <div className={styles.card}>
      <div className={styles.coverContainer}>
        <Image
          src={book.cover}
          alt={`Capa do livro ${book.title}`}
          width={400}
          height={600}
          unoptimized //retirar depois que colocar a imagem correta e/ou consumir de api
          className={styles.coverImage}
        />

        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.isFavorite : ""
          }`}
          onClick={toggleFavorite}
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {isFavorite ? (
            <AiFillHeart size={24} className={styles.icon} />
          ) : (
            <AiOutlineHeart size={24} className={styles.icon} />
          )}
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>por {book.author}</p>
        <p className={styles.category}>{book.categoria}</p>
        <p className={styles.description}>{book.description}</p>
        <div className={styles.actions}>
          <Link href={`/livro/${book.id}`} className={styles.detailsButton}>
            Detalhes
          </Link>

          <button
            className={`${styles.cartButton} ${
              isInCart ? styles.isInCart : ""
            }`}
            onClick={toggleCart}
            aria-label={
              isInCart ? "Remover do carrinho" : "Adicionar ao carrinho"
            }
          >
            <FiShoppingCart size={24} className={styles.cartIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
