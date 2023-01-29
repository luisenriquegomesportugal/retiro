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

            return {
                "key": `R${celula}`,
                "data": {
                    "nome": `Refúgio ${celula}`,
                    "rede": rede?.rede
                },
                "children": parseChildren(rede?.rede, children)
            };
        })

    return celulas as TreeNode[];
}

const parseChildren = (rede: any, inscritos: Inscrito[]) => {
    return inscritos.map(inscrito => {
        return {
            "key": `${rede} ${inscrito.celula} ${inscrito.cpf}`,
            "data": inscrito
        };
    })
}