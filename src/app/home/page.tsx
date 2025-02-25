"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

const HomePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Você pode limpar qualquer dado armazenado no localStorage ou sessão, se necessário
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.heading}>Bem-vindo à Home!</h1>
        <p className={styles.text}>
          Selecione uma das opções na navbar para gerenciar Clientes, Vendas ou Produtos.
        </p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </main>
    </div>
  );
};

export default HomePage;
