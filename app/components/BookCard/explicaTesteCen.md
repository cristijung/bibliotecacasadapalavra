## Cenário do Teste

### BookCard
1. O componente BookCard exibe os detalhes de um livro e botões interativos para favoritar, compartilhar e ver detalhes. O cenário de testes se concentra em verificar o comportamento dinâmico e as interações do usuário, especialmente em relação a:
- Estado de Favorito: A aparência e a ação do botão de favoritar dependem do estado do livro (favorito ou não), gerenciado pelo useFavorites hook.
- Botões de Compartilhamento: Os botões de compartilhamento devem chamar as APIs corretas do navegador (window.open ou alert) com os parâmetros esperados.
- Modal de Detalhes: O botão "Ver Detalhes" deve abrir um modal (BookModal) e o modal só deve ser exibido quando o estado isModalOpen for true.
- Para isso, é importante mockar o useFavorites hook para controlar o estado do livro e as funções que ele retorna. Também precisamos mockar as APIs do navegador (window.open, alert) para testar as ações de compartilhamento.