import React, { useState } from 'react';
import { useCart } from '../context/CartContext';  
import { db, collection, addDoc } from '../config/firebaseConfig';


const Cart = () => {
  const { cart, removeFromCart, resetCart } = useCart();  
  const [isCheckout, setIsCheckout] = useState(false); 
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); 
  
  
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
  
    setIsCheckout(true);
  };

  const handleConfirmPurchase = async () => {
    // Simulamos el proceso de compra exitoso
    setPurchaseSuccess(true);
    setIsCheckout(false); 
    alert("¡Compra realizada con éxito!");
    
    // Guardar los detalles de la compra en Firestore
    try {
      const purchaseData = {
        products: cart,
        totalAmount: total,
        timestamp: new Date(), 
      };
      
    
      const docRef = await addDoc(collection(db, "compras"), purchaseData);
      console.log("Compra registrada con ID:", docRef.id);
      
     
      resetCart();
    } catch (error) {
      console.error("Error al registrar la compra: ", error);
    }
  };

  return (
    <div className="cart-widget">
      <span>🛒</span>
      <span>{totalItems}</span>  

      
      {cart.length > 0 && !isCheckout && (
        <div className="cart-details">
          <h4>Carrito de compras</h4>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span> - <span>{product.quantity}</span> - ${product.price * product.quantity}
                <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p> 
          <button onClick={handleCheckout}>Simular Compra</button>
        </div>
      )}

      
      {isCheckout && !purchaseSuccess && (
        <div className="checkout">
          <h3>Confirmar Compra</h3>
          <p>Por favor, confirma que deseas realizar la compra de los productos en tu carrito.</p>
          <button onClick={handleConfirmPurchase}>Confirmar y Finalizar Compra</button>
        </div>
      )}

     
      {purchaseSuccess && (
        <div className="purchase-success">
          <h4>¡Gracias por tu compra!</h4>
          <p>Tu compra ha sido procesada con éxito.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
