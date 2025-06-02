// checkout.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkout');
  const itens = JSON.parse(localStorage.getItem('itensCheckout')) || [];

  if (itens.length === 0) {
    container.innerHTML = '<p>Nenhum item selecionado.</p>';
    return;
  }

  let total = 0;

  itens.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card-checkout';

    let conteudo = `
      <img src="${item.imagem}" alt="${item.descricao}">
      <div class="card-info">
        <div class="descricao">${item.descricao}</div>
    `;

    if (item.preco) {
      conteudo += `<hr><div class="preco">${item.preco}</div>`;
    } else {
      conteudo += `<div class="massa">${item.massa}</div><hr><div class="preco">${item.preco_kg}</div>`;
    }

    conteudo += '</div>';
    card.innerHTML = conteudo;
    container.appendChild(card);

    // Soma o valor
    if (typeof item.valor === 'number') {
      total += item.valor;
    }
  });

  // Criar e exibir o total
  const totalElement = document.createElement('div');
  totalElement.className = 'total-checkout';
  totalElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
  container.appendChild(totalElement);

});
