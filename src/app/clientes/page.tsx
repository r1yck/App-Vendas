"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"; 
import styles from "./styles.module.css";

interface Cliente {
  id_cliente: number;
  nome: string;
  email: string;
}

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("/api/clientes");
        if (!response.ok) {
          throw new Error("Erro ao buscar clientes.");
        }
        const data = await response.json();
        setClientes(data.clientes);
      } catch (error) {
        setError("Erro ao carregar clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar /> {/* Navbar adicionada aqui */}
      <h1 className={styles.heading}>Lista de Clientes</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientesPage;
