import { FC, RefObject, useCallback, useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { DadosNovaInscricao } from '../../pages/NovaInscricao';
import { Toast } from 'primereact/toast';
import { ToastContext } from '../../App';
import { validateFile } from '../../service/storage';

interface Props {
    avancar: (dados: DadosNovaInscricao) => void
}

export const ComprovanteNovaInscricao: FC<Props> = ({ avancar }) => {
    const overlayPanel = useRef<OverlayPanel>(null);
    const toast = useContext<RefObject<Toast> | null>(ToastContext);
    const navigate = useNavigate();

    const [comprovante, setComprovante] = useState<string>();
    const [valorComprovante, setValorComprovante] = useState<number>();

    const salvarComprovante = useCallback(async (event) => {
        const [file] = event.files;

        const reader = new FileReader();
        let response = await fetch(file.objectURL);

        reader.readAsDataURL(await response.blob());
        reader.onloadend = function () {
            let data = reader.result as string;
            setComprovante(data);
        }
    }, [setComprovante]);

    const avancarParaInscritos = useCallback(() => {
        if (!comprovante || !valorComprovante) {
            toast?.current?.show({ summary: 'Erro ao avançar', detail: 'Campos precisam ser preenchidos', severity: 'error' });
            return;
        }

        if (!validateFile(comprovante)) {
            toast?.current?.show({ summary: 'Erro ao avançar', detail: 'Comprovante inválido', severity: 'error' });
            return;
        }

        if ((valorComprovante % 70) !== 0) {
            toast?.current?.show({ summary: 'Erro ao avançar', detail: 'O Valor do Comprovante precisa ser multiplo de 70', severity: 'error' });
            return;
        }

        avancar({ comprovante, valorComprovante });
    }, [avancar, comprovante, valorComprovante]);

    return <div className="flex flex-column">
        <div className="flex justify-content-between align-items-center">
            <div className="flex justify-content-start align-items-center">
                <i className="pi pi-arrow-left text-2xl mr-4 cursor-pointer" onClick={() => navigate('/inscricoes')}></i>
                <h2>Anexar comprovante</h2>
            </div>
            <div className="flex justify-content-end align-items-center">
                <Button
                    label="Selecionar os inscritos"
                    icon="pi pi-plus"
                    className="p-button-raised p-button-success py-2"
                    onClick={avancarParaInscritos} />
            </div>
        </div>
        <Card>
            <div className="field grid">
                <label className="col-12 lg:col-4 font-bold">Valor do Pix:</label>
                <div className="col">
                    <InputNumber value={valorComprovante} onValueChange={(e) => setValorComprovante(e.value)} mode="currency" currency="BRL" locale="pt-BR" />
                </div>
            </div>
            <div className="field grid">
                <label className="col-12 lg:col-4 font-bold align-self-start">
                    Comprovante do Pix:
                    <Button label="Qr Code" icon="pi pi-exclamation-circle text-2xl" className="p-button-rounded p-button-text mx-2" onClick={(e) => overlayPanel.current?.toggle(e)} />
                    <OverlayPanel ref={overlayPanel}>
                        <div className="flex flex-column">
                            <p className="m-0 mb-2 text-4xl font-bold">PIX</p>
                            <p className="m-0 text-2xl font-medium">Banco Inter</p>
                            <p className="m-0 text-2xl">
                                <span className="font-medium">Email: </span>
                                luisenriquegomesportugal@gmail.com
                            </p>
                            <Divider className="w-10rem my-5 align-self-center" />
                            <img src="/pix.png" alt="Pix das Inscrições" className="w-20rem mb-5 align-self-center" />
                        </div>
                    </OverlayPanel>
                </label>
                <div className="col flex align-items-center">
                    <FileUpload
                        auto
                        customUpload
                        accept="image/*,application/pdf"
                        name="comprovante"
                        chooseLabel="Adicionar"
                        className="w-full"
                        emptyTemplate={
                            <div className="flex align-items-center flex-column">
                                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Arraste o comprovante aqui (somente imagens)</span>
                            </div>}
                        onSelect={salvarComprovante} />
                </div>
            </div>
        </Card>
    </div>;
}
