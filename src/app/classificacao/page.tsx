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

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Classificações</h1>
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
