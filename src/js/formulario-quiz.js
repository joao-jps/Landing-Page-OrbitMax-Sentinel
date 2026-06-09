
// FORMULÁRIO DE CONTATO
// Valida cada campo antes de permitir o envio.
// Nenhum campo pode estar vazio; e-mail precisa ter formato válido.

function iniciarFormulario() {
  console.log("Formulário: Inicializado..");
  console.log("Formulário: Aguardando interação do usuário.");
 
  const form      = document.getElementById("form-contato");
  const sucesso   = document.getElementById("form-sucesso");
  const btnEnviar = document.getElementById("form-btn-enviar");
 
  // Valida um campo de texto: não pode estar vazio (mínimo 2 chars)
  function validarTexto(idCampo) {
    const campo  = document.getElementById(idCampo);
    const grupo  = campo.closest(".form-grupo");
    const valido = campo.value.trim().length >= 2;
 
 
    aplicarEstado(campo, grupo, valido);
    return valido;
  }
 
  // Valida e-mail: apenas verifica se o campo não está vazio (é uma string preenchida)
  function validarEmail() {
    const campo  = document.getElementById("campo-email");
    const grupo  = campo.closest(".form-grupo");
    const valido = campo.value.trim() !== "";
 
 
    aplicarEstado(campo, grupo, valido);
    return valido;
  }
 
  // Valida select: não pode ficar na opção vazia
  function validarSelect(idCampo) {
    const campo  = document.getElementById(idCampo);
    const grupo  = campo.closest(".form-grupo");
    const valido = campo.value !== "";
 
 
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
    evento.preventDefault(); // impede recarregamento da página
    form.dataset.tentou = "sim"; // ativa validação em tempo real a partir daqui

    console.log("Formulário: Tentativa de envio detectada, validando.");

    const resultados = [
      validarTexto("campo-nome"),
      validarTexto("campo-instituicao"),
      validarEmail(),
      validarSelect("campo-estado"),
      validarSelect("campo-tipo-alerta"),
      validarTexto("campo-mensagem")
    ];

    // Só avança se todos os campos passaram na validação
    const tudoValido = resultados.every(function(r) { return r === true; });

    if (!tudoValido) {
      const totalInvalidos = resultados.filter(r => r === false).length;
      console.warn(`Formulário: Envio bloqueado — ${totalInvalidos} campo(s) inválido(s).`);

      // Foca no primeiro campo com problema para acessibilidade
      const primeiroInvalido = form.querySelector(".invalido");
      if (primeiroInvalido) primeiroInvalido.focus();
      return;
    }

    // Coleta os dados preenchidos para colocar no console log
    const dadosFormulario = {
      nome:        document.getElementById("campo-nome").value.trim(),
      instituicao: document.getElementById("campo-instituicao").value.trim(),
      email:       document.getElementById("campo-email").value.trim(),
      estado:      document.getElementById("campo-estado").value,
      tipoAlerta:  document.getElementById("campo-tipo-alerta").value,
      mensagem:    document.getElementById("campo-mensagem").value.trim()
    };

    console.log("Formulário: Todos os campos válidos.", dadosFormulario);

    // Simula envio — em produção seria um fetch POST para a API
    btnEnviar.textContent = "Enviando.";
    btnEnviar.disabled    = true;

    setTimeout(function() {
      form.style.display    = "none";
      sucesso.style.display = "block";
      console.log("Formulário: Envio concluído com sucesso! Tela de confirmação exibida.");
    }, 1000);
  });

 
  
}

