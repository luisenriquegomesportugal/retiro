import TreeNode from "primereact/treenode";
import celulasJson from "./../celulas.json";
import { Inscrito } from "../types/Inscrito";

export const parseInscritos = (data: any): TreeNode[] => {
    let celulas = Object
        .entries(data)
        .map(([celula, inscritos]) => {
            let rede = celulasJson.find(c => c.code == celula);
            let children = Object
                .values(inscritos as Inscrito[]);
            
            let nome = celula == 'supervisores'
                ? "Supervisores"
                : `Refúgio ${celula}`;

            return {
                "key": `${nome}`,
                "data": {
                    "nome": nome,
                    "rede": rede?.rede
                },
                "children": parseChildren(nome, children)
            };
        })

    return celulas as TreeNode[];
}

const parseChildren = (rede: any, inscritos: Inscrito[]) => {
    return inscritos.map(inscrito => {
        return {
            "key": `${rede} ${inscrito.cpf}`,
            "data": inscrito
        };
    })
}