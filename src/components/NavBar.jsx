import React from 'react'; 
import { Menubar } from 'primereact/menubar';

const NavBar = () => {
    const items = [
        {
            key: "disciplina",
            label: 'Disciplina',
            icon: 'pi pi-sitemap',
            url: "/disciplina"
        },
        {
            key:"eventos",
            label: 'Eventos',
            icon: 'pi pi-calendar',
            url: "/eventos"
        },
        {
            key: "afiliados",
            label: 'Afiliados',
            icon: 'pi pi-user-plus',
            url: "/afiliados"
        },
        {
            key: "resultados",
            label: 'Resultados',
            icon: 'pi pi-megaphone',
            url: "/resultados"
        }
    ];

    return (
        <div className="card">
            <Menubar model={items.map(item => ({...item, id: item.key}))} />
        </div>
    )
}

export default NavBar;
