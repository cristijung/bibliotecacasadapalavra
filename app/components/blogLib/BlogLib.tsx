
import PostCard from './Postcard'; 
import styles from './BlogLib.module.scss';
import { promises as fs } from 'fs';
import path from 'path';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

export default async function BlogLib() {  
  const filePath = path.join(process.cwd(), 'app', 'data', 'blogposts.json');  
  const fileContents = await fs.readFile(filePath, 'utf8');  
  const blogPosts: Post[] = JSON.parse(fileContents);

  return (
    <div className={styles.blogSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Nosso Blog
          </h1>
          <p className={styles.subtitle}>
            Insights, dicas e recomendações do universo literário.
          </p>
        </header>

        <section>
          <div className={styles.postsGrid}>
            {blogPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}