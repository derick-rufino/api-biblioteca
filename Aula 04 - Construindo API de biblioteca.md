
# 🧑‍🏫 **Aula – Criando uma API REST de Biblioteca em Node.js (com dados mockados)**

---

## 🎯 **Objetivos da Aula**

* Configurar um **projeto Node.js + Express**.
* Criar endpoints REST para **CRUD completo** (Create, Read, Update, Delete).
* Trabalhar com **dados mockados em memória**.
* Implementar **filtros avançados, paginação e ordenação** com query strings.
* Organizar o projeto em **camadas** (Controller, Routes, Data).
* Testar a API com **Flashpost, Postman, Insomnia ou similares**.
* Preparar o projeto para evoluir para **Banco de Dados**.

---

## ✅ **Pré-requisitos**

### 🔧 **Verificando se você tem tudo instalado:**

1. **Node.js 18+** instalado:
   - Abra o terminal (PowerShell no Windows, Terminal no Mac/Linux)
   - Digite `node --version` e pressione Enter
   - Deve aparecer algo como `v18.17.0` ou superior
   - Se não tiver, baixe em: https://nodejs.org/

2. **Editor VS Code** ou similar:
   - Baixe em: https://code.visualstudio.com/
   - Instale as extensões recomendadas: "Flashpost"

3. **Conhecimentos básicos de JavaScript e HTTP**:
   - Saber o que são objetos, arrays e funções
   - Entender conceitos como GET, POST, PUT, DELETE

---

## 📍 **1. Criando o projeto e instalando dependências**

### 🎯 **Passo a passo detalhado:**

#### **1.1 Criando a pasta do projeto**
```bash
# Cria uma nova pasta chamada "api-biblioteca"
mkdir api-biblioteca

# Entra na pasta criada
cd api-biblioteca
```

💡 **O que isso faz:** Criamos uma pasta dedicada para nosso projeto e navegamos até ela.

#### **1.2 Inicializando o projeto Node.js**
```bash
# Cria o arquivo package.json com configurações padrão
npm init -y
```

💡 **O que isso faz:** O `package.json` é como uma "carteira de identidade" do nosso projeto. Ele guarda informações sobre o projeto e lista todas as dependências (bibliotecas) que vamos usar.

#### **1.3 Instalando as dependências principais**
```bash
# Express: framework para criar APIs web
# CORS: permite que navegadores façam requisições para nossa API
npm i express cors
```

💡 **O que cada uma faz:**
- **Express**: É como um "assistente" que facilita criar rotas (caminhos) da nossa API
- **CORS**: Resolve problemas de segurança quando nossa API for acessada por páginas web

#### **1.4 Instalando dependência de desenvolvimento**
```bash
# Nodemon: reinicia automaticamente o servidor quando salvamos um arquivo
npm i -D nodemon
```

💡 **O que isso faz:** O `-D` significa que é só para desenvolvimento. O nodemon "vigia" nossos arquivos e reinicia o servidor automaticamente quando fazemos mudanças.

#### **1.5 Configurando scripts no package.json**

Abra o arquivo `package.json` que foi criado e **substitua** a seção `"scripts"` por:

```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

💡 **Como fazer isso:**
1. Abra o VS Code na pasta do projeto: `code .`
2. Clique no arquivo `package.json`
3. Encontre a linha que tem `"scripts"`
4. Substitua o conteúdo conforme mostrado acima

💡 **O que cada script faz:**
- `npm run dev`: Inicia o servidor em modo desenvolvimento (com auto-reload)
- `npm start`: Inicia o servidor em modo produção

---

## 📍 **2. Estrutura de Pastas**

### 🏗️ **Criando a organização do projeto**

Nossa API será organizada em **camadas** para facilitar manutenção e crescimento futuro:

```
api-biblioteca/
├── package.json          ← Configurações do projeto
└── src/                  ← Todo nosso código fica aqui
    ├── index.js          ← Arquivo principal (servidor)
    ├── routes/           ← Define as URLs da API
    │   └── livros.routes.js
    ├── controllers/      ← Lógica de negócio
    │   └── livros.controller.js
    ├── data/            ← Dados falsos (mock)
    │   └── livros.mock.js
    └── middlewares/     ← Funções auxiliares
        └── error.js
