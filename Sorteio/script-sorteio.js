const nomes = JSON.parse(localStorage.getItem("listaNomes") || "[]");
const sorteioUnico = localStorage.getItem("sorteioUnico") === "true";
const modoNumerico = localStorage.getItem("modoNumerico") === "true";
let nomesDisponiveis = [...nomes];
let sorteados = [];

if (sorteioUnico) {
  document.getElementById("painel-historico").classList.remove("oculto");
}

function sortear() {
  if (nomesDisponiveis.length === 0) {
    alert("Todos os itens já foram sorteados!");
    return;
  }

  let intervalo;
  let tempoTotal = 3000;
  let tempoPassado = 0;
  const exibicao = document.getElementById("sorteado");

  intervalo = setInterval(() => {
    const temp = nomesDisponiveis[Math.floor(Math.random() * nomesDisponiveis.length)];
    exibicao.textContent = temp;
    tempoPassado += 100;

    if (tempoPassado >= tempoTotal) {
      clearInterval(intervalo);

      const index = Math.floor(Math.random() * nomesDisponiveis.length);
      const resultado = nomesDisponiveis[index];
      exibicao.textContent = resultado;

      if (sorteioUnico) {
        sorteados.push(resultado);
        nomesDisponiveis.splice(index, 1);
        atualizarHistorico();
      }
    }
  }, 100);
}

function atualizarHistorico() {
  const ul = document.getElementById("lista-sorteados");
  ul.innerHTML = "";
  sorteados.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    ul.appendChild(li);
  });
}
