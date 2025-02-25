import { createConnection } from "../../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * FROM Compra");

    return new Response(
      JSON.stringify({ compras: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar compras", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { id_fornecedor, valor_total } = await req.json();

    if (!id_fornecedor || !valor_total) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();
    const [result] = await connection.execute(
      "INSERT INTO Compra (id_fornecedor, valor_total) VALUES (?, ?)",
      [id_fornecedor, valor_total]
    );

    return new Response(
      JSON.stringify({ message: "Compra registrada com sucesso", id_compra: result.insertId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar compra:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao registrar compra", details: error.message }),
      { status: 500 }
    );
  }
}