```

### 🎯 **Como criar essa estrutura:**

#### **2.1 No terminal, execute os comandos:**
```bash
# Cria a pasta src (source = código fonte)
mkdir src

# Cria as subpastas dentro de src
mkdir src/routes
mkdir src/controllers  
mkdir src/data
mkdir src/middlewares
```

#### **2.2 Ou crie manualmente no VS Code:**
1. Clique com botão direito na pasta raiz do projeto
2. Selecione "New Folder"
3. Digite `src` e pressione Enter
4. Repita o processo dentro de `src` para criar: `routes`, `controllers`, `data`, `middlewares`

💡 **Por que essa organização?**
- **src/**: Mantém todo código organizado em um lugar
- **routes/**: Define quais URLs nossa API responde (ex: /api/livros)
- **controllers/**: Contém a lógica do que fazer quando alguém acessa uma rota
- **data/**: Armazena nossos dados falsos (depois será substituído pelo banco de dados)
- **middlewares/**: Funções que executam antes das rotas (ex: tratamento de erros)

### � **Resultado esperado:**
Após criar as pastas, você deve ver essa estrutura no Explorer do VS Code (painel esquerdo).

---

## �📍 **3. Criando os Dados Mockados (Dados Falsos)**

### 🎯 **O que são dados mockados?**
São dados falsos que criamos para testar nossa API sem precisar de um banco de dados real. É como ter uma "biblioteca virtual" na memória do computador.

### 📄 **Criando o arquivo `src/data/livros.mock.js`**

#### **3.1 Como criar o arquivo:**
1. No VS Code, clique com botão direito na pasta `src/data`
2. Selecione "New File"
3. Digite `livros.mock.js`
4. Pressione Enter

#### **3.2 Conteúdo do arquivo:**

```js
// Array com livros pré-cadastrados para testar nossa API
let livros = [
  { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, genero: "Fantasia" },
  { id: 2, titulo: "1984", autor: "George Orwell", ano: 1949, genero: "Distopia" },
  { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, genero: "Romance" },
  { id: 4, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, genero: "Infantil" },
  { id: 5, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997, genero: "Fantasia" }
];

// Função que gera o próximo ID disponível para novos livros
const nextId = () => (livros.length ? Math.max(...livros.map(l => l.id)) + 1 : 1);

// Exporta as funções para outros arquivos poderem usar
module.exports = { livros, nextId };
```

### 🔍 **Explicando o código linha por linha:**

1. **`let livros = [...]`**: Criamos um array (lista) com 5 livros para testar
2. **Cada livro tem**: id (número único), titulo, autor, ano, genero
3. **`nextId()`**: Função que calcula qual será o próximo ID quando criarmos um livro novo
   - `livros.map(l => l.id)`: Pega todos os IDs dos livros
   - `Math.max(...)`: Encontra o maior ID
   - `+ 1`: Adiciona 1 para ser o próximo
4. **`module.exports`**: Permite que outros arquivos "importem" essas informações

💡 **Por que usar `let` em vez de `const`?**
Porque vamos modificar esse array (adicionar, remover livros), então ele não pode ser constante.

---

## 📍 **4. Criando o Controller (Lógica da API)**

### 🎯 **O que é um Controller?**
É onde escrevemos a lógica de cada ação da nossa API. Cada função no controller corresponde a uma operação (listar, criar, atualizar, deletar).

### 📄 **Criando o arquivo `src/controllers/livros.controller.js`**

#### **4.1 Como criar:**
1. Clique com botão direito na pasta `src/controllers`
2. "New File" → `livros.controller.js`

#### **4.2 Conteúdo do arquivo:**

```js
// Importa os dados dos livros e a função nextId
const { livros, nextId } = require("../data/livros.mock");

