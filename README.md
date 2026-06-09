# 🛰️ OrbitMax Sentinel

**Monitoramento de desastres naturais via dados satelitais**

Landing page desenvolvida para a **Global Solution 2026** da FIAP — Engenharia de Software, 1º Ano.  
O projeto conecta dados abertos da NASA e do INPE a alertas úteis para comunidades e gestores públicos brasileiros.

---

## 📋 Descrição do Projeto

O OrbitMax Sentinel é uma plataforma web que atua como camada de software entre os dados de satélite já existentes (NASA FIRMS, NASA EONET, INPE) e as comunidades em risco. Enchentes no RS, queimadas no Pantanal e deslizamentos em áreas urbanas são monitorados em tempo real — mas esses dados não chegam às pessoas de forma acessível. O OrbitMax resolve esse gap.

---

## 🎯 Objetivo da Solução

- Detectar e notificar eventos de risco em menos de 15 minutos após captura por satélite
- Democratizar o acesso a dados de sensoriamento remoto para prefeituras e defesa civil
- Conectar a tecnologia espacial à vida real de comunidades vulneráveis no Brasil
- Contribuir com os ODS 13 (Ação Climática), ODS 11 (Cidades Inteligentes) e ODS 9 (Inovação)

---

## ⚙️ Funcionalidades Implementadas

| Funcionalidade | Descrição |
|---|---|
| Landing Page completa | 8 seções cobrindo problema, tecnologia, objetivos, público-alvo, benefícios, aplicação no dia a dia, contato e quiz |
| Slideshow | Carrossel de imagens na seção inicial |
| Acordeão de tecnologias | Cards clicáveis que expandem e recolhem com animação |
| Barras de benefícios animadas | Preenchimento disparado pelo IntersectionObserver ao rolar a página |
| Formulário com validação | Validação campo a campo com feedback visual (borda verde/vermelha) e mensagens de erro |
| Quiz interativo | 10 perguntas sobre o tema com placar, barra de progresso, explicações e tela de resultado |
| Troca de tema | 3 temas de cor (Escuro 🌑 / Azul 🌊 / Claro ☀️) com persistência via localStorage |
| Canvas de estrelas | Animação de partículas no hero gerada via JavaScript puro |
| Navegação com scroll | Nav fixa que detecta a seção ativa e aplica efeito blur ao rolar |
| `console.log` completo | Todas as interações do usuário e ações da aplicação são registradas no console |

---

## 🗂️ Estrutura de Arquivos

```
Landing-Page-OrbitMax-Sentinel/
│
├── index.html              # Estrutura HTML da página (8 seções + nav + rodapé)
│
├── src/
│   ├── css/
│   │   ├── style.css       # Layout, variáveis CSS, tipografia e temas de cor
│   │   ├── efeitos.css     # Transições, hovers e animações
│   │   ├── formulario.css  # Estilos do formulário de contato
│   │   └── quiz.css        # Estilos do quiz interativo
│   │
│   ├── js/
│   │   ├── behaviour.js        # Comportamentos gerais: nav, slideshow, acordeão, barras, estrelas
│   │   └── formulario-quiz.js  # Formulário (validação), quiz (10 perguntas) e troca de tema
│   │
│   └── assets/
│       └── imgs/           # Imagens utilizadas no slideshow e nas seções
│
├── integrantes.txt         # Nome e RM de todos os integrantes
├── equipe.txt              # Nome da equipe
├── link_github.txt         # Link do repositório GitHub
├── AI.md                   # Registro de uso de Inteligência Artificial
└── README.md               # Este arquivo
```

---

## 🚀 Como Executar

Não há dependências, build ou instalação. Basta abrir o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/joao-jps/Landing-Page-OrbitMax-Sentinel.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd Landing-Page-OrbitMax-Sentinel
   ```

3. Abra o arquivo `index.html` no navegador — pode ser clicando duas vezes no arquivo ou com uma extensão como **Live Server** no VS Code.

> Nenhum servidor ou instalação necessária. O projeto roda 100% no browser com HTML, CSS e JavaScript puro.

---

## 🛠️ Tecnologias Utilizadas

**Front-end**
- HTML5 semântico
- CSS3 (Flexbox, variáveis CSS, pseudo-elementos, transições)
- JavaScript puro (ES6+) — sem frameworks
- Google Fonts: Orbitron + Exo 2
- Canvas API (animação de estrelas)

**APIs e Dados Espaciais (referenciados na solução)**
- NASA FIRMS — focos de calor em tempo real
- NASA EONET — catálogo de eventos naturais
- INPE / CBERS-4 — imagens de satélite do território brasileiro

**Simulação de Hardware**
- Arduino (simulado no Wokwi) — Edge Computing com sensores de temperatura, fumaça e umidade

---

## 🌍 Conexão com os ODS

| ODS | Conexão |
|---|---|
| 🌿 ODS 13 — Ação Climática | Monitoramento de desastres e apoio a políticas de adaptação climática |
| 🏙️ ODS 11 — Cidades Inteligentes | Alertas para gestores municipais e defesa civil |
| ⚙️ ODS 9 — Inovação e Infraestrutura | Uso de APIs espaciais abertas e Edge Computing |

---

## 👥 Integrantes

| Nome | RM |
|---|---|
| João Pedro De Souza | RM571437 |
| Bruno Araújo Castro | RM572723 |
| Arthur Germano Pinheiro | RM574042 |
| Artur Novazzi Maia | RM572624 |

**Grupo:** Inova X  
**Curso:** Engenharia de Software — 1º Ano  
**Instituição:** FIAP  
**Período:** Global Solution 2026 — 1º Semestre

---

## 🤖 Uso de Inteligência Artificial

Este projeto utilizou IA durante o desenvolvimento. As interações estão documentadas no arquivo [`AI.md`](./AI.md), contendo para cada uso: o que foi solicitado, o que foi retornado e o que foi alterado ou rejeitado.