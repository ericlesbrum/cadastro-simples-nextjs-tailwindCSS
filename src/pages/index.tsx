import Tabela from "../components/Tabela";
import Layout from "../components/Layout";
import Cliente from "../core/Cliente";
import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import { useEffect, useState } from "react";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/backend/db/ColecaoCliente";

export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos, []);

  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisivel('tabela')
    })
  }
  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel('form');
  }
  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos();
  }
  async function clienteSalvo(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }
  function clienteCriado() {
    setVisivel('form');
    setCliente(Cliente.vazio());
  }

  return (
    <>
      <div className="
        flex h-screen justify-center items-center
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white
      ">
        <Layout titulo="Cadastro simples">
          {
            visivel === 'tabela' ? (
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
                  cancelado={() => setVisivel('tabela')}
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
