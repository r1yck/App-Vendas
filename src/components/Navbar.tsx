"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className={styles.navbar}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <button onClick={() => router.push("/home")}>Home</button>
          </li>
          <li>
            <button onClick={() => router.push("/classificacao")}>Classificações</button>
          </li>
          <li>
            <button onClick={() => router.push("/clientes")}>Clientes</button>
          </li>
          <li>
            <button onClick={() => router.push("/compras")}>Compras</button>
          </li>
          <li>
            <button onClick={() => router.push("/fornecedor")}>Fornecedores</button>
          </li>
          <li>
            <button onClick={() => router.push("/local")}>Locais</button>
          </li>
          <li>
            <button onClick={() => router.push("/produto")}>Produtos</button>
          </li>
          <li>
            <button onClick={() => router.push("/venda")}>Vendas</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;