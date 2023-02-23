import { get, push, ref, set } from "firebase/database";
import { database } from "../config/firebase";
import { Inscrito, Parcela } from "../types/Inscrito";
import { saveDocumentos } from "./storage";

export const consultarPermitirInscricao = async () => {
    let path = `configuracao/permitirInscricao`;
    let permissaoRef = ref(database, path);
    let permissao = await get(permissaoRef);

    return permissao.exists()
        && permissao.val() as boolean;
}

const getInscritoPath = (inscrito: Inscrito) => {
    let celularede = typeof inscrito.celula === 'string'
        ? 'supervisores'
        : inscrito.celula;

    let cpf = inscrito.cpf.replaceAll(/[.-]/g, "");
    return `inscritos/${celularede}/${cpf}`;
}

export const consultaInscrito = async (inscrito: Inscrito) => {
    let inscritoRef = ref(database, getInscritoPath(inscrito));
    return await get(inscritoRef);
}

export const saveInscritos = async (inscritos: Inscrito[], comprovante: any) => {
    for (let inscrito of inscritos) {
        let inscritoGet = await consultaInscrito(inscrito);

        if (!inscritoGet.exists()) {
            inscrito = await saveDocumentos(inscrito);
            inscrito.parcelas = [{
                quantidade: inscrito.parcelas as string,
                comprovante
            }];
        }
        else {
            let inscritoSaved = inscritoGet.val() as Inscrito;
            inscrito = {
                ...inscritoSaved,
                parcelas: [
                    ...inscritoSaved.parcelas as Parcela[],
                    {
                        quantidade: inscrito.parcelas as string,
                        comprovante
                    } as Parcela
                ]
            }
        }

        let inscritoParcelaRef = ref(database, getInscritoPath(inscrito));
        await set(inscritoParcelaRef, inscrito);
    }
}