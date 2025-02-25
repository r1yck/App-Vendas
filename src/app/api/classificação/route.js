import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * FROM Classificacao");

    return new Response(
      JSON.stringify({ classificacoes: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar classificações:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar classificações", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { id_produto, id_cliente, nota, comentario } = await req.json();

    if (!id_produto || !id_cliente || !nota || !comentario) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios.' }),
        { status: 400 }
      );
    }

    const connection = await createConnection();
    const [result] = await connection.execute(
      "INSERT INTO Classificacao (id_produto, id_cliente, nota, comentario) VALUES (?, ?, ?, ?)",
      [id_produto, id_cliente, nota, comentario]
    );

    const newClassificacao = { id: result.insertId, id_produto, id_cliente, nota, comentario };

    return new Response(
      JSON.stringify({ message: "Classificação criada", classificacao: newClassificacao }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar classificação:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao criar classificação", details: error.message }),
      { status: 500 }
    );
  }
}
