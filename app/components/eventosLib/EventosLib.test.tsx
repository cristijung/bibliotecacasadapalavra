import React from 'react';
import { render, screen, act } from '@testing-library/react';
import EventosLib from './EventosLib';

// criamos uma interface para definir as props do mock, garantindo a tipagem
interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: string;
  className?: string;
}

// o Jest executa jest.mock antes de qualquer outra linha.
// portanto, a definição do mock precisa estar dentro da chamada.
jest.mock('next/image', () => {
  // o componente de mock é definido e retornado aqui,
  // garantindo que ele exista quando o Jest precisar.
  const MockImage = (props: MockImageProps) => {
    return <img src={props.src} alt={props.alt} />;
  };
  return MockImage;
});

describe('EventosLib', () => {
  // usa timers falsos para que possamos controlar o tempo no teste
  jest.useFakeTimers();

  // limpa os timers após cada teste para evitar que vazem para outros testes
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render the initial countdown and title', () => {
    render(<EventosLib />);

    // verifica se o título está na tela
    expect(screen.getByText('Próximo Evento Começa em:')).toBeInTheDocument();

    // verifica se o contador inicial (10) está visível
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should decrease the countdown by one after 1 second', () => {
    render(<EventosLib />);

    // avança o tempo em 1 segundo (1000ms)
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // verifica se o contador mudou de 10 para 9
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('should display "Evento Começou!" after 10 seconds', () => {
    render(<EventosLib />);

    // avança o tempo em 10 segundos (10000ms) de uma só vez
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // verifica se a mensagem de evento iniciado está na tela
    expect(screen.getByText('Evento Começou!')).toBeInTheDocument();

    // verifica se o contador não está mais visível
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('should clear the interval timer on unmount', () => {
    const { unmount } = render(<EventosLib />);
    
    // fica espiando a função clearInterval
    jest.spyOn(global, 'clearInterval');

    // desmonta o componente
    unmount();

    // verifica se o clearInterval foi chamado
    expect(clearInterval).toHaveBeenCalled();
  });
});