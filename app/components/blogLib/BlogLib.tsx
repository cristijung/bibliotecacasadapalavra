'use client';

import PostCard from './Postcard';
import styles from './BlogLib.module.scss';
import { Post } from '../../types'; 

interface BlogLibProps {
  posts: Post[];
}

export default function BlogLib({ posts }: BlogLibProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Últimas do Blog</h1>
      <section className={styles.postsGrid}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} /> 
        ))}
      </section>
    </div>
  );
}