"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Produto {
  id_produto: number;
  id_fornecedor: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
}

const ProdutoPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id_fornecedor: "",
    nome: "",
    descricao: "",
    preco: "",
    quantidade_estoque: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("/api/produto");
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos.");
        }
        const data = await response.json();
        setProdutos(data.produtos);
      } catch (error) {
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/produto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_fornecedor: formData.id_fornecedor,
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        quantidade_estoque: parseInt(formData.quantidade_estoque, 10),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Produto registrado com sucesso!");
      setFormData({
        id_fornecedor: "",
        nome: "",
        descricao: "",
        preco: "",
        quantidade_estoque: "",
      });
      setShowForm(false); // Esconde o formulário após submissão
    } else {
      alert(`Erro ao registrar produto: ${data.error || 'Erro desconhecido'}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Produtos</h1>

      {/* Botão para exibir formulário */}
      <button onClick={() => setShowForm(!showForm)} className={styles.showFormButton}>
        {showForm ? "Cancelar Cadastro" : "Cadastrar Novo Produto"}
      </button>

      {/* Exibe o formulário apenas se showForm for true */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id_fornecedor"
            placeholder="ID do Fornecedor"
            value={formData.id_fornecedor}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome do Produto"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição do Produto"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="preco"
            placeholder="Preço do Produto"
            value={formData.preco}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantidade_estoque"
            placeholder="Quantidade em Estoque"
            value={formData.quantidade_estoque}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Produto</button>
        </form>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fornecedor</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade em Estoque</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_produto}>
                <td>{produto.id_produto}</td>
                <td>{produto.id_fornecedor}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>{produto.quantidade_estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProdutoPage;
