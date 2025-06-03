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

    if (item.massa) {
      conteudo += `
        <div class="massa">${item.massa}</div>
        <div class="quantidade">Qtd: ${item.quant}</div>
        <hr>
        <div class="preco">${item.preco_kg}</div>`;
    } else {
      conteudo += `
        <div class="quantidade">Qtd: ${item.quant}</div>
        <hr>
        <div class="preco">${item.preco}</div>`;
    }

    conteudo += '</div>';
    card.innerHTML = conteudo;
    container.appendChild(card);

    // Usa valorTotal (já calculado corretamente com base na massa e quantidade)
    if (typeof item.valorTotal === 'number') {
      totalCentavos += Math.round(item.valorTotal * 100);
    }
  });

  // Converter para reais com duas casas decimais
  const totalReais = (totalCentavos / 100).toFixed(2).replace('.', ',');

  const totalFixo = document.getElementById('valor-total-fixo');
  totalFixo.innerHTML = `<strong>Valor total: R$ ${totalReais}</strong>`;
});


// Botão de Enviar Pedido
document.addEventListener('DOMContentLoaded', () => {
  const btnEnviar = document.getElementById('btn-enviar-pedido');
  const itens = JSON.parse(localStorage.getItem('itensCheckout')) || [];

  if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
      let mensagem = '*Pedido Lia Bolos Decorados*%0A%0A';
      let totalCentavos = 0;

      itens.forEach((item, index) => {
        mensagem += `*${index + 1}.* ${item.descricao}%0A`;

        if (item.massa) {
          mensagem += `• Massa: ${item.massa}%0A`;
        }

        mensagem += `• Quantidade: ${item.quant}%0A`;

        // Calcula valor total individual
        const valorItem = item.valorTotal || 0;
        const valorItemFormatado = (valorItem).toFixed(2).replace('.', ',');

        mensagem += `• Valor do item: R$ ${valorItemFormatado}%0A%0A`;

        totalCentavos += Math.round(valorItem * 100);
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
