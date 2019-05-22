/*
O desafio de hoje será um pequeno projeto: um cronômetro!
As regras para criação do cronômetro são as seguintes:
1. Crie um arquivo index.html e adicione esse script a ele;
2. Crie um campo `input` do tipo `text`, e inicie-o com um valor 0 (zero).
Ele será o nosso cronômetro;
3. Crie 3 botões para as ações do cronômetro: Start, Stop e Reset;
4. Ao clicar em Start, o valor do campo deve ser incrementado de 1 em 1, a
cada segundo;
5. Ao clicar em Stop, o cronômetro deve parar de contar;
6. Ao clicar em Reset, o cronômetro deve zerar e parar de contar.

Utilize o atributo data-js para nomear o campo e os botões. Você pode
usar o nome que achar melhor, desde que ele seja semântico, ou seja, o nome
dado ao elemento HTML deve definir o que o elemento é ou o que ele faz.
*/

{
  ("use strict");
  const SEGUNDO = 1000;
  let $inputVisor = document.querySelector("[data-js=visor]");
  let $buttonStart = document.querySelector("[data-js=start]");
  let $buttonPause = document.querySelector("[data-js=pause]");
  let $buttonReset = document.querySelector("[data-js=reset]");
  let $buttonMode = document.querySelector("[data-js=mode]");
  let $labelModo = document.querySelector("[data-js=descricaoModo]");
  let rodando = false;
  let modo = 1;
  let temporizador;
  let tempo;
  let acoesDasTeclas = [
    {
      isTecla: tecla => tecla === " " || tecla === "F7",
      executar: () => (rodando ? pausarContagem() : iniciarContagem())
    },
    {
      isTecla: tecla => tecla === "Escape",
      executar: () => reiniciarContagem()
    },
    {
      isTecla: tecla => tecla.toUpperCase() === "M" || tecla === "F2",
      executar: () => alternarModo()
    }
  ];

  moment.locale("pt-br");

  function initialize() {
    initEvents();
  }

  function initEvents() {
    $buttonStart.addEventListener("click", iniciarContagem, false);
    $buttonPause.addEventListener("click", pausarContagem, false);
    $buttonReset.addEventListener("click", reiniciarContagem, false);
    $buttonMode.addEventListener("click", alternarModo, false);
    document.addEventListener("keydown", comandarPorTeclas, false);
  }

  let iniciarContagem = event => {
    setTempo();
    tempo.add(modo, "s");
    $inputVisor.value = tempo.format("HH:mm:ss");
    $buttonStart.removeEventListener("click", iniciarContagem, false);
    rodando = true;
    temporizador = setTimeout(iniciarContagem, SEGUNDO);
  };

  let pausarContagem = event => {
    $buttonStart.addEventListener("click", iniciarContagem, false);
    rodando = false;
    return clearTimeout(temporizador);
  };

  let reiniciarContagem = event => {
    pausarContagem();
    $inputVisor.value = "00:00:00";
  };

  function setTempo() {
    tempo = moment($inputVisor.value, "HH:mm:ss");
  }

  function comandarPorTeclas(event) {
    acoesDasTeclas
      .filter(acaoTecla => acaoTecla.isTecla(event.key))
      .forEach(acaoTecla => acaoTecla.executar());
  }

  function alternarModo() {
    modo *= -1;
    $labelModo.innerHTML = modo > 0 ? "ASC" : "DESC";
  }

  initialize();
}
