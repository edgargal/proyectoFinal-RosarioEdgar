import react from "react";
import NavBar from "./pages/NavBar";
import Productos from "./pages/productos";
import { Header } from "./pages/header";
import SobreNosotros from "./pages/SobreNosotros";
import { Contacto } from "./pages/contacto";
import Footer from "./pages/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "./context/UserContext";
import MainPage from "./pages/MainPage";

function App() {
  const {user} = useUser();
  console.log(`user:`, user)

  // const mensaje = "¡Bienvenido a nuestra tienda online!";
  return (
    <>
      <BrowserRouter>
      
        <NavBar />
        <Header/>

        <Routes>
           
          <Route path="/" element={<MainPage/>} />
          <Route path="/Productos" element={<Productos/>} />
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="*" element={<h1>Página no encontrada </h1>} />

        </Routes>

        <Footer/>

      </BrowserRouter>
    </>
  )
}

export default App

