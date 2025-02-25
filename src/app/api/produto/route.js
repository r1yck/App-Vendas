import { createConnection } from "../../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT id_produto, nome, descricao, preco, quantidade_estoque, id_fornecedor FROM Produto"
    );

    return new Response(
      JSON.stringify({ produtos: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar produtos", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, descricao, preco, quantidade_estoque, id_fornecedor } = await req.json();

    if (!nome || !descricao || !preco || !quantidade_estoque || !id_fornecedor) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();

    // Verificar se o produto já existe pelo nome
    const [existingProducts] = await connection.execute("SELECT * FROM Produto WHERE nome = ?", [nome]);
    if (existingProducts.length > 0) {
      return new Response(
        JSON.stringify({ error: "Produto já existe." }),
        { status: 400 }
      );
    }

    // Inserir novo produto
    const [result] = await connection.execute(
      "INSERT INTO Produto (nome, descricao, preco, quantidade_estoque, id_fornecedor) VALUES (?, ?, ?, ?, ?)",
      [nome, descricao, preco, quantidade_estoque, id_fornecedor]
    );

    const newProduct = { id: result.insertId, nome, descricao, preco, quantidade_estoque, id_fornecedor };

    return new Response(
      JSON.stringify({ message: "Produto criado", produto: newProduct }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao cadastrar produto", details: error.message }),
      { status: 500 }
    );
  }
}
