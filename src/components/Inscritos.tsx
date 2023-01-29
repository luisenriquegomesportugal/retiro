import { FC, Fragment, useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import TreeNode from 'primereact/treenode';
import { onValue, ref } from 'firebase/database';
import { database } from '../config/firebase';
import { parseInscritos } from '../service/datatree';

const Inscritos: FC<{children?: any}> = ({children}) => {
    const [nodes, setNodes] = useState<TreeNode[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    useEffect(() => {
        let inscritosRef = ref(database, 'inscritos');
        return onValue(inscritosRef, function(snap) {
            let inscritosNode = parseInscritos(snap.val());
            setNodes(inscritosNode);
        });
    }, []);

    return <TreeTable
        paginator
        rows={5}
        value={nodes}
        globalFilter={globalFilter}
        emptyMessage="Não foi encontrado resultado para busca"
        header={<div className="flex justify-content-between align-items-center">
            <div className="p-input-icon-left">
                <i className="pi pi-search"></i>
                <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="Pesquisa" />
            </div>
        </div>}>
        <Column
            expander
            field="nome"
            header="Nome"
            className="text-2xl py-3">
        </Column>
        {children}
    </TreeTable>;
}

export default Inscritos;