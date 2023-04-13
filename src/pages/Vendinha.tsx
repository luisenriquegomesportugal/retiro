import React, {useEffect, useState} from 'react';
import TreeNode from "primereact/treenode";
import {Card} from "primereact/card";
import Inscritos from "../components/Inscritos";
import {Column} from "primereact/column";
import {NovoCompradorVendinhaModal} from "../components/vendinha/NovoCompradorVendinhaModal";
import {NovaCompraVendinhaModal} from "../components/vendinha/NovaCompraVendinhaModal";
import {ComprasVendinhaModal} from "../components/vendinha/ComprasVendinhaModal";
import {Venda} from "../types/Inscrito";
import {Produto} from "../types/Produto";
import {consultarProdutos} from "../service/database";
import {Badge} from "primereact/badge";

const Vendinha: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        (async () => {
            let _produtos = await consultarProdutos();
            setProdutos(_produtos);
        })();
    }, []);

    const buildSaldoColumn = (tree: TreeNode) => {
        if (tree.children) {
            let saldoGrupo = tree.children.reduce(function (am, child) {
                let saldoChild = child.data.vendinha?.reduce(
                    (sa: number, venda: Venda) => sa + (venda.pago ? 0 : (Number.parseInt(venda.quantidade!) * venda.valor)), 0.0);
                return am + (saldoChild || 0);
            }, 0.0);
            return saldoGrupo > 0 ? <Badge
                value={"Saldo devedor"}
                severity={"warning"}
                size="large"
            ></Badge> : '';
        } else {
            let saldoGrupo = tree.data.vendinha?.reduce(
                (sa: number, venda: Venda) => sa + (venda.pago ? 0 : (Number.parseInt(venda.quantidade!) * venda.valor)), 0.0)
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldoGrupo || 0);
        }
    }

    const buildTotalHeader = (nodes: TreeNode[]) => {
        return <span className="font-normal py-3 sm:py-0"></span>;
    }

    return <section>
        <div className="flex justify-content-between align-items-center">
            <h2>Vendinha</h2>
            <NovoCompradorVendinhaModal/>
        </div>
        <Card>
            <Inscritos header={buildTotalHeader}>
                <Column
                    field="telefone"
                    header="Telefone"
                    headerClassName="sm-invisible w-14rem"
                    bodyClassName="sm-invisible w-14rem"
                    className="text-2xl py-3 w-14rem">
                </Column>
                <Column
                    header="Saldo devedor"
                    headerClassName="w-full sm:w-25rem"
                    bodyClassName="w-full sm:w-25rem"
                    className="text-2xl py-3 w-full sm:w-25rem"
                    body={linha => buildSaldoColumn(linha)}>
                </Column>
                <Column
                    header=""
                    headerClassName="w-full sm:w-25rem"
                    bodyClassName="w-full sm:w-25rem"
                    className="text-2xl py-3 w-full sm:w-25rem"
                    body={linha => !linha.children && <div key={linha.key} className="flex justify-content-end align-items-center gap-2">
                        <NovaCompraVendinhaModal inscrito={linha.data} produtos={produtos} />
                        <ComprasVendinhaModal inscrito={linha.data}  />
                    </div>}>
                </Column>
            </Inscritos>
        </Card>
    </section>;
}

export default Vendinha;