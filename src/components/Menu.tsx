import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimeIcons } from 'primereact/api';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Menu: React.FC = () => {
    const navigate = useNavigate();

    let items = [
        { label: 'Dashboard', icon: PrimeIcons.HOME, to: '/' },
        { label: 'Sorteio', icon: PrimeIcons.TICKET, to: '/sorteio' },
        { label: 'Inscrições', icon: PrimeIcons.USER_EDIT, to: '/inscricoes' },
        { label: 'Vendinha', icon: PrimeIcons.SHOPPING_BAG, to: '/vendinha' }
    ];

    return <aside className="m-5 flex flex-column">
        {
            items.map(item => (
                <Button className="p-button-text p-button-plain mb-4 p-0" onClick={() => navigate(item.to)}>
                    <Card className="py-2 w-20rem text-8xl" title={item.label} header={<i className={classNames('pi pi-fw mx-3 text-6xl', item.icon)} />} />
                </Button>
            ))
        }
    </aside>;
}

export default Menu;