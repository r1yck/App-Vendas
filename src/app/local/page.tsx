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

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Locais</h1>
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
