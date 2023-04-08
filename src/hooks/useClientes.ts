import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";
import Visibildiade from "./Visibilidade";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente();

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [clientes, setClientes] = useState<Cliente[]>([])

    const { exibirFormulario, exibirTabela, tabelaVisivel, formularioVisivel } = Visibildiade();

    useEffect(obterTodos, []);

    function obterTodos() {
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }
    function clienteSelecionado(cliente: Cliente) {
        setCliente(cliente);
        exibirFormulario();
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
        exibirFormulario();
        setCliente(Cliente.vazio());
    }
    return {
        clienteSelecionado,
        clienteExcluido,
        clienteSalvo,
        clienteCriado,
        obterTodos,
        cliente,
        clientes,
        tabelaVisivel,
        formularioVisivel,
        exibirFormulario,
        exibirTabela
    }
}