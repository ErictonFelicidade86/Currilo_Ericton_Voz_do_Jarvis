# Portfólio · Ericton Felicidad de Brito

Site de portfólio pessoal de **Ericton Felicidad de Brito** — Analista de Teste (QA) e Desenvolvedor Frontend, de Manaus/AM.

A proposta é apresentar o currículo em uma interface com tema tecnológico: fundo animado em canvas, sequência de abertura com locução e conteúdo disponível em português e inglês. Feito com HTML, CSS e JavaScript puro, sem framework e sem etapa de build — basta abrir o `index.html`.

---

## Funcionalidades

| Recurso | Descrição |
| --- | --- |
| **Fundo tecnológico animado** | Canvas em tela cheia com grade, rede de partículas conectadas e varredura horizontal contínua. Pausa sozinho quando a aba perde o foco. |
| **Abertura estilo "Jarvis"** | Tela de entrada com reator animado, log de inicialização digitado linha a linha e bipe de inicialização gerado via Web Audio API. |
| **Locução em dois idiomas** | Saudação gravada em MP3, uma em português e outra em inglês, escolhida conforme o idioma ativo. Há reserva automática para a síntese de voz do navegador caso a reprodução do arquivo seja recusada. |
| **Troca de idioma PT / EN** | Bandeiras no topo e na tela de entrada. Todo o conteúdo — menu, textos, datas, cargos e log de boot — alterna entre português e inglês. A escolha fica guardada no navegador do visitante. |
| **Controle de som** | Botão no rodapé para ligar/desligar a locução, além de "Ouvir saudação" para repetir. |
| **Voltar ao topo** | Botão no rodapé com rolagem suave. |
| **Responsivo** | Layout de coluna única em telas estreitas, com área segura (`env(safe-area-inset-*)`) respeitada em celulares. |
| **Acessibilidade** | Navegação por teclado com foco visível, `aria-pressed` nos botões de estado, `aria-live` no log e suporte a `prefers-reduced-motion` (desliga as animações e a digitação). |

---

## Tecnologias

- **HTML5** semântico
- **CSS3** — variáveis CSS (design tokens), Grid, Flexbox, `clip-path`, `backdrop-filter` e animações com `@keyframes`
- **JavaScript (ES5+, sem dependências)** — Canvas 2D, Web Audio API, Web Speech API (`speechSynthesis`), `localStorage`
- **Google Fonts** — Chakra Petch, Barlow e IBM Plex Mono

Nenhuma biblioteca externa, nenhum empacotador, nenhuma dependência de `npm`.

---

## Estrutura de pastas

```
portfolio-ericton-brito/
├── index.html              # marcação da página e conteúdo do currículo
├── css/
│   └── styles.css          # design tokens, layout, componentes e animações
├── js/
│   └── script.js           # canvas, idioma, locução, boot e interações
├── assets/
│   └── audio/
│       ├── jarvis-pt.mp3   # saudação em português
│       └── jarvis-en.mp3   # saudação em inglês
├── .gitignore
├── LICENSE
└── README.md
```

---

## Como rodar localmente

### Opção 1 — abrir o arquivo

Clone o repositório e abra o `index.html` no navegador.

```bash
git clone https://github.com/<seu-usuario>/portfolio-ericton-brito.git
cd portfolio-ericton-brito
```

### Opção 2 — servidor local (recomendado)

Alguns navegadores restringem recursos quando a página é aberta direto do disco (`file://`). Subir um servidor estático evita qualquer surpresa:

```bash
# Python 3
python3 -m http.server 5500

# ou, com Node.js
npx serve .
```

Depois acesse `http://localhost:5500`.

> **Sobre o áudio:** navegadores só permitem reproduzir som após uma interação do usuário. Por isso a locução toca a partir do clique em **Ativar sistema** — não é possível tocá-la automaticamente ao abrir a página.

---

## Publicar no GitHub Pages

1. Crie o repositório no GitHub e envie os arquivos:

   ```bash
   git init
   git add .
   git commit -m "Portfólio pessoal — QA e Frontend"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/portfolio-ericton-brito.git
   git push -u origin main
   ```

2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)`, depois **Save**.
5. Em alguns instantes o site estará no ar em `https://<seu-usuario>.github.io/portfolio-ericton-brito/`.

Como o projeto é totalmente estático, não há configuração extra, variáveis de ambiente nem etapa de build.

---

## Personalização

- **Textos**: ficam no `index.html`. O português é o conteúdo do elemento e o inglês vai no atributo `data-en` (ou `data-en-html`, quando o trecho tem marcação interna). Para traduzir um texto novo, basta acrescentar o atributo.
- **Cores e tipografia**: todos os tokens estão no bloco `:root` no topo do `css/styles.css`.
- **Locução**: substitua os arquivos em `assets/audio/` mantendo os nomes, ou altere os caminhos no objeto `SRC` dentro do `js/script.js`.
- **Textos do boot e da saudação**: estão no objeto `STR` do `js/script.js`, separados por idioma.

---

## Compatibilidade

Testado nos navegadores baseados em Chromium, Firefox e Safari, em desktop e celular. A síntese de voz de reserva (`speechSynthesis`) depende das vozes instaladas no sistema do visitante e pode variar entre aparelhos — a locução principal, em MP3, soa igual em todos.

---

## Licença

Distribuído sob a licença MIT. O código pode ser reutilizado livremente; o conteúdo do currículo, os textos pessoais e as gravações de voz são de uso exclusivo do autor. Veja o arquivo [LICENSE](LICENSE).

---

## Autor

**Ericton Felicidad de Brito** — Analista de Teste (QA) e Desenvolvedor Frontend · Manaus, AM

- GitHub: [ErictonFelicidade86](https://github.com/ErictonFelicidade86)
- GitLab: [Erictondeveloper](https://gitlab.com/Erictondeveloper)
- LinkedIn: [erictonbrito](https://www.linkedin.com/in/erictonbrito)
