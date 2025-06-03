const itens = JSON.parse(localStorage.getItem('itensCheckout')) || [];

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

  const totalFixo = document.getElementById('valor-total-fixo');
  totalFixo.innerHTML = `<strong>Valor total: R$ ${totalReais}</strong>`;
  container.appendChild(totalElement);
});


// Botão de Enviar Pedido
document.addEventListener('DOMContentLoaded', () => {
  const btnEnviar = document.getElementById('btn-enviar-pedido');

  if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
      let mensagem = '*Pedido Lia Bolos Decorados*%0A%0A';

      itens.forEach((item, index) => {
        mensagem += `*${index + 1}.* ${item.descricao}%0A`;
        if (item.massa) {
          mensagem += `• Massa: ${item.massa}%0A`;
        }
        if (item.preco) {
          mensagem += `• Preço: ${item.preco}%0A`;
        } else {
          mensagem += `• Preço: ${item.preco_kg}%0A`;
        }
        mensagem += `%0A`;
      });

      // Total
      let totalCentavos = 0;
      itens.forEach(item => {
        if (typeof item.valor === 'number') {
          totalCentavos += parseInt((item.valor * 100).toFixed(0));
        }
      });
      const totalReais = (totalCentavos / 100).toFixed(2).replace('.', ',');

      mensagem += `*Valor total:* R$ ${totalReais}%0A`;
      mensagem += `%0A Gostaria de confirmar meu pedido.`;

      const telefone = '5598992278315';
      const url = `https://wa.me/${telefone}?text=${mensagem}`;
      window.open(url, '_blank');
    });
  }
});
