const { livros, nextId } = require("../data/livros.mock");

// Função 1: Listar os livros com ordenação, filtros e paginação
// GET /api/livros?titulo=&autor=&genero... essas são as query strings ou parâmetros
function listar(request, response) {
  // Valores padrões das Query Strings
  let {
    titulo = "",
    autor = "",
    genero = "",
    anoMin,
    anoMax,
    sortBy,
    order = "asc",
    page = 1,
    limit = 5,
  } = request.query;

  // converte o page e limit para números
  page = Number(page);
  limit = Number(limit);

  // Criando uma cópia do array original para que não seja modificado
  let resultado = [...livros];

  // Aplicando filtros após checagem. Isso é, se existirem filtros, serão aplicados
  if (titulo)
    resultado = resultado.filter((l) =>
      l.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  if (autor)
    resultado = resultado.filter((l) =>
      l.autor.toLowerCase().includes(autor.toLowerCase())
    );
  if (genero)
    resultado = resultado.filter((l) =>
      l.genero.toLowerCase().includes(genero.toLowerCase())
    );
  if (anoMin) resultado = resultado.filter((l) => l.ano >= Number(anoMin));
  if (anoMax) resultado = resultado.filter((l) => l.ano <= Number(anoMax));

  // Aplicar ordenação caso o parâmetro sortBy seja fornecido
  if (sortBy) {
    resultado.sort((a, b) => {
      const A = a[sortBy];
      const B = b[sortBy];
      if (A < B) return order === "asc" ? -1 : 1; // Ordem crescente: A antes de B
      if (A > B) return order === "asc" ? 1 : -1; // Ordem decrescente: A depois de B
      return 0; // A é igual a B = São iguais
    });
  }

  // Aplicar Paginação
  const total = resultado.length; // Total de livros encontrados
  const start = (page - 1) * limit; // Posição incial desta página
  const end = start + limit; // Posição final
  const data = resultado.slice(start, end); // Pega todos os itens dessa página

  return response.json({ total, page, limit, data });
}

// Função 2 Obter um livro específico através do ID
// GET /api/livros/:id
function obterPorId(request, response) {
  const id = Number(request.params.id); // pega o ID direto da URL
  const livro = livros.find((l) => l.id === id); // Procura o livro com esse ID
}
