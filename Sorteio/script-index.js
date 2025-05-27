let nomesArquivo = [];

document.getElementById("arquivo").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const conteudo = e.target.result;
    nomesArquivo = conteudo
      .split("\n")
      .map(l => l.trim())
      .filter(l => l !== "");
  };
  reader.readAsText(file);
});

function comecarSorteio() {
  const modoNumerico = document.getElementById("modoNumerico").checked;
  const sorteioUnico = document.getElementById("unico").checked;
  localStorage.setItem("sorteioUnico", sorteioUnico);
  localStorage.setItem("modoNumerico", modoNumerico);

  if (modoNumerico) {
    const min = parseInt(document.getElementById("minNumero").value);
    const max = parseInt(document.getElementById("maxNumero").value);
    if (isNaN(min) || isNaN(max) || min >= max) {
      alert("Preencha o intervalo corretamente.");
      return;
    }
    const listaNumeros = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    localStorage.setItem("listaNomes", JSON.stringify(listaNumeros));
  } else {
    const entradaTexto = document.getElementById("entrada").value;
    const nomesTexto = entradaTexto
      .split(/[\n,]/)
      .map(nome => nome.trim())
      .filter(nome => nome !== "");
    const todosOsNomes = [...new Set([...nomesTexto, ...nomesArquivo])];
    if (todosOsNomes.length === 0) {
      alert("Adicione pelo menos um nome!");
      return;
    }
    localStorage.setItem("listaNomes", JSON.stringify(todosOsNomes));
  }

  window.open("sorteio.html", "_blank");
}
