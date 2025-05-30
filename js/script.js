const cardapioData = {
  'bolo-decorado': [
    {
      imagem: 'img/img-bolo-simples-1.jpg',
      descricao: 'Pasta americana',
      massa: 'Massa de Margarina',
      preco_kg: 'R$ 110,00 kg'
    },
    {
      imagem: 'img/img-bolo-decorado-2.jpg',
      descricao: 'Chantilly',
      massa: 'Massa de Margarina',
      preco_kg: 'R$ 95,00 kg'
    },
    {
      imagem: 'img/img-bolo-decorado-3.jpg',
      descricao: 'Naked cake',
      massa: 'Massa de Margarina',
      preco_kg: 'R$ 90,00 kg (95,00 kg com frutas)'
    },
    {
      imagem: 'img/img-bolo-decorado-4.jpg',
      descricao: 'Scrapcake',
      massa: 'Massa de Margarina',
      preco_kg: 'R$ 95,00 kg'
    },
    {
      imagem: 'img/img-bolo-decorado-5.jpg',
      descricao: 'Pasta americana',
      massa: 'Massa de Manteiga',
      preco_kg: 'R$ 125,00 kg'
    },
    {
      imagem: 'img/img-bolo-decorado-6.jpg',
      descricao: 'Chantilly',
      massa: 'Massa de Manteiga',
      preco_kg: 'R$ 105,00 kg'
    },
    {
      imagem: 'img/img-bolo-decorado-6.jpg',
      descricao: 'Naked Cake',
      massa: 'Massa de Manteiga',
      preco_kg: 'R$ 100,00 kg (105,00 kg com frutas)'
    },
    {
      imagem: 'img/img-bolo-decorado-6.jpg',
      descricao: 'Scrapcake ',
      massa: 'Massa de Manteiga',
      preco_kg: 'R$ 105,00 kg'
    }
  ],
  'doces': [
    {
      imagem: 'img/img-doces-1.jpg',
      descricao: 'Porta retrato de chocolate',
      preco: 'R$ 8,50'
    },
    {
      imagem: 'img/img-doces-2.jpg',
      descricao: 'Maçãs 2D',
      preco: 'R$ 8,00'
    },
    {
      imagem: 'img/img-doces-3.jpg',
      descricao: 'Pirulito',
      preco: 'R$ 8,50'
    },
    {
      imagem: 'img/img-doces-4.jpg',
      descricao: 'Pirulito 3D',
      preco: 'R$ 10,00'
    },
    {
      imagem: 'img/img-doces-5.jpg',
      descricao: 'Cupcake 2D (Personalizado/Com Saiote)',
      preco: 'R$ 8,50 / R$ 10,00 com recheio'
    },
    {
      imagem: 'img/img-doces-6.jpg',
      descricao: 'Cupcake chantilly',
      preco: 'R$ 4,50 / R$ 6,00 recheado'
    },
    {
      imagem: 'img/img-doces-7.jpg',
      descricao: 'Cupcake 3D',
      preco: 'R$ 12,00'
    },
    {
      imagem: 'img/img-doces-8.jpg',
      descricao: 'Picolé 2D',
      preco: 'R$ 9,50'
    },
    {
      imagem: 'img/img-doces-9.jpg',
      descricao: 'Picolé 3D',
      preco: 'R$ 16,00'
    },
    {
      imagem: 'img/img-doces-10.jpg',
      descricao: 'Trufa 2D',
      preco: 'R$ 9,00'
    },
    {
      imagem: 'img/img-doces-11.jpg',
      descricao: 'Trufa Personagem',
      preco: 'R$ 10,00'
    },
    {
      imagem: 'img/img-doces-12.jpg',
      descricao: 'Trufa 3D com personagem',
      preco: 'R$ 15,00'
    },
    {
      imagem: 'img/img-doces-13.jpg',
      descricao: 'Trufa 3D dupla',
      preco: 'R$ 18,00'
    },
    {
      imagem: 'img/img-doces-14.jpg',
      descricao: 'Bolo no Palito 2D',
      preco: 'R$ 13,00'
    },
    {
      imagem: 'img/img-doces-15.jpg',
      descricao: 'Cone com personagem',
      preco: 'R$ 12,00'
    },
    {
      imagem: 'img/img-doces-16.jpg',
      descricao: 'Bolo 3D (Casinha / Poça de lama / Cama / Personagens sentados)',
      preco: 'R$ 20,00'
    },
    {
      imagem: 'img/img-doces-17.jpg',
      descricao: 'Doces modelado de leite ninho',
      preco: 'R$ 7,00 (unidade)'
    },
    {
      imagem: 'img/img-doces-18.jpg',
      descricao: 'Modelados leite ninho',
      preco: 'R$ 250,00 (cento)'
    },
    {
      imagem: 'img/img-doces-19.jpg',
      descricao: 'Doces personalizados',
      preco: 'R$ 220,00 (cento)'
    },
    {
      imagem: 'img/img-doces-20.jpg',
      descricao: 'Trufas personalizadas',
      preco: 'R$ 200,00 (cento)'
    }
  ],
};

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
        <hr>
    `;

    if (categoria === 'doces') {
      conteudo += `<div class="preco">${item.preco}</div>`;
    } else {
      conteudo += `
        <div class="massa">${item.massa}</div>
        <div class="preco">${item.preco_kg}</div>
      `;
    }

    conteudo += `</div>`;
    card.innerHTML = conteudo;

    cardapio.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarCategoria('bolo-decorado');
});
