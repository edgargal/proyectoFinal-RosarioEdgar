import React from 'react';
import Logo from '../assets/Logo.png'

import Cart from  '../components/Cart';

const NavBar = () => {


    return (

        <nav className="nav-principal">
            <img src={Logo} alt="logo-silla" style={{ width: '30px', border: '1px solid black', borderRadius: '15px', backgroundColor: 'white', padding: '3px',position:'relative', top:'5px' }} />
            <h1>Mi Tienda</h1>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/productos">Productos</a></li>
                
                <li><a href="/SobreNosotros">Sobre Nosotros</a></li>
                <li><a href="/contacto">Contactanos</a></li>
               
            </ul>
            <Cart/>
        </nav>
        

    )
}






export default NavBar