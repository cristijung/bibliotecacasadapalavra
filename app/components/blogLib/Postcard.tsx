'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { useFavorites, Book } from '../../context/FavoritesContext';
import styles from './PostCard.module.scss';


interface Post extends Book {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favoriteClick = () => {
    if (isFavorite(post.id)) {
      removeFavorite(post.id);
    } else {      
      addFavorite({
        id: post.id,
        title: post.title,
        author: post.author,
        cover: post.image,
        description: post.excerpt,
      });
    }
  };

  const shareClick = () => {
    const postUrl = `${window.location.origin}/blog/${post.id}`;
    const postTitle = encodeURIComponent(post.title);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${postUrl}&quote=${postTitle}`,
      '_blank'
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={post.image}
          alt={`Capa do artigo ${post.title}`}
          width={500}
          height={300}
          unoptimized
          className={styles.postImage}
        />
        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${isFavorite(post.id) ? styles.favorited : ''}`}
            onClick={favoriteClick}
            aria-label="Favoritar post"
          >
            <FaHeart />
          </button>
          <button
            className={styles.actionButton}
            onClick={shareClick}
            aria-label="Compartilhar no Facebook"
          >
            <FaShareAlt />
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{post.category}</p>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.meta}>
          <span className={styles.author}>Por {post.author}</span>
          <span className={styles.date}>{post.date}</span>
        </div>
        <Link href={`/blog/${post.id}`} className={styles.readMore}>
          Leia mais &rarr;
        </Link>
      </div>
    </div>
  );
}