// QUIZ INTERATIVO
// 10 perguntas sobre o tema. Exibe resultado ao final.
function iniciarQuiz() {
  console.log("[Quiz] Inicializado.");

  // --- Banco de perguntas ---
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

  console.log(`[Quiz] ${perguntas.length} perguntas carregadas.`);

  // --- Estado do quiz (let porque mudam ao longo do jogo) ---
  let indicePergunta = 0;
  let totalAcertos   = 0;
  let totalErros     = 0;

  // --- Referências aos elementos fixos do quiz ---
  const cardAtivo      = document.getElementById("quiz-card-ativo");
  const telaResultado  = document.getElementById("quiz-resultado");
  const barraFill      = document.getElementById("quiz-barra-fill");
  const numPergunta    = document.getElementById("quiz-num-pergunta-placar");
  const numAcertos     = document.getElementById("quiz-acertos-placar");
  const numErros       = document.getElementById("quiz-erros-placar");

  // Letras das alternativas (const porque nunca muda)
  const letras = ["A", "B", "C", "D"];

  // Renderiza a pergunta atual no card
  function renderizarPergunta() {
    const p = perguntas[indicePergunta];

    console.log(`[Quiz] Renderizando pergunta ${indicePergunta + 1}/${perguntas.length}: "${p.texto}"`);

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
          (indicePergunta < perguntas.length - 1 ? 'Próxima ' : 'Ver resultado.') +
        '</button>' +
      '</div>';

    // Cria os botões de opção
    const containerOpcoes = document.getElementById("quiz-opcoes");

    p.opcoes.forEach(function(textoOpcao, i) {
      const btn = document.createElement("button");
      btn.className      = "quiz-opcao";
      btn.dataset.indice = i;
      btn.innerHTML      = '<span class="opcao-letra">' + letras[i] + '</span>' + textoOpcao;
      btn.addEventListener("click", function() { processarResposta(i); });
      containerOpcoes.appendChild(btn);
    });

    // Listener do botão "próxima"
    document.getElementById("quiz-btn-proxima").addEventListener("click", avancarPergunta);
  }

  // Processa a resposta clicada pelo usuário
  function processarResposta(indiceEscolhido) {
    const p          = perguntas[indicePergunta];
    const botoes     = document.querySelectorAll(".quiz-opcao");
    const explicacao = document.getElementById("quiz-explicacao");
    const btnProxima = document.getElementById("quiz-btn-proxima");
    const acertou    = indiceEscolhido === p.indiceCorreto;
    const letraEscolhida = letras[indiceEscolhido];
    const letraCorreta   = letras[p.indiceCorreto];

    console.log(`[Quiz] Pergunta ${indicePergunta + 1} — Usuário escolheu opção ${letraEscolhida}: "${p.opcoes[indiceEscolhido]}"`);
    console.log(`[Quiz] Resposta ${acertou ? "CORRETA" : `INCORRETA (correta era ${letraCorreta}: "${p.opcoes[p.indiceCorreto]}")`}`);

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

    console.log(`[Quiz] Placar atual → Acertos: ${totalAcertos} | Erros: ${totalErros}`);

    // Exibe a explicação com estilo adequado (acerto/erro)
    explicacao.classList.add(acertou ? "acerto" : "erro");
    explicacao.style.display = "block";

    // Libera o botão de avançar
    btnProxima.style.display = "inline-flex";
  }

  // Avança para a próxima pergunta ou exibe o resultado final
  function avancarPergunta() {
    console.log(`[Quiz] Usuário avançou da pergunta ${indicePergunta + 1}`);
    indicePergunta++;

    if (indicePergunta < perguntas.length) {
      renderizarPergunta();
    } else {
      exibirResultado();
    }
  }

  // Exibe a tela de resultado com pontuação e mensagem personalizada
  function exibirResultado() {
    cardAtivo.style.display      = "none";
    telaResultado.style.display  = "block";
    barraFill.style.width        = "100%";

    const aproveitamento = Math.round((totalAcertos / perguntas.length) * 100);

    // mensagem varia conforme o desempenho
    let mensagem;

    if (aproveitamento === 100) {
      mensagem = "Perfeito! Você domina todos os conceitos do OrbitMax Sentinel.";
    } else if (aproveitamento >= 70) {
      mensagem = "Ótimo! Você tem sólido conhecimento sobre satélites e monitoramento ambiental.";
    } else if (aproveitamento >= 50) {
      mensagem = "Bom esforço! Revise os conceitos de APIs, Edge Computing e ODS para melhorar.";
    } else {
      mensagem = "Continue explorando! Leia sobre NASA FIRMS, INPE e tecnologia espacial.";
    }

    console.log(`[Quiz] Quiz finalizado!`);
    console.log(`[Quiz] Resultado → ${totalAcertos}/${perguntas.length} acertos (${aproveitamento}%)`);
    console.log(`[Quiz] Classificação → ${mensagem}`);

    document.getElementById("quiz-resultado-pontos").textContent = totalAcertos + "/" + perguntas.length;
    document.getElementById("quiz-resultado-msg").textContent    = mensagem;
  }

  // Reinicia o quiz do zero
  function reiniciarQuiz() {
    console.log("[Quiz] Reiniciando quiz.");

    indicePergunta = 0;
    totalAcertos   = 0;
    totalErros     = 0;

    numAcertos.textContent       = "0";
    numErros.textContent         = "0";
    numPergunta.textContent      = "1";
    numAcertos.className         = "";
    numErros.className           = "";
    telaResultado.style.display  = "none";
    cardAtivo.style.display      = "block";

    console.log("[Quiz] Estado resetado. Reiniciando da pergunta 1.");
    renderizarPergunta();
  }

  // Expõe reiniciarQuiz no escopo global para o onclick do botão no HTML
  window.reiniciarQuiz = reiniciarQuiz;

  // Inicializar o quiz
  renderizarPergunta();
  console.log("[Quiz] Pronto. Aguardando interação do usuário.");
}

// INICIALIZAÇÃO — igual ao padrão do behaviour.js
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM carregado. Iniciando formulário e quiz.");
  iniciarFormulario();
  iniciarQuiz();
  iniciarTrocaTema();
  console.log("OrbitMax Sentinel pronta para uso.");
});