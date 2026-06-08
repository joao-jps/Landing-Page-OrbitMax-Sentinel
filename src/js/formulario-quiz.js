
// FORMULÁRIO DE CONTATO
// Valida cada campo antes de permitir o envio.

function iniciarFormulario() {

  const form     = document.getElementById("form-contato");
  const sucesso  = document.getElementById("form-sucesso");
  const btnEnviar = document.getElementById("form-btn-enviar");

  // Valida um campo de texto: não pode estar vazio (mínimo 2 chars)
  function validarTexto(idCampo) {
    var campo  = document.getElementById(idCampo);
    var grupo  = campo.closest(".form-grupo");
    var valido = campo.value.trim().length >= 2;

    aplicarEstado(campo, grupo, valido);
    return valido;
  }

  // Valida e-mail com expressão regular básica
  function validarEmail() {
    var campo  = document.getElementById("campo-email");
    var grupo  = campo.closest(".form-grupo");
    var regex  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var valido = regex.test(campo.value.trim());

    aplicarEstado(campo, grupo, valido);
    return valido;
  }

  // Valida select: não pode ficar na opção vazia
  function validarSelect(idCampo) {
    var campo  = document.getElementById(idCampo);
    var grupo  = campo.closest(".form-grupo");
    var valido = campo.value !== "";

    aplicarEstado(campo, grupo, valido);
    return valido;
  }

  // Aplica as classes visuais de estado (válido / inválido) no campo e no grupo
  function aplicarEstado(campo, grupo, valido) {
    campo.classList.toggle("valido",   valido);
    campo.classList.toggle("invalido", !valido);
    grupo.classList.toggle("com-erro", !valido);
  }

  // Ouve o submit: roda todas as validações antes de prosseguir
  form.addEventListener("submit", function(evento) {
    evento.preventDefault();   // impede recarregamento da página

    var resultados = [
      validarTexto("campo-nome"),
      validarTexto("campo-instituicao"),
      validarEmail(),
      validarSelect("campo-estado"),
      validarSelect("campo-tipo-alerta"),
      validarTexto("campo-mensagem")
    ];

    // Só avança se TODOS os campos passaram na validação
    var tudo_valido = resultados.every(function(r) { return r === true; });

    if (!tudo_valido) {
      // Foca no primeiro campo com problema para acessibilidade
      var primeiro_invalido = form.querySelector(".invalido");
      if (primeiro_invalido) primeiro_invalido.focus();
      return;
    }

    // Simula envio — em produção seria um fetch POST para a API
    btnEnviar.textContent = "Enviando...";
    btnEnviar.disabled    = true;

    setTimeout(function() {
      form.style.display    = "none";
      sucesso.style.display = "block";
    }, 1000);
  });

  // Valida campos em tempo real enquanto o usuário digita/altera
  // (só ativa após a primeira tentativa de envio para não assustar o usuário)
  ["campo-nome", "campo-instituicao", "campo-mensagem"].forEach(function(id) {
    document.getElementById(id).addEventListener("input", function() {
      if (form.dataset.tentou) validarTexto(id);
    });
  });

  document.getElementById("campo-email").addEventListener("input", function() {
    if (form.dataset.tentou) validarEmail();
  });

  ["campo-estado", "campo-tipo-alerta"].forEach(function(id) {
    document.getElementById(id).addEventListener("change", function() {
      if (form.dataset.tentou) validarSelect(id);
    });
  });

  // Marca que o usuário tentou enviar — ativa a validação em tempo real
  form.addEventListener("submit", function() {
    form.dataset.tentou = "sim";
  }, { once: false });
}


