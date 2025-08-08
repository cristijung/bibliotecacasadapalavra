import CardCatalogo from './CardCatalogo';
import { promises as fs } from 'fs';
import path from 'path';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  categoria: string;
}

export default async function CatalogoBooks() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'bookscat.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const booksData: Book[] = JSON.parse(fileContents);

  return (
    <div className="bg-white text-black py-12 px-4 min-h-screen">
      <div className="container mx-auto">
        <header className="text-center mb-16 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-2">
            Nosso Catálogo
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Descubra mundos e explore nossa vasta coleção de livros.
          </p>
        </header>
        <hr/> 
        <h1 className='p-16 text-white'>teste</h1>
        {/** GAMBIARRAAAAAAA MASTER tirar depois ahhaha */}
        <section className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl">
            {booksData.map((book) => (
              <CardCatalogo key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}