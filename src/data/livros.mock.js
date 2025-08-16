// Array de objetos com livros pré-cadastrados para nossa API
let livros = [
  {
    id: 1,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: 1954,
    genero: "Fantasia",
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    ano: 1949,
    genero: "Distopia",
  },
  {
    id: 3,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    ano: 1899,
    genero: "Romance",
  },
  {
    id: 4,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    ano: 1943,
    genero: "Infantil",
  },
  {
    id: 5,
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    ano: 1997,
    genero: "Fantasia",
  },
];

// Função para gerar o o próximo ID para novos livros
const nextId = () =>
  livros.length ? Math.max(...livros.map((l) => l.id)) + 1 : 1;
/* Cria uma nova função nextID: 
    usa map() para pegar todos os IDs
    Math.max(...) encontra o maior ID do array e então itera sobre ele
*/

// Exporta as funções para que se torne acessível de modo global no projeto
module.exports = { livros, nextId };
