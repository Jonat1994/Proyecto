"use client";

import React, {useState} from "react";
import Colaborar from "./colaborar/page";
import Tareas from "./tareas/page";
import Proyectos from "./proyectos/page";
import MiembroMenu from "./menuMiembro/page";
 

export default function Miembros (){
    const [activeModule, setActiveModule] = useState("proyectos");

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
        <MiembroMenu handleMenuClick={handleMenuClick} />
  
        {/* Renderiza el módulo basado en el estado */}
        <main>
          {activeModule === "proyectos" && <Proyectos />}
          {activeModule === "tareas" && <Tareas />}
          {activeModule === "colaborar" && <Colaborar />}
        </main>
      </div>
    );
}