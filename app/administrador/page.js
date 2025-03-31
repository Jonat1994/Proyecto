"use client"

import React, {useState} from "react";
import styles from "./tabla.css"
import AdminMenu from "./menuAdmin/adminMenu";
import GestionUser from "./gestionUsuarios/gestionUsuarios";
import Prueba from "./prueba/prueba";


export default function Home(){

    const [activeModule, setActiveModule] = useState("projects");

    // Función para cambiar el módulo según el menú seleccionado
    const handleMenuClick = (module) => {
        if (typeof module !== "string") {
            console.error("El parámetro del menú no es válido:", module);
            return;
          }
          setActiveModule(module);
    };
  
    return (
      <div>
        {/* Pasa la función para manejar el clic en el menú como prop */}
        <AdminMenu handleMenuClick={handleMenuClick} />
  
        {/* Renderiza el módulo basado en el estado */}
        <main>
          {activeModule === "projects" && <GestionUser />}
          {activeModule === "team" && <Prueba />}
          {activeModule === "about" && <AboutModule />}
          {activeModule === "contact" && <ContactModule />}
        </main>
      </div>
    );
}
