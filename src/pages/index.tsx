import Tabela from "../components/Tabela";
import Layout from "../components/Layout";
import Cliente from "../core/Cliente";
import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import { useEffect, useState } from "react";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import useClientes from "@/hooks/useClientes";

export default function Home() {
  const {
    clienteCriado,
    clienteExcluido,
    clienteSalvo,
    clienteSelecionado,
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela
  } = useClientes()

  return (
    <>
      <div className="
        flex h-screen justify-center items-center
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white
      ">
        <Layout titulo="Cadastro simples">
          {
            tabelaVisivel ? (
              <>
                <div className="flex justify-end">
                  <Botao
                    className="mb-4" cor="green"
                    onClick={clienteCriado}
                  >
                    Novo Cliente
                  </Botao>
                </div>
                <Tabela
                  clientes={clientes}
                  clienteSelecionado={clienteSelecionado}
                  clienteExcluido={clienteExcluido}
                ></Tabela>
              </>
            ) :
              (
                <Formulario
                  cancelado={() => exibirTabela}
                  clienteMudou={clienteSalvo}
                  cliente={cliente}
                />
              )
          }
        </Layout>
      </div>
    </>
  )
}