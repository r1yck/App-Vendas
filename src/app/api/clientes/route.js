import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT id_cliente, nome, email FROM Cliente");

    return new Response(
      JSON.stringify({ clientes: rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar clientes", details: error.message }),
      { status: 500 }
    );
  }
}
