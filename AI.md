Foi requisitado para a IA Claude a criação, animação e responsividade das estrelas utilizadas na seção inicial da página, e para isso foi utilizada a biblioteca Math

Foi retornado pela IA o seguinte código: 

function iniciarEstrelas() {

  const canvas = document.getElementById("canvas-estrelas");
  let ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let estrelas = [];

  for (let i = 0; i < 200; i++) {
    estrelas.push({
      x: Math.random() * canvas.width,       // largura aleatória 
      y: Math.random() * canvas.height,      // altura aleatória 
      tamanho: Math.random() * 1.4 + 0.2,   // tamanho entre 0.2 e 1.6
      brilho: Math.random(),                 // opacidade inicial aleatória
      velocidade: Math.random() * 0.006 + 0.001 // velocidade q pisca 
    });
  }

  function desenharEstrelas() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    estrelas.forEach(function(estrela) {

      estrela.brilho += estrela.velocidade;
      var opacidade = (Math.sin(estrela.brilho) + 1) / 2;

      ctx.beginPath();
      ctx.arc(estrela.x, estrela.y, estrela.tamanho, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(226, 232, 240, " + opacidade + ")";
      ctx.fill();
    });

    requestAnimationFrame(desenharEstrelas);
  }

  desenharEstrelas();

  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
