"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Local {
  id_local: number;
  nome: string;
  endereco: string;
}

const LocalPage = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ nome: "", endereco: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch("/api/local");
        if (!response.ok) {
          throw new Error("Erro ao buscar locais.");
        }
        const data = await response.json();
        setLocais(data.locais);
      } catch (error) {
        setError("Erro ao carregar locais.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: formData.nome,
        endereco: formData.endereco,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Local registrado com sucesso!");
      setFormData({ nome: "", endereco: "" });
      setShowForm(false); // Esconde o formulário após submissão
    } else {
      alert(`Erro ao registrar local: ${data.error || 'Erro desconhecido'}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Locais</h1>

      {/* Botão para exibir formulário */}
      <button onClick={() => setShowForm(!showForm)} className={styles.showFormButton}>
        {showForm ? "Cancelar Cadastro" : "Cadastrar Novo Local"}
      </button>

      {/* Exibe o formulário apenas se showForm for true */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do Local"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço do Local"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Local</button>
        </form>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : locais.length === 0 ? (
        <p>Nenhum local cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local) => (
              <tr key={local.id_local}>
                <td>{local.id_local}</td>
                <td>{local.nome}</td>
                <td>{local.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LocalPage;
