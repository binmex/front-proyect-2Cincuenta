import React from 'react'; 
import { Menubar } from 'primereact/menubar';

const NavBar = () => {
    const items = [
        {
            key: "home",
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            key:"eventos",
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            key: "contact",
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    return (
        <div className="card">
            <Menubar model={items.map(item => ({...item, id: item.key}))} />
        </div>
    )
}

export default NavBar;
