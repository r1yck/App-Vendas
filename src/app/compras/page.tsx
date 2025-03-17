"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Compra {
  id_compra: number;
  id_fornecedor: number;
  data_compra: string;
  valor_total: number;
}

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ id_fornecedor: "", valor_total: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch("/api/compras");
        if (!response.ok) {
          throw new Error("Erro ao buscar compras.");
        }
        const data = await response.json();
        setCompras(data.compras);
      } catch (error) {
        setError("Erro ao carregar compras.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertendo o valor_total para número (remover "R$" se necessário)
    const valorTotal = parseFloat(formData.valor_total.replace("R$", "").trim());

    // Verificando se o valor total é um número válido
    if (isNaN(valorTotal)) {
      alert("Valor total inválido");
      return;
    }

    const response = await fetch("/api/compras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_fornecedor: Number(formData.id_fornecedor), // Conversão para number
        valor_total: valorTotal,
      }),
    });
    

    const data = await response.json();

    if (response.ok) {
      alert("Compra registrada com sucesso!");
      setFormData({ id_fornecedor: "", valor_total: "" });
      setShowForm(false); // Esconde o formulário após submissão
    } else {
      alert(`Erro ao registrar compra: ${data.error || 'Erro desconhecido'}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Compras</h1>

      {/* Botão para exibir formulário */}
      <button onClick={() => setShowForm(!showForm)} className={styles.showFormButton}>
        {showForm ? "Cancelar Cadastro" : "Cadastrar Nova Compra"}
      </button>

      {/* Exibe o formulário apenas se showForm for true */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="id_fornecedor"
            placeholder="ID Fornecedor"
            value={formData.id_fornecedor}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="valor_total"
            placeholder="Valor Total"
            value={formData.valor_total}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Compra</button>
        </form>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : compras.length === 0 ? (
        <p>Nenhuma compra cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Fornecedor</th>
              <th>Data da Compra</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id_compra}>
                <td>{compra.id_compra}</td>
                <td>{compra.id_fornecedor}</td>
                <td>{new Date(compra.data_compra).toLocaleString()}</td>
                <td>R$ {Number(compra.valor_total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComprasPage;
