import { FC } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Inscritos from '../components/Inscritos';
import { Column } from 'primereact/column';
import { calcIdade, calcParcelas } from '../service/utils';

const Inscricoes: FC = () => {
    const navigate = useNavigate();

    return <section>
        <div className="flex justify-content-between align-items-center">
            <h2>Inscrições</h2>        
            <Button 
                icon="pi pi-plus" 
                label="Cadastrar novas parcelas" 
                className="p-button-raised p-button-success h-3rem" 
                onClick={() => navigate('/inscricoes/nova')} />
        </div>
        <Card>
            <Inscritos>
                <Column
                    field="sexo"
                    header="Sexo" headerClassName="sm-invisible" bodyClassName="sm-invisible"
                    className="text-2xl py-3">
                </Column>
                <Column
                    field="dataNascimento"
                    header="Idade" headerClassName="sm-invisible" bodyClassName="sm-invisible"
                    className="text-2xl py-3"
                    body={linha => calcIdade(linha.data.dataNascimento)}>
                </Column>
                <Column
                    field="telefone"
                    header="Telefone" headerClassName="sm-invisible" bodyClassName="sm-invisible"
                    className="text-2xl py-3">
                </Column>
                <Column
                    header="Parcelas Pagas"
                    className="text-2xl py-3"
                    body={linha => calcParcelas(linha.data.parcelas)}>
                </Column>
            </Inscritos>
        </Card>
    </section>;
}

export default Inscricoes;