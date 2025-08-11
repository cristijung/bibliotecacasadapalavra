
export interface PostContextType {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
}


export interface Post {
  id: number;
  title: string;
  author: string;
  image: string; 
  excerpt: string; 
  category: string;
  date: string;
}