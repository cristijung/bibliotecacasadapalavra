## Cuidados a serem observado em componentes com Hooks:

Para testar esse componente, que possui um timer com `useEffect e renderização condicional`, a melhor abordagem é usar os timers falsos do Jest. Isso nos permite simular o passar do tempo sem ter que esperar segundos reais.

### Teste para EventosLib
1. Crie um arquivo chamado EventosLib.test.tsx na mesma pasta do seu componente. O código irá cobrir os principais cenários:
2. A renderização inicial do contador.
3. A diminuição do contador a cada segundo simulado.
4. A mudança para o estado "evento começou" após o tempo acabar.