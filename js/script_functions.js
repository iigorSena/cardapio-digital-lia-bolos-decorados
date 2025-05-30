function mostrarCategoria(categoria) {
  const cardapio = document.getElementById('cardapio');
  cardapio.innerHTML = '';

  cardapioData[categoria].forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    let conteudo = `
      <img src="${item.imagem}" alt="${item.descricao}">
      <div class="card-info">
        <div class="descricao">${item.descricao}</div>
    `;

    if (categoria === 'doces') {
      conteudo += `
        <hr>
        <div class="preco">${item.preco}</div>`;
    } else {
      conteudo += `
        <div class="massa">${item.massa}</div>
        <hr>
        <div class="preco">${item.preco_kg}</div>`;
    }

    conteudo += `</div>`;
    card.innerHTML = conteudo;

    cardapio.appendChild(card);
  });
}

function selecionarCategoria(botao) {
  const categoria = botao.dataset.categoria;

  // Remove a classe 'ativo' de todos os botões
  document.querySelectorAll('.botao-categoria').forEach(btn => {
    btn.classList.remove('ativo');
  });

  // Adiciona a classe 'ativo' ao botão clicado
  botao.classList.add('ativo');

  // Mostra os itens da categoria selecionada
  mostrarCategoria(categoria);
}

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona automaticamente o primeiro botão (bolo-decorado)
  const botaoInicial = document.querySelector('.botao-categoria[data-categoria="bolo-decorado"]');
  if (botaoInicial) {
    botaoInicial.classList.add('ativo');
    mostrarCategoria('bolo-decorado');
  }
});
