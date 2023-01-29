import { get, push, ref, set } from "firebase/database";
import { database } from "../config/firebase";
import { Inscrito, Parcela } from "../types/Inscrito";
import { saveDocumentos } from "./storage";

export const saveInscritos = async (inscritos: Inscrito[], comprovante: any) => {
    for (let inscrito of inscritos) {
        let celularede = typeof inscrito.celula === 'string'
            ? 'supervisores'
            : inscrito.celula;

        let cpf = inscrito.cpf.replaceAll(/[.-]/g, "");
        let path = `inscritos/${celularede}/${cpf}`;

        let inscritoRef = ref(database, path);
        let inscritoGet = await get(inscritoRef);
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

        let inscritoParcelaRef = ref(database, path);
        await set(inscritoParcelaRef, inscrito);
    }
}