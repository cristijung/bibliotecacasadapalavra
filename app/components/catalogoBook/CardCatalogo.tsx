'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorite, useCart } from '../../hooks/usePersistence';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import { FiShoppingCart } from 'react-icons/fi'; 

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
    <div className="flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-purple-500/20">
      <div className="relative w-full pb-[150%]">
        <Image
          src={book.cover}
          alt={`Capa do livro ${book.title}`}
          width={400}
          height={600}
          unoptimized //retirar depois que colocar a imagem correta e/ou consumir de api
          className="w-full h-full object-cover border-b-4 border-purple-500"
        />
        <button
          className={`absolute top-4 right-4 bg-black bg-opacity-70 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${isFavorite ? 'bg-pink-500' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite ? (
            <AiFillHeart size={24} className="text-white" />
          ) : (
            <AiOutlineHeart size={24} className="text-white" />
          )}
        </button>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-white leading-tight">{book.title}</h3>
        <p className="text-base text-gray-400 mb-1">por {book.author}</p>
        <p className="text-sm text-purple-400 mb-4 font-semibold capitalize">{book.categoria}</p>
        <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow line-clamp-3">{book.description}</p>
        <div className="flex items-center justify-between mt-auto gap-4">
          <Link href={`/livro/${book.id}`} className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-4 py-4 rounded-full font-semibold text-sm shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-center min-w-[120px]">
            Detalhes
          </Link>
          <button
            className={`bg-transparent border border-gray-600 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${isInCart ? 'bg-purple-500 border-purple-500' : 'hover:bg-purple-500 hover:border-purple-500'}`}
            onClick={toggleCart}
            aria-label={isInCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
          >
            <FiShoppingCart size={24} className={`transition-colors duration-200 ${isInCart ? 'text-white' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}