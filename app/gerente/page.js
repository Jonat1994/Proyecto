// src/app/gerente/page.js
"use client";

import React, { useState } from "react";
import GerenteMenu from "./menuGerente/Menu";
import GestionProyectos from "./gestionProyectos/page";
import GestionTareas from "./gestionTareas/page"; 

export default function Home() {
    const [activeModule, setActiveModule] = useState("proyectos");

    const handleMenuClick = (module) => {
        if (typeof module !== "string") {
            console.error("El parámetro del menú no es válido:", module);
            return;
        }
        setActiveModule(module);
    };

    return (
        <div>
            <GerenteMenu handleMenuClick={handleMenuClick} />

            <main>
                {activeModule === "proyectos" && <GestionProyectos />}
                {activeModule === "tareas" && <GestionTareas />}
                {activeModule === "actus" && <h2>Modulo de Actualizaciones</h2>}
                {activeModule === "contacto" && <h2>Modulo de Contacto</h2>}
            </main>
        </div>
    );
}
