document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkout');
  const itens = JSON.parse(localStorage.getItem('itensCheckout')) || [];

  if (itens.length === 0) {
    container.innerHTML = '<p>Nenhum item selecionado.</p>';
    return;
  }

  let totalCentavos = 0;

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

    // Evita erro de arredondamento usando toFixed(0)
    if (typeof item.valor === 'number') {
      totalCentavos += parseInt((item.valor * 100).toFixed(0));
    }
  });

  // Converter para reais com duas casas decimais
  const totalReais = (totalCentavos / 100).toFixed(2).replace('.', ',');

  const totalElement = document.createElement('div');
  totalElement.className = 'total-checkout';
  totalElement.innerHTML = `<strong>Total: R$ ${totalReais}</strong>`;
  container.appendChild(totalElement);
});
