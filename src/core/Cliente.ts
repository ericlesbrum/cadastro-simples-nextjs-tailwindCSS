export default class Cliente {
    private _id?: string
    private _nome: string
    private _idade: number

    constructor(nome: string, idade: number, id?: string) {
        this._id = id;
        this._idade = idade;
        this._nome = nome;
    }
    static vazio() {
        return new Cliente('', 0);
    }
    get id() {
        return this._id;
    }
    get idade() {
        return this._idade;
    }
    get nome() {
        return this._nome;
    }
}