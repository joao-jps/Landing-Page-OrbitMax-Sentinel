// Conceitos: DOM, Arrays, Objetos, Fetch
// 1. ESTRELAS NO HERO

function iniciarEstrelas() {

  const canvas = document.getElementById("canvas-estrelas");
  const ctx    = canvas.getContext("2d");

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Array de objetos — cada objeto é uma estrela
  const estrelas = [];

  for (let i = 0; i < 200; i++) {
    estrelas.push({
      x:          Math.random() * canvas.width,
      y:          Math.random() * canvas.height,
      tamanho:    Math.random() * 1.4 + 0.2,
      brilho:     Math.random(),
      velocidade: Math.random() * 0.006 + 0.001
    });
  }

  function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    estrelas.forEach(function(e) {
      e.brilho += e.velocidade;
      const op = (Math.sin(e.brilho) + 1) / 2;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.tamanho, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(226,232,240," + op + ")";
      ctx.fill();
    });

    requestAnimationFrame(desenhar);
  }

  desenhar();

  window.addEventListener("resize", function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// NAVEGAÇÃO — fundo ao rolar
function iniciarNavegacao() {
  const nav = document.getElementById("nav");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 30) {
      nav.classList.add("fixado");
    } else {
      nav.classList.remove("fixado");
    }
  });
}

// ACORDEÃO DE TECNOLOGIA 
function iniciarAcordeao() {
  const cards = document.querySelectorAll(".card-tech");

  cards.forEach(function(card) {
    card.addEventListener("click", function() {

      const jaAberto = card.classList.contains("aberto");

      // Fecha todos
      cards.forEach(function(c) { c.classList.remove("aberto"); });

      // Abre o clicado (se não estava aberto)
      if (!jaAberto) card.classList.add("aberto");
    });
  });

  // Primeiro card começa aberto
  if (cards.length > 0) cards[0].classList.add("aberto");
}

// BARRAS DE BENEFÍCIOS
function iniciarBarras() {
  const barras = document.querySelectorAll(".barra-fill");

  const observer = new IntersectionObserver(function(entradas) {
    entradas.forEach(function(entrada) {
      if (entrada.isIntersecting) {
        var b = entrada.target;
        b.style.width = b.getAttribute("data-porcentagem") + "%";
        observer.unobserve(b);
      }
    });
  }, { threshold: 0.3 });

  barras.forEach(function(b) { observer.observe(b); });
}

const img = document.getElementById("slide-img");
const title = document.getElementById("slide-title");
const desc = document.getElementById("slide-desc");

const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

let index = 0;
let eventos = [];

// Imagens do slideshow
let imagens = [
  'https://data.statesmanjournal.com/media/uploads/fires.jpg',
  'https://infoamazonia.org/wp-content/uploads/2022/08/fabio-bispo-fogo-amazonia-4-1200x800.jpg',
  'https://tribunadoplanalto.com.br/wp-content/uploads/2024/07/queimada-lixo-domestico.jpg',
  'https://files.cdn-files-a.com/uploads/2404059/2000_gi-674def0e898d1.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOk_bAHlD18T12s5TPDmI3FLrTc9M-7ztMGMm_9KKWYC_KSEl_wG-q5ysbmfckpCfz6OQsFJJJ6XkkxRa6iJLDQy_xk8exaLVunvdEn21nqkMId3dFktjb9LeQI9NoTRwTMVhaRVKtTwU/s1600/SAM_0624.JPG'
];

async function carregarEventos() {
    try {
        const resposta = await fetch(
          "https://eonet.gsfc.nasa.gov/api/v3/events?status=open"
        );

        const dados = await resposta.json();

        eventos = dados.events
            .filter(evento =>
                evento.categories.some(cat =>
                    cat.title.toLowerCase().includes("wildfire")
                )
            )
            .slice(0, 5);

        mostrarSlide();

    } catch (erro) {
        console.log("Erro ao buscar eventos:", erro);
    }
}

function mostrarSlide() {
    if (!eventos.length) return;

    img.src = imagens[index];

    title.textContent =
        eventos[index].title || "Evento de Queimada";

    desc.textContent =
        `ID: ${eventos[index].id} • Monitorado pela NASA via satélite.`;
}

btnNext.addEventListener("click", () => {
    index++;

    if (index >= eventos.length) {
        index = 0;
    }

    mostrarSlide();
});

btnPrev.addEventListener("click", () => {
    index--;

    if (index < 0) {
        index = eventos.length - 1;
    }

    mostrarSlide();
});

carregarEventos();

// TROCA DE TEMA
function iniciarTrocaTema() {
  console.log("[Tema] Iniciando troca de tema.");
 
  const botoes = document.querySelectorAll(".btn-tema");
 
  // Aplica o tema: coloca a classe certa no body e marca o botão ativo
  function aplicarTema(nomeTema) {
    // Remove qualquer tema anterior
    document.body.classList.remove("tema-escuro", "tema-azul", "tema-branco");
 
    // Adiciona o tema escolhido
    document.body.classList.add("tema-" + nomeTema);
 
    // Atualiza o botão ativo
    botoes.forEach(function(btn) {
      btn.classList.toggle("ativo", btn.dataset.tema === nomeTema);
    });
 
    localStorage.setItem("orbitmax-tema", nomeTema);
    console.log(`[Tema] Tema aplicado: "${nomeTema}"`);
  }
 
  // Clique em cada botão
  botoes.forEach(function(btn) {
    btn.addEventListener("click", function() {
      aplicarTema(btn.dataset.tema);
    });
  });
 
  // Restaura o tema salvo ou usa escuro como padrão
  const temaSalvo = localStorage.getItem("orbitmax-tema") || "escuro";
  aplicarTema(temaSalvo);
 
  console.log("[Tema] Pronto.");
}

// INICIALIZAÇÃO — chama tudo quando o HTML carregar
document.addEventListener("DOMContentLoaded", function() {
  iniciarEstrelas();
  iniciarNavegacao();
  iniciarAcordeao();
  iniciarBarras();
  iniciarTrocaTema();
});