// FUNÇÃO 1: LISTAR LIVROS com filtros, ordenação e paginação
// GET /api/livros?titulo=&autor=&genero=&anoMin=&anoMax=&sortBy=ano&order=asc&page=1&limit=5
function listar(req, res) {
  // Pega os parâmetros da URL (query strings) com valores padrão
  let { titulo = "", autor = "", genero = "", anoMin, anoMax, sortBy, order = "asc", page = 1, limit = 5 } = req.query;

  // Converte page e limit para números
  page = Number(page);
  limit = Number(limit);

  // Cria uma cópia do array original para não modificar o original
  let resultado = [...livros];

  // APLICANDO FILTROS (se foram fornecidos)
  if (titulo) resultado = resultado.filter(l => l.titulo.toLowerCase().includes(titulo.toLowerCase()));
  if (autor) resultado = resultado.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
  if (genero) resultado = resultado.filter(l => l.genero.toLowerCase().includes(genero.toLowerCase()));
  if (anoMin) resultado = resultado.filter(l => l.ano >= Number(anoMin));
  if (anoMax) resultado = resultado.filter(l => l.ano <= Number(anoMax));

  // APLICANDO ORDENAÇÃO (se foi fornecida)
  if (sortBy) {
    resultado.sort((a, b) => {
      const A = a[sortBy];
      const B = b[sortBy];
      if (A < B) return order === "asc" ? -1 : 1;  // Crescente: A vem antes de B
      if (A > B) return order === "asc" ? 1 : -1;  // Decrescente: B vem antes de A
      return 0; // São iguais
    });
  }

  // APLICANDO PAGINAÇÃO
  const total = resultado.length;        // Total de livros encontrados
  const start = (page - 1) * limit;     // Posição inicial desta página
  const end = start + limit;            // Posição final desta página  
  const data = resultado.slice(start, end); // Pega apenas os itens desta página

  // Retorna resposta JSON com informações da paginação
  return res.json({ total, page, limit, data });
}

// FUNÇÃO 2: OBTER UM LIVRO ESPECÍFICO POR ID
// GET /api/livros/:id
function obterPorId(req, res) {
  const id = Number(req.params.id);  // Pega o ID da URL
  const livro = livros.find(l => l.id === id);  // Procura o livro com esse ID
  
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
  
  return res.json(livro);
}

// FUNÇÃO 3: CRIAR UM NOVO LIVRO
// POST /api/livros
function criar(req, res) {
  const { titulo, autor, ano, genero } = req.body;  // Pega dados do corpo da requisição
  
  // Validação: titulo e autor são obrigatórios
  if (!titulo || !autor) {
    return res.status(400).json({ erro: "Campos obrigatórios: titulo, autor" });
  }

  // Cria o novo livro com ID automático
  const novo = { 
    id: nextId(), 
    titulo, 
    autor, 
    ano: ano ? Number(ano) : null,  // Converte para número se fornecido
    genero: genero || "Não informado"  // Valor padrão se não fornecido
  };
  
  livros.push(novo);  // Adiciona ao array
  return res.status(201).json(novo);  // 201 = Created
}

// FUNÇÃO 4: ATUALIZAR LIVRO COMPLETO
// PUT /api/livros/:id
function atualizar(req, res) {
  const id = Number(req.params.id);
  const { titulo, autor, ano, genero } = req.body;
  const idx = livros.findIndex(l => l.id === id);  // Encontra posição no array
  
  if (idx === -1) return res.status(404).json({ erro: "Livro não encontrado" });
  
  // PUT exige todos os campos obrigatórios
  if (!titulo || !autor) {
    return res.status(400).json({ erro: "Campos obrigatórios: titulo, autor" });
  }

  // Substitui o livro inteiro
  livros[idx] = { ...livros[idx], titulo, autor, ano: Number(ano), genero };
  return res.json(livros[idx]);
}

