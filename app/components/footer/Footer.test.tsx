

import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {

  it('should render the copyright text', () => {
    // renderizar o componente Footer
    render(<Footer />);

    // procurar pelo texto de direitos autorais.
    // usamos `getByText` porque esperamos que esse texto esteja presente no componente.
    const copyrightText = screen.getByText('© 2025 Biblioteca Casa da Palavra. Todos os direitos reservados.');

    // fazer a asserção: verificar se o elemento com o texto foi encontrado no documento.
    expect(copyrightText).toBeInTheDocument();
  });

  it('should render the social media links', () => {
    // renderizar o componente Footer
    render(<Footer />);

    // procurar pelos links de redes sociais.
    // usamos `getAllByRole` para encontrar todos os elementos que têm a função (role) de 'link'.
    const socialLinks = screen.getAllByRole('link');

    // fazer as asserções:
    // verificar se o número de links é o esperado (3: FB, IG, TW).
    expect(socialLinks).toHaveLength(3);

    // verificar se o texto de cada link está presente.
    expect(screen.getByText('FB')).toBeInTheDocument();
    expect(screen.getByText('IG')).toBeInTheDocument();
    expect(screen.getByText('TW')).toBeInTheDocument();
  });
});