import React, { useState } from "react";

export const Contacto = () => {
  const campos = [
    {
      id: "nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Coloca tu nombre",
    },
    { id: "asunto", label: "Asunto", type: "text", placeholder: "Tu Asunto" },
    { id: "email", label: "Email", type: "email", placeholder: "Tu Email" },
    { id: "tel", label: "Teléfono", type: "tel", placeholder: "Tu Teléfono" },
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    asunto: "",
    email: "",
    tel: "",
    mensaje: "",
    pais: "",
    tipo: "",
    categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <main className="contenido-principal contenedor">
      <h2 className="text-center">Contacto</h2>

      <form className="formulario" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Tus Datos</legend>
          {campos.map((campo) => (
            <div className="campo" key={campo.id}>
              <label htmlFor={campo.id}>{campo.label}: </label>
              <input
                id={campo.id}
                type={campo.type}
                placeholder={campo.placeholder}
                required={campo.id === "nombre"}
                name={campo.id}
                value={formData[campo.id]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="campo">
            <label htmlFor="mensaje">Mensaje: </label>
            <textarea
              name="mensaje"
              id="mensaje"
              rows="5"
              placeholder="Deja tu mensaje"
              value={formData.mensaje}
              onChange={handleChange}
            ></textarea>
          </div>
        </fieldset>

        <fieldset>
          <legend>País</legend>
          <div className="campo">
            <label htmlFor="pais">País</label>
            <select
              name="pais"
              id="pais"
              value={formData.pais}
              onChange={handleChange}
            >
              <option value="">--Seleccione--</option>
              <option value="Argentina">Argentina</option>
              <option value="Mexico">México</option>
              <option value="Peru">Perú</option>
              <option value="Colombia">Colombia</option>
              <option value="Chile">Chile</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Información Extra</legend>
          <div className="campo">
            <label htmlFor="cliente">Cliente</label>
            <input
              type="radio"
              id="cliente"
              name="tipo"
              value="cliente"
              checked={formData.tipo === "cliente"}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label htmlFor="proveedor">Proveedor</label>
            <input
              type="radio"
              id="proveedor"
              name="tipo"
              value="proveedor"
              checked={formData.tipo === "proveedor"}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoría de Interés</label>
            <input
              list="categorias"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
            <datalist id="categorias">
              <option value="Cocina" />
              <option value="Exterior" />
              <option value="Recámaras" />
              <option value="Oficinas" />
              <option value="Televisión" />
              <option value="Living" />
            </datalist>
          </div>
        </fieldset>

        <input className="btn" type="submit" value="Enviar Formulario" />
      </form>
    </main>
  );
};