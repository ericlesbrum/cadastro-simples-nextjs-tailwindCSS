import Cliente from "@/core/Cliente";
import Entrada from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}
export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id ?? undefined;
    const [nome, setNome] = useState(props.cliente?.nome ?? '');
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0);
    return (
        <div className="bg-gray-300 rounded-md p-4">
            {
                id ? (
                    <Entrada texto="Código" valor={id} somenteLeitura className="mb-4" />
                )
                    : false
            }
            <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-4" />
            <Entrada texto="Idade" tipo="number" valor={idade} valorMudou={setIdade} />
            <div className="flex justify-end mt-3">
                <Botao className="mr-2" onClick={() => props.cancelado?.()}>
                    Cancelar
                </Botao>
                <Botao cor="blue" onClick={() => props.clienteMudou?.(new Cliente(nome, idade, id))}>
                    {
                        id ? 'Alterar' : 'Salvar'
                    }
                </Botao>
            </div>
        </div>
    )
}