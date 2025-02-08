import { collection, getDocs } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";

const useFetch = (nombreColeccion) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        console.log("Colección solicitada:", nombreColeccion);

        if (!nombreColeccion) {
          throw new Error("El nombre de la colección no puede estar vacío");
        }

       
        const productRef = collection(db, nombreColeccion);
        console.log("Referencia a la colección:", productRef);

        const snapshot = await getDocs(productRef);

       
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Productos obtenidos:", productsList);
        setData(productsList);
        setLoading(false);
      } catch (error) {
        console.log("Error al realizar la consulta:", error);
        setError('Error al consultar los datos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [nombreColeccion]);

  return { data, loading, error };
};

export default useFetch;