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

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch("/api/fornecedor");
        if (!response.ok) {
          throw new Error("Erro ao buscar fornecedores.");
        }
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

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Fornecedores</h1>
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