// FUNÇÃO 5: ATUALIZAR LIVRO PARCIALMENTE
// PATCH /api/livros/:id
function atualizarParcial(req, res) {
  const id = Number(req.params.id);
  const livro = livros.find(l => l.id === id);
  
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

  const { titulo, autor, ano, genero } = req.body;
  
  // PATCH permite atualizar apenas os campos fornecidos
  if (titulo !== undefined) livro.titulo = titulo;
  if (autor !== undefined) livro.autor = autor;
  if (ano !== undefined) livro.ano = Number(ano);
  if (genero !== undefined) livro.genero = genero;

  return res.json(livro);
}

// FUNÇÃO 6: REMOVER LIVRO
// DELETE /api/livros/:id
function remover(req, res) {
  const id = Number(req.params.id);
  const idx = livros.findIndex(l => l.id === id);
  
  if (idx === -1) return res.status(404).json({ erro: "Livro não encontrado" });

  const removido = livros.splice(idx, 1)[0];  // Remove do array e guarda o item removido
  return res.json({ mensagem: "Livro removido com sucesso", removido });
}

// Exporta todas as funções para usar nas rotas
module.exports = { listar, obterPorId, criar, atualizar, atualizarParcial, remover };
```

### 🔍 **Conceitos importantes explicados:**

1. **req.query**: Parâmetros da URL (ex: `?titulo=harry&ano=1997`)
2. **req.params**: Parâmetros da rota (ex: `/livros/:id` → `req.params.id`)
3. **req.body**: Dados enviados no corpo da requisição (JSON)
4. **res.json()**: Retorna resposta em formato JSON
5. **Status HTTP**:
   - 200: OK (sucesso)
   - 201: Created (criado com sucesso)
   - 400: Bad Request (erro nos dados enviados)
   - 404: Not Found (não encontrado)
   - 500: Internal Server Error (erro interno)

---

## 📍 **5. Criando as Rotas**

### 🎯 **O que são Rotas?**
São os "caminhos" da nossa API. Definem quais URLs respondem a quais funções do controller.

### 📄 **Criando o arquivo `src/routes/livros.routes.js`**

#### **5.1 Como criar:**
1. Botão direito na pasta `src/routes`
2. "New File" → `livros.routes.js`

#### **5.2 Conteúdo do arquivo:**

```js
// Importa o Express para criar rotas
const express = require("express");

// Cria um "roteador" - objeto que gerencia as rotas
const router = express.Router();

// Importa as funções do controller
const controller = require("../controllers/livros.controller");

// DEFININDO AS ROTAS E CONECTANDO COM AS FUNÇÕES

// GET /api/livros (listar todos os livros)
router.get("/", controller.listar);

// GET /api/livros/1 (obter livro específico pelo ID)
router.get("/:id", controller.obterPorId);

// POST /api/livros (criar novo livro)
router.post("/", controller.criar);

// PUT /api/livros/1 (atualizar livro completo)
router.put("/:id", controller.atualizar);

// PATCH /api/livros/1 (atualizar livro parcialmente)
router.patch("/:id", controller.atualizarParcial);

// DELETE /api/livros/1 (remover livro)
router.delete("/:id", controller.remover);

