import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ModalEvent from "./ModalEvent";
import { Card } from "primereact/card";
import NavBar from "./NavBar";
import { InputText } from "primereact/inputtext";

const TableEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [searchEvent, setSearchEvent] = useState(false);
  const [originalEvents, setOriginalEvents] = useState([]); // Mantén una copia de respaldo de los eventos originales

  useEffect(() => {
    if (searchEvent) {
      searchEvents();
    } else {
      loadEvents();
    }
  }, [searchEvent]);

  const loadEvents = async () => {
    try {
      await fetch("http://localhost:4000/event")
        .then((response) => response.json())
        .then((resultado) => {
          resultado.data.forEach((event) => {
            event.date = new Date(parseInt(event.date)).toLocaleDateString();
          });
          setEvents(resultado.data);
          setOriginalEvents(resultado.data); // Guarda una copia de los eventos originales
        });
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const searchEvents = () => {
    // Filtrar los eventos originales según el valor de búsqueda
    const filteredEvents = originalEvents.filter((event) => {
      // Verificar si el nombre del evento incluye las letras de eventSearch
      return event.name.toLowerCase().includes(eventSearch.toLowerCase());
    });

    // Actualizar el estado de los eventos filtrados
    setEvents(filteredEvents);
  };

  const search = (
    <div style={{ display: "flex" }}>
      <InputText
        style={{ width: "100%" }}
        onChange={(e) => {
          const value = e.target.value;
          setEventSearch(value);
          setSearchEvent(value.trim() !== "");
        }}
      />
      <ModalEvent />
    </div>
  );

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between">
      <span className="text-xl text-900 font-bold">Eventos</span>
    </div>
  );

  const footer = `En total hay ${events ? events.length : 0} eventos.`;

  return (
    <div>
      <NavBar />
      <Card title={search} style={{ margin: "15px" }}>
        <DataTable
          value={events}
          header={header}
          footer={footer}
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column
            header="Editar"
            body={(rowData) => <ModalEvent rowData={rowData} />}
          ></Column>
        </DataTable>
      </Card>
    </div>
  );
};

export default TableEvents;
