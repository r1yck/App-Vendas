"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Fornecedor {
  id_fornecedor: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

const FornecedorPage = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch("/api/fornecedor");
        if (!response.ok) throw new Error("Erro ao buscar fornecedores.");
        const data = await response.json();
        setFornecedores(data.fornecedores);
      } catch (error) {
        setError("Erro ao carregar fornecedores.");
      } finally {
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/fornecedor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Fornecedor cadastrado com sucesso!");
      setFornecedores((prev) => [...prev, data.fornecedor]);
      setFormData({ nome: "", email: "", telefone: "", endereco: "" });
      setShowForm(false); // Esconde o formulário após submissão
    } else {
      alert(`Erro ao cadastrar fornecedor: ${data.error || "Erro desconhecido"}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Fornecedores</h1>

      {/* Botão para exibir formulário */}
      <button onClick={() => setShowForm(!showForm)} className={styles.showFormButton}>
        {showForm ? "Cancelar Cadastro" : "Cadastrar Novo Fornecedor"}
      </button>

      {/* Exibe o formulário apenas se showForm for true */}
      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar Fornecedor</button>
        </form>
      )}

      {/* Exibição de fornecedores */}
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : fornecedores.length === 0 ? (
        <p>Nenhum fornecedor cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Fornecedor</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id_fornecedor}>
                <td>{fornecedor.id_fornecedor}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FornecedorPage;