// Exporta o roteador para usar no arquivo principal
module.exports = router;
```

### 🔍 **Explicando cada rota:**

1. **`router.get("/", controller.listar)`**:
   - URL final: `GET /api/livros`
   - Ação: Lista todos os livros (com filtros opcionais)

2. **`router.get("/:id", controller.obterPorId)`**:
   - URL final: `GET /api/livros/1`
   - `:id` é um parâmetro dinâmico (pode ser qualquer número)
   - Ação: Retorna apenas o livro com ID específico

3. **`router.post("/", controller.criar)`**:
   - URL final: `POST /api/livros`
   - Ação: Cria um novo livro com dados do body

4. **`router.put("/:id", controller.atualizar)`**:
   - URL final: `PUT /api/livros/1`
   - Ação: Substitui todos os dados do livro

5. **`router.patch("/:id", controller.atualizarParcial)`**:
   - URL final: `PATCH /api/livros/1`
   - Ação: Atualiza apenas campos específicos

6. **`router.delete("/:id", controller.remover)`**:
   - URL final: `DELETE /api/livros/1`
   - Ação: Remove o livro do sistema

💡 **Diferença entre PUT e PATCH:**
- **PUT**: Substitui o objeto inteiro (precisa enviar todos os campos)
- **PATCH**: Atualiza apenas os campos enviados

---

## 📍 **6. Criando o Middleware de Erro**

### 🎯 **O que é um Middleware?**
É uma função que executa entre a requisição e a resposta. O middleware de erro "pega" qualquer erro inesperado e retorna uma mensagem amigável.

### 📄 **Criando o arquivo `src/middlewares/error.js`**

#### **6.1 Como criar:**
1. Botão direito na pasta `src/middlewares`
2. "New File" → `error.js`

#### **6.2 Conteúdo do arquivo:**

```js
// Middleware que captura qualquer erro não tratado na aplicação
function errorHandler(err, req, res, next) {
  // Mostra o erro detalhado no console para o desenvolvedor
  console.error("Erro inesperado:", err);
  
  // Retorna uma resposta genérica para o usuário (não mostra detalhes técnicos)
  res.status(500).json({ erro: "Erro interno do servidor" });
}

// Exporta a função para usar no arquivo principal
module.exports = errorHandler;
```

### 🔍 **Por que usar middleware de erro?**

1. **Segurança**: Evita que detalhes técnicos vazem para o usuário
2. **Experiência**: Sempre retorna uma resposta amigável em caso de erro
3. **Debug**: Mantém logs detalhados para o desenvolvedor
4. **Estabilidade**: Impede que a aplicação "quebre" por erros não previstos

💡 **Quando esse middleware é executado?**
Sempre que acontece um erro não tratado em qualquer parte da API.

---

## 📍 **7. Criando o Servidor Principal**

### 🎯 **O arquivo mais importante!**
Este é o "coração" da nossa API. Ele conecta tudo: rotas, middlewares e inicia o servidor.

### 📄 **Criando o arquivo `src/index.js`**

#### **7.1 Como criar:**
1. Botão direito na pasta `src`
2. "New File" → `index.js`

#### **7.2 Conteúdo do arquivo:**

```js
// IMPORTAÇÕES: Trazendo as bibliotecas e arquivos necessários
const express = require("express");      // Framework para criar APIs
const cors = require("cors");            // Permite requisições de outros domínios
const livrosRoutes = require("./routes/livros.routes");  // Nossas rotas de livros
const errorHandler = require("./middlewares/error");     // Tratamento de erros

// CRIANDO A APLICAÇÃO EXPRESS
const app = express();

// CONFIGURANDO MIDDLEWARES GLOBAIS (executam em todas as requisições)

// 1. CORS: Permite que navegadores façam requisições para nossa API
app.use(cors());

// 2. JSON Parser: Permite que a API entenda requisições com JSON no body
app.use(express.json());

// DEFININDO ROTAS

// Rota de teste para verificar se a API está funcionando
app.get("/", (req, res) => res.json({ status: "API Biblioteca Ativa" }));

// Rotas principais dos livros (prefixo /api/livros)
app.use("/api/livros", livrosRoutes);

// MIDDLEWARE DE ERRO (deve vir por último)
app.use(errorHandler);

