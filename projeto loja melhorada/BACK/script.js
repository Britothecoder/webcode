document.addEventListener("DOMContentLoaded", function () {
  const formProduto = document.querySelector("#form-produto");
  const listaProdutos = document.querySelector("#lista-produtos");
  const btnSubmeter = document.querySelector("#btn-submeter");

  // Variável para controlar se o formulário está no modo de EDIÇÃO ou de ADIÇÃO
  let itemEmEdicao = null;

  // Produtos iniciais
  const produtosIniciais = [
    { nome: "Caderno", preco: "12.50", quantidade: "30" },
    { nome: "Caneta", preco: "2.00", quantidade: "100" },
    { nome: "Mochila", preco: "89.90", quantidade: "8" },
    { nome: "Estojo", preco: "15.00", quantidade: "20" }
  ];

  // Função auxiliar para criar um elemento <li> completo com botões
  function criarItemProduto(nome, preco, quantidade) {
    const item = document.createElement("li");

    // Guarda os dados brutos no dataset do elemento para fácil recuperação na edição
    item.dataset.nome = nome;
    item.dataset.preco = preco;
    item.dataset.quantidade = quantidade;

    // Elemento span para o texto descritivo do produto
    const textoSpan = document.createElement("span");
    textoSpan.className = "info-produto";
    textoSpan.textContent = `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;

    // Container para os botões de ação
    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes-produto";

    // Parte 3: Criar Botão Editar
    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn-editar";

    btnEditar.addEventListener("click", function () {
      // Preenche os campos do formulário com os dados armazenados
      document.querySelector("#nome").value = item.dataset.nome;
      document.querySelector("#preco").value = item.dataset.preco;
      document.querySelector("#quantidade").value = item.dataset.quantidade;

      // Guarda a referência do item atual e muda o botão (Parte 4)
      itemEmEdicao = item;
      btnSubmeter.textContent = "Salvar alterações";
    });

    // Parte 2: Criar Botão Remover
    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Remover";
    btnRemover.className = "btn-remover";

    btnRemover.addEventListener("click", function () {
      // Remove somente este produto
      item.remove();

      // Se o item removido estava sendo editado no momento, reseta o formulário
      if (itemEmEdicao === item) {
        resetarFormulario();
      }
    });

    // Adiciona os botões ao container de ações
    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnRemover);

    // Monta o <li>
    item.appendChild(textoSpan);
    item.appendChild(divAcoes);

    return item;
  }

  // Função para limpar o formulário e resetar o estado do botão
  function resetarFormulario() {
    formProduto.reset();
    itemEmEdicao = null;
    btnSubmeter.textContent = "Adicionar produto"; // Parte 4
  }

  // Escuta a submissão do formulário
  formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value;
    const preco = document.querySelector("#preco").value;
    const quantidade = document.querySelector("#quantidade").value;

    if (itemEmEdicao) {
      // Parte 3: Atualiza o item existente sem criar um novo
      itemEmEdicao.dataset.nome = nome;
      itemEmEdicao.dataset.preco = preco;
      itemEmEdicao.dataset.quantidade = quantidade;

      const textoSpan = itemEmEdicao.querySelector(".info-produto");
      textoSpan.textContent = `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;
    } else {
      // Modo Normal: Cria um novo item e adiciona à lista
      const novoItem = criarItemProduto(nome, preco, quantidade);
      listaProdutos.appendChild(novoItem);
    }

    // Reseta o formulário e volta o botão para "Adicionar produto"
    resetarFormulario();
  });

  // Renderiza os produtos iniciais ao carregar a página
  produtosIniciais.forEach(function (produto) {
    const item = criarItemProduto(produto.nome, produto.preco, produto.quantidade);
    listaProdutos.appendChild(item);
  });
});