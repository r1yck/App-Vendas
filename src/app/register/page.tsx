"use client";

import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa os erros anteriores

    // Validação dos campos
    if (!nome || !email || !telefone || !endereco || !dataNascimento || !senha || !confirmSenha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          nome, 
          email, 
          telefone, 
          endereco, 
          data_nascimento: dataNascimento, 
          senha 
        }),
      });

      console.log("Status da resposta:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Erro na API:", errorData);
        setError("Erro ao registrar usuário.");
        return;
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      setLoading(false);

      if (data && data.message === "Cliente criado") {
        router.push("/home");
      } else {
        setError(data.error || data.message || "Erro ao registrar usuário.");
      }
    } catch (error) {
      setLoading(false);
      setError("Erro ao conectar com o servidor.");
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Registro App Vendas</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Telefone" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <Input label="Endereço" type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        <Input label="Data de Nascimento" type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <Input label="Confirmar Senha" type="password" value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} required />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" label={loading ? "Registrando..." : "Registrar"} />
      </form>
    </div>
  );
};

export default RegisterPage;