// INICIANDO O SERVIDOR
const PORT = process.env.PORT || 3000;  // Porta 3000 ou a definida nas variáveis de ambiente
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 API de Livros disponível em http://localhost:${PORT}/api/livros`);
});
```

### 🔍 **Explicando linha por linha:**

1. **Importações**: Trazemos tudo que precisamos para funcionar
2. **`const app = express()`**: Cria nossa aplicação web
3. **`app.use(cors())`**: Permite requests de qualquer origem (importante para front-end)
4. **`app.use(express.json())`**: Permite receber dados JSON no body das requisições
5. **Rota de teste**: `GET /` retorna status da API
6. **`app.use("/api/livros", livrosRoutes)`**: Conecta nossas rotas com prefixo `/api/livros`
7. **`app.use(errorHandler)`**: Middleware de erro (SEMPRE por último)
8. **`app.listen()`**: Inicia o servidor na porta 3000

💡 **Por que usar `process.env.PORT`?**
Em produção (como Heroku), a plataforma define a porta automaticamente. Localmente, usamos 3000.

---

## 📍 **8. Testando a API**

### 🎯 **Hora de ver se tudo funciona!**

#### **8.1 Iniciando o servidor:**
```bash
# No terminal, dentro da pasta do projeto, execute:
npm run dev
```

**Resultado esperado:**
```
🚀 Servidor rodando em http://localhost:3000
📚 API de Livros disponível em http://localhost:3000/api/livros
```

💡 Se aparecer essa mensagem, tudo está funcionando! 🎉

#### **8.2 Testando no navegador:**

1. **Teste básico**: Abra `http://localhost:3000` no navegador
   - Deve aparecer: `{"status":"API Biblioteca Ativa"}`

2. **Listar livros**: Abra `http://localhost:3000/api/livros`
   - Deve aparecer a lista com os 5 livros mockados

#### **8.3 Testando com Postman/Insomnia/Thunder Client:**

### 📋 **Exemplos de requisições para testar:**

#### **1. Listar todos os livros:**
- **Método:** GET
- **URL:** `http://localhost:3000/api/livros`
- **Resultado:** Lista com todos os 5 livros

#### **2. Buscar livros com filtros:**
- **Método:** GET  
- **URL:** `http://localhost:3000/api/livros?titulo=harry&anoMin=1900&sortBy=ano&order=desc&page=1&limit=2`
- **Resultado:** Livros filtrados, ordenados e paginados

#### **3. Obter um livro específico:**
- **Método:** GET
- **URL:** `http://localhost:3000/api/livros/1`
- **Resultado:** Apenas o livro com ID 1

#### **4. Criar um novo livro:**
- **Método:** POST
- **URL:** `http://localhost:3000/api/livros`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "titulo": "A Revolução dos Bichos",
  "autor": "George Orwell", 
  "ano": 1945,
  "genero": "Distopia"
}
```

#### **5. Atualizar um livro (PUT):**
- **Método:** PUT
- **URL:** `http://localhost:3000/api/livros/1`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "titulo": "O Senhor dos Anéis: Sociedade do Anel",
  "autor": "J.R.R. Tolkien",
  "ano": 1954,
  "genero": "Fantasia Épica"
}
```

#### **6. Atualizar parcialmente (PATCH):**
- **Método:** PATCH
- **URL:** `http://localhost:3000/api/livros/1`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "genero": "Alta Fantasia"
}
```

#### **7. Deletar um livro:**
- **Método:** DELETE
- **URL:** `http://localhost:3000/api/livros/1`
- **Resultado:** Confirmação da remoção

### 🛠️ **Como usar o Thunder Client (extensão do VS Code):**

1. **Instalar extensão**: No VS Code, vá em Extensions e procure "Thunder Client"
2. **Abrir**: Clique no ícone do raio na barra lateral
3. **Nova requisição**: Clique em "New Request"
4. **Configurar**: Escolha método, digite URL, adicione body se necessário
5. **Enviar**: Clique em "Send"

### 🔍 **Verificando se está tudo funcionando:**

✅ **Checklist de testes:**
- [ ] GET `/` retorna status da API
- [ ] GET `/api/livros` retorna lista de 5 livros
- [ ] GET `/api/livros/1` retorna livro específico
- [ ] POST `/api/livros` cria novo livro
- [ ] PUT `/api/livros/1` atualiza livro completo
- [ ] PATCH `/api/livros/1` atualiza livro parcialmente
- [ ] DELETE `/api/livros/1` remove livro
- [ ] GET `/api/livros?titulo=harry` filtra por título

