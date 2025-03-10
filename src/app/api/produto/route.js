import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * FROM Produto");

    // Converte o preço para número, se necessário
    const produtos = rows.map(produto => ({
      ...produto,
      preco: parseFloat(produto.preco) // Converte para número
    }));

    return new Response(
      JSON.stringify({ produtos }),
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
    const { id_fornecedor, nome, descricao, preco, quantidade_estoque } = await req.json();

    if (!id_fornecedor || !nome || !preco || quantidade_estoque == null) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();
    const [result] = await connection.execute(
      "INSERT INTO Produto (id_fornecedor, nome, descricao, preco, quantidade_estoque) VALUES (?, ?, ?, ?, ?)",
      [id_fornecedor, nome, descricao, preco, quantidade_estoque]
    );

    const newProduto = {
      id_produto: result.insertId,
      id_fornecedor,
      nome,
      descricao,
      preco,
      quantidade_estoque,
    };

    return new Response(
      JSON.stringify({ message: "Produto criado", produto: newProduto }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao criar produto", details: error.message }),
      { status: 500 }
    );
  }
}
