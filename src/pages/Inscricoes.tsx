import { FC, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Inscritos from '../components/Inscritos';
import { Column } from 'primereact/column';
import { calcIdade, calcParcelas } from '../service/utils';
import { consultarPermitirInscricao } from '../service/database';
import { Inscrito, Parcela } from '../types/Inscrito';
import TreeNode from 'primereact/treenode';

const Inscricoes: FC = () => {
    const navigate = useNavigate();
    const [permitirInscricao, setPermitirInscricao] = useState(false);

    useEffect(() => {
        (async () => {
            let _permitirInscricao = await consultarPermitirInscricao();
            setPermitirInscricao(_permitirInscricao);
        })();
    }, []);

    const buildParcelasColumn = (tree: TreeNode) => {
        if (tree.children) {
            let inscritos = tree.children.length;
            return `${inscritos} ${inscritos > 1 ? 'inscritos' : 'inscrito'}`;
        }
        else {
            let parcela = calcParcelas(tree.data.parcelas as Parcela[]);
            return `${parcela} ${parcela > 1 ? 'parcelas' : 'parcela'}`;
        }
    }

    const buildTotalHeader = (nodes: TreeNode[]) => {
        let inscritos = nodes
            .reduce((total, inscrito) => {
                if (inscrito.children) {
                    return total + inscrito.children.length;
                }

                return total;
            }, 0);

        return <span className="font-normal py-3 sm:py-0">
            Total de inscrições: <b>{inscritos} {inscritos > 1 ? 'inscritos' : 'inscrito'}</b>
        </span>;
    }

    return <section>
        <div className="flex justify-content-between align-items-center">
            <h2>Inscrições</h2>
            {
                permitirInscricao
                && <Button
                    icon="pi pi-plus"
                    label="Cadastrar novas parcelas"
                    className="p-button-raised p-button-success h-3rem"
                    onClick={() => navigate('/inscricoes/nova')} />
            }
        </div>
        <Card>
            <Inscritos header={buildTotalHeader}>
                <Column
                    field="sexo"
                    header="Sexo" 
                    headerClassName="sm-invisible w-8rem" 
                    bodyClassName="sm-invisible w-8rem"
                    className="text-2xl py-3 w-8rem">
                </Column>
                <Column
                    field="dataNascimento"
                    header="Idade" 
                    headerClassName="sm-invisible w-8rem" 
                    bodyClassName="sm-invisible w-8rem"
                    className="text-2xl py-3 w-8rem"
                    body={linha => calcIdade(linha.data.dataNascimento)}>
                </Column>
                <Column
                    field="telefone"
                    header="Telefone" 
                    headerClassName="sm-invisible w-14rem" 
                    bodyClassName="sm-invisible w-14rem"
                    className="text-2xl py-3 w-14rem">
                </Column>
                <Column
                    header="Parcelas Pagas"
                    headerClassName="w-full sm:w-25rem" 
                    bodyClassName="w-full sm:w-25rem"
                    className="text-2xl py-3 w-full sm:w-25rem"
                    body={linha => buildParcelasColumn(linha)}>
                </Column>
            </Inscritos>
        </Card>
    </section>;
}

export default Inscricoes;