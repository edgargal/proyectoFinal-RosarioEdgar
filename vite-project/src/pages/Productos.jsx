import React from 'react';
import { useCart } from '../context/CartContext';  
import img1 from '../img/cortinasblackout.webp';
import img2 from '../img/edredon-lisboa.webp';
import img3 from '../img/sabanas.png';

const Productos = () => {
  const { addToCart } = useCart(); 

  
  const productos = [
    { id: 1, name: 'Acolchados Corderito', image: img2, description: 'Edredón acolchado para invierno', price: 50000 },
    { id: 2, name: 'Cortinas', image: img1, description: 'Cortinas de tela Black Out, Luminizadas', price: 20000 },
    { id: 3, name: 'Almohadones', image: img3, description: 'Almohadones, Almohadas, Cojines, Fundas, Rellenos', price: 10000 }
  ];

  return (
    <main className="contenido-principal contenedor">
      <h2 className='principal-title'>Nuestros Productos</h2>

      <div className="listado-productos">
        {productos.map((producto) => (
          <div className="producto" key={producto.id}>
            <img src={producto.image} alt={`Imagen de ${producto.name}`} />
            <div className="texto-producto">
              <h3>{producto.name}</h3>
              <p>{producto.description}</p>
              <p className="precio">${producto.price.toLocaleString()}</p>
              <a
                href="#"
                className="btn"
                onClick={(e) => {
                  e.preventDefault(); 
                  addToCart(producto);  
                }}
              >
                Agregar al carrito
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Productos;
