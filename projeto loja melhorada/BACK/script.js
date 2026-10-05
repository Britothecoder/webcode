document.addEventListener("DOMContentLoaded", function () {
  const formProduto = document.querySelector("#form-produto");
  const listaProdutos = document.querySelector("#lista-produtos");
  const btnSubmeter = document.querySelector("#btn-submeter");
  let itemEmEdicao = null;

  const produtosIniciais = [
    { nome: "Caderno", preco: "12.50", quantidade: "30" },
    { nome: "Caneta", preco: "2.00", quantidade: "100" },
    { nome: "Mochila", preco: "89.90", quantidade: "8" },
    { nome: "Estojo", preco: "15.00", quantidade: "20" }
  ];

  function criarItemProduto(nome, preco, quantidade) {
    const item = document.createElement("li");

    item.dataset.nome = nome;
    item.dataset.preco = preco;
    item.dataset.quantidade = quantidade;

    const textoSpan = document.createElement("span");
    textoSpan.className = "info-produto";
    textoSpan.textContent = `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;

    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes-produto";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn-editar";

    btnEditar.addEventListener("click", function () {
  
      document.querySelector("#nome").value = item.dataset.nome;
      document.querySelector("#preco").value = item.dataset.preco;
      document.querySelector("#quantidade").value = item.dataset.quantidade;

      itemEmEdicao = item;
      btnSubmeter.textContent = "Salvar alterações";
    });

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Remover";
    btnRemover.className = "btn-remover";

    btnRemover.addEventListener("click", function () {

      item.remove();

      if (itemEmEdicao === item) {
        resetarFormulario();
      }
    });

    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnRemover);

    item.appendChild(textoSpan);
    item.appendChild(divAcoes);

    return item;
  }
  function resetarFormulario() {
    formProduto.reset();
    itemEmEdicao = null;
    btnSubmeter.textContent = "Adicionar produto"; // Parte 4
  }

  formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value;
    const preco = document.querySelector("#preco").value;
    const quantidade = document.querySelector("#quantidade").value;

    if (itemEmEdicao) {

      itemEmEdicao.dataset.nome = nome;
      itemEmEdicao.dataset.preco = preco;
      itemEmEdicao.dataset.quantidade = quantidade;

      const textoSpan = itemEmEdicao.querySelector(".info-produto");
      textoSpan.textContent = `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;
    } else {

      const novoItem = criarItemProduto(nome, preco, quantidade);
      listaProdutos.appendChild(novoItem);
    }

    resetarFormulario();
  });

  produtosIniciais.forEach(function (produto) {
    const item = criarItemProduto(produto.nome, produto.preco, produto.quantidade);
    listaProdutos.appendChild(item);
  });
});