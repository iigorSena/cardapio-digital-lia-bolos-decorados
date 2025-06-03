// CONTROLE DE EXIBIÇÃO DOS BOTÕES DO MENU =======================================================
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


// EXIBIÇÃO DAS CATEGORIAS =========================================================================

const itensSelecionados = new Map(); // Armazena os itens selecionados com dados completos

function mostrarCategoria(categoria) {
  const cardapio = document.getElementById('cardapio');
  cardapio.innerHTML = ''; // Limpa o conteúdo atual

  // Adiciona a div 'area-aviso' com a mensagem se for a categoria de bolos
  if (categoria === 'bolo-decorado') {
    const areaAviso = document.createElement('div');
    areaAviso.className = 'area-aviso';
    
    const aviso = document.createElement('div');
    aviso.className = 'aviso-pedido';
    aviso.textContent = '*Pedido mínimo 1.5kg';
    
    areaAviso.appendChild(aviso);
    cardapio.appendChild(areaAviso); // Insere a área do aviso antes dos cards
  }

  // Renderiza os cards da categoria selecionada
  cardapioData[categoria].forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const itemId = item.descricao; // Usamos a descrição como identificador

    let conteudo = `
      <img src="${item.imagem}" alt="${item.descricao}">
      <div class="card-info">
      <div class="descricao">${item.descricao}</div>
      <input type="checkbox" class="card-checkbox" data-id="${itemId}" ${itensSelecionados.has(itemId) ? 'checked' : ''}>
    `;

    if (categoria === 'doces') {
      conteudo += `
        <hr>
        <div class="preco">${item.preco}</div>
        <div id="area-qtd">
        <label>Qtd:
        <input type="number" class="quantidade-input" data-id="${itemId}" value="${item.quant || 0}" min="1">
        </div>`;
    } else {
      conteudo += `
        <div class="massa">${item.massa}</div>
        <hr>
        <div class="preco">${item.preco_kg}</div>
        <div id="area-qtd">
        <label>Qtd:
        <input type="number" class="quantidade-input" data-id="${itemId}" value="${item.quant || 0}" min="1">
        </div>`;
    }

    conteudo += `</div>`;
    card.innerHTML = conteudo;

    cardapio.appendChild(card);
  });

  // Eventos para atualizar os itens selecionados
  const checkboxes = document.querySelectorAll('.card-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const item = cardapioData[categoria].find(i => i.descricao === id);

      if (e.target.checked) {
        itensSelecionados.set(id, item);
      } else {
        itensSelecionados.delete(id);
      }

      atualizarContadorCarrinho();
    });
  });

  // Atualiza o contador no carrinho
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById('notificacao-carrinho');
  const botaoCarrinho = document.getElementById('btn-carrinho');

  const totalSelecionados = itensSelecionados.size;
  contador.textContent = totalSelecionados;

  // Ativa ou desativa o botão com base no número de itens
  botaoCarrinho.disabled = totalSelecionados === 0;
}


// Clique no botão do carrinho: salva os itens e redireciona
document.getElementById('btn-carrinho').addEventListener('click', () => {
  // Salva no localStorage os itens selecionados como array
  localStorage.setItem('itensCheckout', JSON.stringify(Array.from(itensSelecionados.values())));
  window.location.href = 'checkout.html';
});