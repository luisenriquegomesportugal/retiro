export type Cargos = "Membro" | "Núcleo" | "Lider" | "Supervisor";

export type Parcela = {
    quantidade: string,
    comprovante: string
}

export interface Inscrito {
    celula: string | number;
    cpf: string;
    parcelas: string | Parcela[];
    cargo?: Cargos;
    nome?: string;
    sexo?: string;
    dataNascimento?: string;
    telefone?: string;
    observacao?: string;
    documentos?: string[];
}