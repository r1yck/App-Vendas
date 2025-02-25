import { createConnection } from "../../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT id_venda, id_cliente, data_venda, valor_total FROM Venda"
    );

    return new Response(
      JSON.stringify({ vendas: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar vendas", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { id_cliente, valor_total } = await req.json();

    if (!id_cliente || !valor_total) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();

    // Inserir nova venda
    const [result] = await connection.execute(
      "INSERT INTO Venda (id_cliente, valor_total) VALUES (?, ?)",
      [id_cliente, valor_total]
    );

    const newVenda = { id: result.insertId, id_cliente, valor_total };

    return new Response(
      JSON.stringify({ message: "Venda registrada com sucesso", venda: newVenda }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao registrar venda", details: error.message }),
      { status: 500 }
    );
  }
}