// QUIZ INTERATIVO
function iniciarQuiz() {

  const perguntas = [
    {
      texto: "O que é o NASA FIRMS e para que ele serve?",
      opcoes: [
        "Sistema de rastreamento de satélites em órbita baixa",
        "API que fornece dados de focos de calor e queimadas em tempo real",
        "Programa de financiamento para missões espaciais privadas",
        "Banco de dados de meteoros e asteroides próximos à Terra"
      ],
      indiceCorreto: 1,
      explicacao: "O FIRMS (Fire Information for Resource Management System) é uma API pública da NASA que disponibiliza dados de focos de calor detectados pelos satélites TERRA e AQUA em tempo quase real. É a principal fonte de dados do OrbitMax Sentinel para monitorar queimadas."
    },
    {
      texto: "Qual satélite brasileiro, operado em parceria com a China, monitora o território nacional?",
      opcoes: [
        "Hubble",
        "Sentinel-2",
        "CBERS-4",
        "ISS"
      ],
      indiceCorreto: 2,
      explicacao: "O CBERS-4 (China-Brazil Earth Resources Satellite) é fruto de parceria entre o INPE (Brasil) e o CAST (China). Opera em órbita polar e fornece imagens de sensoriamento remoto do território brasileiro, sendo uma das principais fontes de dados para monitoramento ambiental nacional."
    },
    {
      texto: "Por que o OrbitMax Sentinel usa JavaScript puro, sem frameworks como React ou Vue?",
      opcoes: [
        "React e Vue não funcionam em projetos escolares",
        "Para cumprir o requisito da disciplina de Web Development, que exige JS puro",
        "Frameworks consomem muita bateria em dispositivos móveis",
        "JavaScript puro é mais rápido que qualquer framework em todos os casos"
      ],
      indiceCorreto: 1,
      explicacao: "O requisito da disciplina de Web Development da FIAP especifica 'projeto desenvolvido sem frameworks (somente JavaScript puro)'. Isso garante que os alunos dominem os fundamentos do DOM, eventos e fetch antes de usar abstrações."
    },
    {
      texto: "No fluxo do OrbitMax Sentinel, qual é o papel do Arduino?",
      opcoes: [
        "Processa as imagens dos satélites na nuvem",
        "Gerencia o banco de dados de eventos históricos",
        "Simula uma estação de alerta físico local com LED, buzzer e display LCD",
        "Controla os satélites CBERS via sinal de rádio"
      ],
      indiceCorreto: 2,
      explicacao: "O protótipo Arduino representa a camada de Edge Computing: um hardware físico (simulado no Wokwi) que aciona alertas locais — LED vermelho, buzzer sonoro e display LCD — mesmo em áreas com internet instável, complementando o alerta digital do dashboard."
    },
    {
      texto: "O que é Edge Computing no contexto do projeto?",
      opcoes: [
        "Processamento de dados em servidores remotos na nuvem",
        "Técnica de compressão de imagens satelitais",
        "Computação realizada próximo à fonte dos dados, reduzindo latência",
        "Protocolo de comunicação entre satélites e estações terrestres"
      ],
      indiceCorreto: 2,
      explicacao: "Edge Computing é processar os dados perto de onde eles são gerados — na 'borda' da rede. No OrbitMax Sentinel, o Arduino coleta dados de sensores locais (temperatura, fumaça) e processa o alerta no próprio dispositivo, sem depender de um servidor central."
    },
    {
      texto: "Qual ODS da ONU é o mais diretamente relacionado ao monitoramento de desastres climáticos?",
      opcoes: [
        "ODS 4 — Educação de qualidade",
        "ODS 13 — Ação contra a mudança global do clima",
        "ODS 8 — Trabalho decente e crescimento econômico",
        "ODS 16 — Paz, justiça e instituições eficazes"
      ],
      indiceCorreto: 1,
      explicacao: "O ODS 13 trata diretamente de ação climática, incluindo o fortalecimento da resiliência e capacidade de adaptação a riscos climáticos e desastres. O OrbitMax Sentinel conecta-se a ele ao fornecer dados de monitoramento para apoiar respostas mais rápidas e eficientes."
    },
    {
      texto: "Em 2024, as enchentes no Rio Grande do Sul geraram um prejuízo estimado de quanto?",
      opcoes: [
        "R$ 1,2 bilhão",
        "R$ 18 bilhões",
        "R$ 86 bilhões",
        "R$ 340 bilhões"
      ],
      indiceCorreto: 2,
      explicacao: "As enchentes históricas de maio de 2024 no RS causaram prejuízos estimados em R$ 86 bilhões, segundo levantamentos do governo estadual. O evento deslocou mais de 580 mil pessoas e evidenciou a necessidade crítica de sistemas de alerta precoce integrados."
    },
    {
      texto: "O que é o Flexbox e por que foi usado nesta landing page?",
      opcoes: [
        "Uma biblioteca JavaScript para animações avançadas",
        "Um sistema de layout CSS para alinhar e distribuir elementos em linhas ou colunas",
        "Um protocolo HTTP para comunicação entre o front-end e a API da NASA",
        "Uma técnica de compressão de CSS para reduzir o tamanho dos arquivos"
      ],
      indiceCorreto: 1,
      explicacao: "CSS Flexbox é um modelo de layout unidimensional que facilita alinhar e distribuir elementos responsivamente. Foi obrigatório na disciplina de Front-End Design da FIAP, sendo usado nas grades de cards, na navegação, nos objetivos e em praticamente todos os componentes da landing page."
    },
    {
      texto: "Qual função da API NASA EONET é diferente da FIRMS?",
      opcoes: [
        "EONET rastreia satélites; FIRMS rastreia astronautas",
        "EONET cataloga eventos naturais variados (tempestades, vulcões etc.); FIRMS foca em focos de calor",
        "EONET é paga; FIRMS é gratuita",
        "EONET cobre apenas a América do Sul; FIRMS cobre o mundo todo"
      ],
      indiceCorreto: 1,
      explicacao: "A NASA EONET (Earth Observatory Natural Event Tracker) é um catálogo aberto de eventos naturais globais: tempestades, vulcões, ciclones, secas e mais. Já o FIRMS é especializado em focos de calor e queimadas. O OrbitMax Sentinel usa as duas para uma cobertura mais completa."
    },
    {
      texto: "Por que separar o código em arquivos CSS diferentes (style.css, efeitos.css, formulario.css, quiz.css)?",
      opcoes: [
        "O navegador carrega arquivos menores mais rápido do que um arquivo grande",
        "Cada arquivo precisa ter exatamente 100 linhas para funcionar corretamente",
        "Para organizar responsabilidades: cada arquivo cuida de uma parte específica, facilitando manutenção",
        "É um requisito técnico do HTML5 que proíbe arquivos CSS acima de 500 linhas"
      ],
      indiceCorreto: 2,
      explicacao: "Separar os estilos por responsabilidade é uma boa prática de desenvolvimento front-end: style.css cuida do layout geral, efeitos.css das animações, formulario.css do formulário e quiz.css do quiz. Isso torna o código mais legível, fácil de manter e escalável — princípio avaliado na disciplina de Front-End Design."
    }
  ];

  // --- Estado do quiz ---
  var indicePergunta = 0;   // pergunta sendo exibida (0-based)
  var totalAcertos   = 0;
  var totalErros     = 0;

  // --- Referências aos elementos fixos do quiz ---
  var cardAtivo    = document.getElementById("quiz-card-ativo");
  var tela_resultado = document.getElementById("quiz-resultado");
  var barraFill    = document.getElementById("quiz-barra-fill");
  var numPergunta  = document.getElementById("quiz-num-pergunta-placar");
  var numAcertos   = document.getElementById("quiz-acertos-placar");
  var numErros     = document.getElementById("quiz-erros-placar");

  // Letras das alternativas
  var letras = ["A", "B", "C", "D"];

  // Renderiza a pergunta atual no card
  function renderizarPergunta() {
    var p = perguntas[indicePergunta];

    // Atualiza placar e barra de progresso
    numPergunta.textContent = indicePergunta + 1;
    barraFill.style.width   = ((indicePergunta / perguntas.length) * 100) + "%";

    // Monta o HTML da pergunta dinamicamente
    cardAtivo.innerHTML =
      '<div class="quiz-card">' +
        '<p class="quiz-num-pergunta">Pergunta ' + (indicePergunta + 1) + ' de ' + perguntas.length + '</p>' +
        '<p class="quiz-texto-pergunta">' + p.texto + '</p>' +
        '<div class="quiz-opcoes" id="quiz-opcoes"></div>' +
        '<div class="quiz-explicacao" id="quiz-explicacao">' + p.explicacao + '</div>' +
        '<button class="quiz-btn-proxima" id="quiz-btn-proxima">' +
          (indicePergunta < perguntas.length - 1 ? 'Próxima ' : 'Ver resultado ') +
        '</button>' +
      '</div>';

    // Cria os botões de opção
    var containerOpcoes = document.getElementById("quiz-opcoes");

    p.opcoes.forEach(function(texto, i) {
      var btn = document.createElement("button");
      btn.className = "quiz-opcao";
      btn.dataset.indice = i;
      btn.innerHTML = '<span class="opcao-letra">' + letras[i] + '</span>' + texto;
      btn.addEventListener("click", function() { processarResposta(i); });
      containerOpcoes.appendChild(btn);
    });

    // Listener do botão "próxima"
    document.getElementById("quiz-btn-proxima").addEventListener("click", avancarPergunta);
  }

  // Processa a resposta clicada pelo usuário
  function processarResposta(indiceEscolhido) {
    var p          = perguntas[indicePergunta];
    var botoes     = document.querySelectorAll(".quiz-opcao");
    var explicacao = document.getElementById("quiz-explicacao");
    var btnProxima = document.getElementById("quiz-btn-proxima");
    var acertou    = indiceEscolhido === p.indiceCorreto;

    // Desabilita todos os botões para evitar múltipla escolha
    botoes.forEach(function(btn) { btn.disabled = true; });

    // Destaca a opção clicada
    botoes[indiceEscolhido].classList.add(acertou ? "correta" : "errada");

    // Se errou, também mostra qual seria a correta
    if (!acertou) {
      botoes[p.indiceCorreto].classList.add("correta");
    }

    // Atualiza contadores
    if (acertou) {
      totalAcertos++;
      numAcertos.textContent = totalAcertos;
      numAcertos.className   = "acertos";
    } else {
      totalErros++;
      numErros.textContent = totalErros;
      numErros.className   = "erros";
    }

    // Exibe a explicação com estilo adequado (acerto/erro)
    explicacao.classList.add(acertou ? "acerto" : "erro");
    explicacao.style.display = "block";

    // Libera o botão de avançar
    btnProxima.style.display = "inline-flex";
  }

  // Avança para a próxima pergunta ou exibe o resultado final
  function avancarPergunta() {
    indicePergunta++;

    if (indicePergunta < perguntas.length) {
      renderizarPergunta();
    } else {
      exibirResultado();
    }
  }

  // Exibe a tela de resultado com pontuação e mensagem personalizada
  function exibirResultado() {
    cardAtivo.style.display       = "none";
    tela_resultado.style.display  = "block";
    barraFill.style.width         = "100%";

    var aproveitamento = Math.round((totalAcertos / perguntas.length) * 100);

    // Emoji e mensagem variam conforme o desempenho
    var mensagem;

    if (aproveitamento === 100) {
      mensagem = "Perfeito! Você domina todos os conceitos do OrbitMax Sentinel.";
    } else if (aproveitamento >= 70) {
      mensagem = "Ótimo! Você tem sólido conhecimento sobre satélites e monitoramento ambiental.";
    } else if (aproveitamento >= 50) {
      mensagem = "Bom esforço! Revise os conceitos de APIs, Edge Computing e ODS para melhorar.";
    } else {
      mensagem = "Continue explorando! Leia sobre NASA FIRMS, INPE e tecnologia espacial.";
    }

    document.getElementById("quiz-resultado-emoji").textContent  = emoji;
    document.getElementById("quiz-resultado-pontos").textContent = totalAcertos + "/" + perguntas.length;
    document.getElementById("quiz-resultado-msg").textContent    = mensagem;
  }

  // Reinicia o quiz do zero
  function reiniciarQuiz() {
    indicePergunta = 0;
    totalAcertos   = 0;
    totalErros     = 0;

    numAcertos.textContent        = "0";
    numErros.textContent          = "0";
    numPergunta.textContent       = "1";
    numAcertos.className          = "";
    numErros.className            = "";
    tela_resultado.style.display  = "none";
    cardAtivo.style.display       = "block";

    renderizarPergunta();
  }

  // Expõe reiniciarQuiz no escopo global para o onclick do botão no HTML
  window.reiniciarQuiz = reiniciarQuiz;

  // Inicializa o quiz
  renderizarPergunta();
}


// INICIALIZAÇÃO — 
document.addEventListener("DOMContentLoaded", function() {
  iniciarFormulario();
  iniciarQuiz();
});