const cardapioData = {
  "cafes-quentes": [
    { nome: "Gatofé Expresso",   desc: "Expresso encorpado e intenso.",                    preco: "R$4",  img: "img/gatofe-expresso.jpeg" },
    { nome: "Catpuccino",        desc: "Espuma cremosa com leite vaporizado.",              preco: "R$8",  img: "img/catpuccino.jpeg" },
    { nome: "Café Meowtcha",     desc: "Blend especial de matcha com café.",               preco: "R$14", img: "img/meowtcha.jpeg" },
    { nome: "Latte",             desc: "Latte suave com canela e mel.",                    preco: "R$12", img: "img/latte.jpeg" },
    { nome: "Chocolate Quente",  desc: "Leite com achocolatado quente e cremoso.",         preco: "R$15", img: "img/chocolate-quente.jpeg" },
  ],
  "cafes-gelados": [
    { nome: "Cold Paw Brew",      desc: "Cold brew infusionado por 18 horas.",             preco: "R$14", img: "img/cold-paw-brew.png" },
    { nome: "Frappé Miado",       desc: "Frappé cremoso com caramelo e chantilly.",        preco: "R$16", img: "img/frappe-miado.png" },
    { nome: "Iced Matcha",        desc: "Matcha gelado com leite de aveia.",               preco: "R$15", img: "img/iced-matcha.png" },
    { nome: "Milkshake de Café",  desc: "Milkshake artesanal sabor café intenso.",         preco: "R$13", img: "img/milkshake.jpeg" },
    { nome: "Chá Gelado",         desc: "Chá da casa refrescante com limão e hortelã.",    preco: "R$10", img: "img/cha-gelado.jpeg" },
  ],
  "salgados": [
    { nome: "Croissant de Queijo", desc: "Croissant folhado com queijo derretido.",        preco: "R$9",  img: "img/croissant-queijo.jpeg" },
    { nome: "Pão de Queijo",       desc: "Clássico brasileiro fresquinho e crocante.",     preco: "R$5",  img: "img/pao-queijo.jpeg" },
    { nome: "Sanduba do Chef",     desc: "Sanduíche de frango com pesto e rúcula.",        preco: "R$22", img: "img/sanduba.jpeg" },
    { nome: "Quiche Espinafre",    desc: "Quiche cremosa com espinafre e ricota.",         preco: "R$18", img: "img/quiche.jpeg" },
    { nome: "Empada de Palmito",    desc: "Massa super amanteigada que derrete na boca, recheada com um creme de palmito bem temperado e pedaços macios",  preco: "R$14", img: "img/empada-palmito.jpeg" },

  ],
  "doces": [
    { nome: "Brownie Chocolatudo",  desc: "Brownie intenso de chocolate amargo.",            preco: "R$12", img: "img/brownie.jpeg" },
    { nome: "Cheesecake Felino",  desc: "Cheesecake clássica com frutas vermelhas.",       preco: "R$15", img: "img/cheesecake.jpeg" },
    { nome: "Cookie de Patinhas",    desc: "Cookie crocante com gotas de chocolate.",         preco: "R$7",  img: "img/cookie.jpeg" },
    { nome: "Muffin de Mirtilo",  desc: "Muffin fofinho com mirtilos frescos.",            preco: "R$10", img: "img/muffin.jpeg" },
    { nome: "Petit Gatô", desc: "Um bolinho 'felino' de chocolate belga com interior derretido e caloroso, servido com uma bola de sorvete de baunilha.", preco: "R$8", img: "img/petit-gato.jpeg"},
  ]
};

// Nomes para exibir no site
const labels = {
  "cafes-quentes": "Cafés Quentes",
  "cafes-gelados": "Cafés Gelados",
  "salgados":      "Salgados",
  "doces":         "Doces"
};

// Variáveis que guardam o que o usuário está vendo
let tabAtual = "todos"; // Qual aba está ativa
let buscaAtual = ""; // O que a pessoa digitou no campo de busca

// Retorna todas as categorias disponíveis
function getTodasCategorias() {
  return Object.keys(cardapioData);
}

// Cria o HTML de um único card de produto
function criarCard(item) {
  return `
    <div class="menu-card">
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.nome}" onerror="this.style.display='none'">
      </div>
      <div class="menu-card-info">
        <strong class="menu-card-nome">${item.nome}</strong>
        <p class="menu-card-desc">${item.desc}</p>
        <span class="menu-card-preco">${item.preco}</span>
      </div>
    </div>
  `;
}

// Cria uma seção inteira (título + carrossel)
function criarSecao(cat, itens) {
  const filtrados = buscaAtual
    ? itens.filter(i => i.nome.toLowerCase().includes(buscaAtual) || i.desc.toLowerCase().includes(buscaAtual))
    : itens;

  if (filtrados.length === 0) return "";

  return `
    <div class="menu-secao">
      <h3 class="menu-secao-titulo">${labels[cat]}</h3>
      <div class="menu-carrossel-wrapper">
        <button class="menu-arr menu-arr-left" onclick="scrollCarrossel(this, -1)" aria-label="anterior">&#8592;</button>
        <div class="menu-carrossel">
          ${filtrados.map(criarCard).join("")}
        </div>
        <button class="menu-arr menu-arr-right" onclick="scrollCarrossel(this, 1)" aria-label="próximo">&#8594;</button>
      </div>
    </div>
  `;
}

// Renderiza todo o cardápio na tela
function renderCardapio() {
  const container = document.getElementById("cardapio-conteudo");
  const cats = tabAtual === "todos" ? getTodasCategorias() : [tabAtual];
  const html = cats.map(cat => criarSecao(cat, cardapioData[cat])).join("");
  container.innerHTML = html || "<p style='color:#9A6040;padding:1rem'>Nenhum item encontrado.</p>";
}

// Troca de aba
function showTab(tab, btn) {
  tabAtual = tab;
  document.querySelectorAll(".ctab").forEach(b => b.classList.remove("active")); // Remove "active" de todos os botões
  btn.classList.add("active"); // Ativa o botão clicado
  renderCardapio();
} //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

// Filtra os itens conforme a busca
function filterItems(valor) {
  buscaAtual = valor.toLowerCase().trim();
  renderCardapio();
}

// Rola o carrossel para a esquerda ou direita
function scrollCarrossel(btn, direcao) {
  const carrossel = btn.parentElement.querySelector(".menu-carrossel");
  carrossel.scrollBy({ left: direcao * 280, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", renderCardapio);
// Estrelas do formulário de contato pqp como faz isso
        const stars = document.querySelectorAll('#contato-star-pick span');
        let selectedRating = 0;
 
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const val = +star.dataset.v;
                stars.forEach(s => s.classList.toggle('ativo', +s.dataset.v <= val));
            });
            star.addEventListener('mouseout', () => {
                stars.forEach(s => s.classList.toggle('ativo', +s.dataset.v <= selectedRating));
            });
            star.addEventListener('click', () => {
                selectedRating = +star.dataset.v;
                stars.forEach(s => s.classList.toggle('ativo', +s.dataset.v <= selectedRating));
            });
        });

// Quando a página carregar, renderiza o cardápio pela primeira vez
document.addEventListener("DOMContentLoaded", renderCardapio);
