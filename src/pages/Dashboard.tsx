import React from 'react';

const Dashboard: React.FC = () => {
    return <section className="w-full h-full flex-1 flex flex-column justify-content-center align-items-center">
        <h2 className="text-6xl">Retiro Convergir</h2>
        <p className="text-justify text-xl" style={{ maxWidth: '60rem' }}>E nos revelou o mistério da sua vontade, de acordo com o seu bom propósito que ele estabeleceu em Cristo,
            isto é, de fazer convergir em Cristo todas as coisas, celestiais ou terrenas, na dispensação da plenitude dos tempos.
            <span className="block font-bold text-right">Efésios 1.9-10</span>
        </p>
    </section>;
}

export default Dashboard;