### ⚠️ **Problemas comuns e soluções:**

1. **"Cannot GET /"**: 
   - Verifique se o servidor está rodando (`npm run dev`)
   - Confirme se não há erros no terminal

2. **"EADDRINUSE: porta 3000 já está em uso"**:
   - Pare outros servidores na porta 3000
   - Ou mude a porta: `PORT=3001 npm run dev`

3. **"Cannot read property of undefined"**:
   - Verifique se todos os arquivos foram criados corretamente
   - Confirme se os caminhos dos `require()` estão corretos

4. **Erro 404 nas rotas**:
   - Verifique se a URL está correta
   - Confirme se as rotas estão sendo importadas no `index.js`

---

## 🚀 **Parabéns! Sua API está funcionando!**

### 🎯 **O que você conseguiu criar:**

✅ Uma API REST completa com:
- **CRUD** completo (Create, Read, Update, Delete)
- **Filtros** avançados por título, autor, gênero e ano
- **Ordenação** por qualquer campo (crescente/decrescente)
- **Paginação** para grandes volumes de dados
- **Validações** básicas de entrada
- **Tratamento de erros** profissional
- **Estrutura organizada** em camadas

### 📚 **Funcionalidades implementadas:**

1. **Listar livros** com filtros e paginação
2. **Buscar livro** por ID específico
3. **Criar novo livro** com validação
4. **Atualizar livro** completo (PUT)
5. **Atualizar livro** parcialmente (PATCH)
6. **Remover livro** do sistema
7. **Tratamento de erros** em todas as operações

---

## 🔍 **Diferenciais desta implementação**

✔ **Explicações detalhadas** para iniciantes
✔ **Comentários no código** explicando cada linha importante
✔ **Estrutura profissional** preparada para crescer
✔ **Filtros avançados** simulando aplicações reais
✔ **Paginação implementada** para performance
✔ **Validações de entrada** para segurança
✔ **Tratamento de erros** robusto
✔ **Código limpo** e bem organizado

---

## ✅ **Próximos passos sugeridos:**

### 🎯 **Atividades para praticar:**

1. **Adicionar campo disponibilidade:**
   - Adicione `disponivel: true/false` nos livros mockados
   - Crie endpoint `GET /api/livros/disponiveis` para listar apenas disponíveis

2. **Melhorar validações:**
   - Validar se o ano é um número válido
   - Validar se o título tem pelo menos 2 caracteres
   - Validar se o autor não está vazio

3. **Adicionar mais filtros:**
   - Filtro por múltiplos gêneros: `?generos=Fantasia,Romance`
   - Busca combinada: `?busca=harry` (procura em título E autor)

4. **Implementar soft delete:**
   - Em vez de remover, marcar como `deletado: true`
   - Filtrar livros não deletados nas listagens

### 🚀 **Evoluções futuras:**

1. **Banco de dados real** (MySQL, SQL Server)
2. **Autenticação** (JWT, sessions)
3. **Upload de capas** dos livros
4. **Sistema de empréstimos**
5. **API de usuários**
6. **Testes automatizados**
7. **Documentação** com Swagger
8. **Deploy** em produção (Heroku, AWS)

---

### 💡 **Dicas importantes:**

1. **Sempre teste** cada endpoint após criar
2. **Leia os erros** no terminal - eles te ajudam a encontrar problemas
3. **Use o console.log()** para debugar quando necessário
4. **Mantenha o código organizado** - facilita manutenção
5. **Documente** funcionalidades complexas
6. **Versionamento** use Git desde o início

---

### 🎉 **Você criou sua primeira API REST profissional!**

Esta base está pronta para evoluir para uma aplicação real. Continue praticando e explorando novas funcionalidades!
