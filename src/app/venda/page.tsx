"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Venda {
  id_venda: number;
  id_cliente: number;
  data_venda: string;
  valor_total: number;
}

const VendaPage = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await fetch("/api/venda");
        if (!response.ok) {
          throw new Error("Erro ao buscar vendas.");
        }
        const data = await response.json();
        setVendas(data.vendas);
      } catch (error) {
        setError("Erro ao carregar vendas.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Vendas</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : vendas.length === 0 ? (
        <p>Nenhuma venda cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Venda</th>
              <th>ID Cliente</th>
              <th>Data da Venda</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id_venda}>
                <td>{venda.id_venda}</td>
                <td>{venda.id_cliente}</td>
                <td>{new Date(venda.data_venda).toLocaleString()}</td>
                <td>R${(Number(venda.valor_total) || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendaPage;
