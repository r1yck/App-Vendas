"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Classificacao {
  id_classificacao: number;
  id_cliente: number;
  id_produto: number;
  nota: number;
  comentario: string;
  data_classificacao: string;
}

const ClassificacaoPage = () => {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id_produto: "",
    id_cliente: "",
    nota: "",
    comentario: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClassificacoes = async () => {
      try {
        const response = await fetch("/api/classificacao");
        if (!response.ok) {
          throw new Error("Erro ao buscar classificações.");
        }
        const data = await response.json();
        setClassificacoes(data.classificacoes);
      } catch (error) {
        console.error("Erro ao carregar classificações:", error);
        setError("Erro ao carregar classificações.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassificacoes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/classificacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_produto: formData.id_produto,
        id_cliente: formData.id_cliente,
        nota: parseInt(formData.nota),
        comentario: formData.comentario,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Classificação registrada com sucesso!");
      setFormData({
        id_produto: "",
        id_cliente: "",
        nota: "",
        comentario: "",
      });
      setShowForm(false); // Esconde o formulário após submissão
    } else {
      alert(`Erro ao registrar classificação: ${data.error || 'Erro desconhecido'}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Classificações</h1>

      {/* Botão para exibir formulário */}
      <button onClick={() => setShowForm(!showForm)} className={styles.showFormButton}>
        {showForm ? "Cancelar Cadastro" : "Cadastrar Nova Classificação"}
      </button>

      {/* Exibe o formulário apenas se showForm for true */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id_produto"
            placeholder="ID do Produto"
            value={formData.id_produto}
            onChange={handleChange}
            required
          />
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
            name="nota"
            placeholder="Nota (1-5)"
            value={formData.nota}
            onChange={handleChange}
            required
          />
          <textarea
            name="comentario"
            placeholder="Comentário"
            value={formData.comentario}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Classificação</button>
        </form>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : classificacoes.length === 0 ? (
        <p>Nenhuma classificação cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Cliente</th>
              <th>ID Produto</th>
              <th>Nota</th>
              <th>Comentário</th>
              <th>Data da Classificação</th>
            </tr>
          </thead>
          <tbody>
            {classificacoes.map((classificacao) => (
              <tr key={classificacao.id_classificacao}>
                <td>{classificacao.id_classificacao}</td>
                <td>{classificacao.id_cliente}</td>
                <td>{classificacao.id_produto}</td>
                <td>{classificacao.nota}</td>
                <td>{classificacao.comentario}</td>
                <td>{new Date(classificacao.data_classificacao).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassificacaoPage;
