import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";
import { products } from "../service/Constantes";
import { db } from "../config/firebaseConfig";
import { useState } from "react";




const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export const Header = () => {
  const { user, Login, Logout } = useUser();
  console.log('user :', user);


  const handleLoginLogout = () => {
    if (user?.isLoggedIn) {
      Logout();
      console.log("Usuario deslogueado");
    } else {
      Login({ name: "Edgar", isLoggedIn: true });
      console.log("Usuario logueado");
    }
  };

  const cargarProducts = async () => {
    try {
      const productRef = collection(db, "ProductosBlanqueria");
      for (const product of products) {
        await addDoc(productRef, product);
      }
      console.log("Productos cargados correctamente en firestore")

    } catch (error) {
      console.log("Error al cargar los productos:", error)
    }
  }

  const uploadProductos = async () => {
    try {
      const productRef = collection(db, "ProductosBlanqueria");
      const snapshot = await getDocs(productRef);


      snapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "ProductosBlanqueria", docSnap.id);
        await updateDoc(docRef, { stock: true });
      });

      console.log("Productos actualizados exitosamente en Firestore");
    } catch (error) {
      console.log("Error al actualizar los productos:", error);
    }
  };

  const uploadBatchProductos = async () => {
    try {
      const batch = writeBatch(db);
      const productRef = collection(db, "ProductosBlanqueria");
      const snapshot = await getDocs(productRef);

      snapshot.forEach((docSnap) => {
        const docRef = docSnap.ref;
        batch.update(docRef, { amigables: true });
      });

      await batch.commit();
      console.log("Productos actualizados exitosamente con batch");
    } catch (error) {
      console.log("Error al actualizar los productos con batch:", error);
    }
  };

  // ELIMINAR POR ID
  const [productId, setProductId] = useState(""); 
  const deleteProductById = async (id) => {
    try {
      const docRef = doc(db, "ProductosMichis", id); 
      await deleteDoc(docRef); 
      console.log(`Producto con ID ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // ELIMINAR TODOS CON BATCH
  const deleteAllProducts = async () => {
    try {
      const batch = writeBatch(db); 
      const productsRef = collection(db, "ProductosMichis");
      const snapshot = await getDocs(productsRef);

      snapshot.forEach((docSnap) => {
        batch.delete(docSnap.ref); 
      });

      await batch.commit(); 
      console.log("Todos los productos han sido eliminados con batch.");
    } catch (error) {
      console.error("Error al eliminar los productos con batch:", error);
    }
  };

// Obtener productos cuyo precio sea mayor a $500.
const getExpensiveProducts = async () => {
  try {
    const productsRef = collection(db, "ProductosMichis");
    const q = query(productsRef, where("price", ">", 500)); 
    const snapshot = await getDocs(q); 

    const expensiveProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Productos caros:", expensiveProducts);
  } catch (error) {
    console.error("Error al obtener productos caros:", error);
  }
};

//  Obtener productos con stock verdadero y amigables.
const getFilteredProducts = async () => {
  try {
    const productsRef = collection(db, "ProductosMichis");
    const q = query(
      productsRef,
      where("stock", "==", true),
      where("amigables", "==", true) 
    );
    const snapshot = await getDocs(q);

    const filteredProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Productos filtrados:", filteredProducts);
  } catch (error) {
    console.error("Error al obtener productos filtrados:", error);
  }
};

// obtener producto por ID
const getProductById = async (id) => {
  try {
    const docRef = doc(db, "ProductosMichis", id); 
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
      console.log("Producto encontrado:", docSnap.data());
    } else {
      console.log("No se encontró el producto con ese ID");
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
  }
};





  return (
    <>
      <header style={{ position: "relative" }}>
        <button
          onClick={handleLoginLogout}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 10px",
            fontSize: "1rem",
            cursor: "pointer",
            background: user?.isLoggedIn ? "red" : "green",
            border: "1px solid #000",
            borderRadius: "5px",
          }}
        >
          {user?.isLoggedIn ? "Logout" : "Login"}
        </button>

        <h1 className="nombre-sitio">
          Bienvenido a Blanqueria calixto
        </h1>

        {user?.isLoggedIn && (
          <>
            <p
              style={{
                textAlign: "center",
                bottom: "10px",
                right: "10px",
                color: "red",
              }}
            >
              Bienvenido {user?.name}
            </p>
            <div>

              {/*-------BOTON PARA CARGAR PRODUCTOS------ */}
              <button
                onClick={cargarProducts}
                style={{
                  ...buttonStyle,
                  marginLeft: "5px",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Cargar productos a Firestore
              </button>

              {/* ------ BOTON PARA ACTUALIZAR------- */}
              <button
                onClick={uploadProductos}
                style={{
                  ...buttonStyle,
                  marginLeft: "5px",
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Actualizar productos de Firestore
              </button>

              {/*---------BOTON PARA ACTUALIZAR BATCH------------ */}
              <button
                onClick={uploadBatchProductos}
                style={{
                  ...buttonStyle,
                  marginLeft: "5px",
                  backgroundColor: "yellow",
                  color: "black",
                }}
              >
                Actualizar productos con Batch Firestore
              </button>

              {/*----- Input y botón para eliminar producto ------*/}
              <div style={{ marginTop: "20px" }}>
                <input
                  type="text"
                  placeholder="Ingresa el ID del producto"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <button
                  onClick={() => deleteProductById(productId)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Eliminar producto por ID
                </button>
              </div>

              {/*------- DELETE CON BATCH ------------*/}
              <button
                onClick={deleteAllProducts}
                style={{
                  ...buttonStyle,
                  margin: "5px",
                  backgroundColor: "red",
                  color: "black",
                }}
              >
                Eliminar todos los productos con Batch
              </button>
               {/*--------- SENTENCIAS DE QUERY Y WHERE ----------*/}
   <button onClick={getExpensiveProducts} style={buttonStyle}>
                Productos Mayor $500
              </button>
              <button
                onClick={getFilteredProducts}
                style={{ ...buttonStyle, marginLeft: "5px" }}
              >
                Productos con stock y amigables
              </button>
              <input
                type="text"
                placeholder="Ingresa ID del producto"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              />
              <button
                onClick={() => getProductById(productId)}
                style={buttonStyle}
              >
                Buscar producto por ID
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
};