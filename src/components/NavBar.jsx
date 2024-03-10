import React from 'react'; 
import { Menubar } from 'primereact/menubar';

const NavBar = () => {
    const items = [
        {
            key: "home",
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
            key: "contact",
            label: 'Afiliados',
            icon: 'pi pi-user-plus',
            url: "/"
        }
    ];

    return (
        <div className="card">
            <Menubar model={items.map(item => ({...item, id: item.key}))} />
        </div>
    )
}

export default NavBar;
