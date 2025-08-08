import Image from 'next/image';
import Link from 'next/link';
import styles from './PostCard.module.scss';

interface Post {
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
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={post.image}
          alt={`Capa do artigo ${post.title}`}
          width={500}
          height={300}
          unoptimized // tirar depois
          className={styles.postImage}
        />
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