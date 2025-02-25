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
            <button onClick={() => router.push("/clientes")}>Clientes</button>
          </li>
          <li>
            <button onClick={() => router.push("/vendas")}>Vendas</button>
          </li>
          <li>
            <button onClick={() => router.push("/produtos")}>Produtos</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
