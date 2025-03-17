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
  const [formData, setFormData] = useState({
    id_cliente: "",
    valor_total: "",
  });
  const [showForm, setShowForm] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/venda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_cliente: formData.id_cliente,
        valor_total: parseFloat(formData.valor_total),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Venda registrada com sucesso!");
      setFormData({
        id_cliente: "",
        valor_total: "",
      });
      setShowForm(false); // Esconde o formulário após submissão
    } else {
      alert(`Erro ao registrar venda: ${data.error || 'Erro desconhecido'}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Vendas</h1>

      {/* Botão para exibir formulário */}
      <button onClick={() => setShowForm(!showForm)} className={styles.showFormButton}>
        {showForm ? "Cancelar Cadastro" : "Cadastrar Nova Venda"}
      </button>

      {/* Exibe o formulário apenas se showForm for true */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id_cliente"
            placeholder="ID do Cliente"
            value={formData.id_cliente}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="valor_total"
            placeholder="Valor Total"
            value={formData.valor_total}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Venda</button>
        </form>
      )}

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
