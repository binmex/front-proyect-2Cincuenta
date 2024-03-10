import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ModalEvent from "./ModalEvent";
import { Card } from "primereact/card";
import NavBar from "../NavBar";
import { InputText } from "primereact/inputtext";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import EventsResults from "./EventsResults";

const TableEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [originalEvents, setOriginalEvents] = useState([]); // Mantén una copia de respaldo de los eventos originales
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (update) {
      if (eventSearch) {
        searchEvents();
      } else {
        loadEvents();
      }
      setUpdate(false); // Desactivar la actualización después de ejecutar una vez
    }
  }, [eventSearch, update]);

  const loadEvents = async () => {
    try {
      await fetch("http://localhost:4000/event")
        .then((response) => response.json())
        .then((resultado) => {
          const formattedEvents = resultado.data.map((event) => {
            return {
              ...event,
              date: new Date(event.date).toLocaleDateString(),
            };
          });
          setEvents(formattedEvents);
          setOriginalEvents(formattedEvents); // Guarda una copia de los eventos originales
        });
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const searchEvents = () => {
    // Filtrar los eventos originales según el valor de búsqueda
    const filteredEvents = originalEvents.filter((event) => {
      // Convertir el id del evento y el valor de búsqueda en cadenas
      const eventIdString = event.id.toString();
      const searchIdString = eventSearch.toString();

      // Verificar si el id del evento coincide con el valor de búsqueda en orden exacto
      if (eventIdString.length >= searchIdString.length) {
        for (let i = 0; i < searchIdString.length; i++) {
          if (eventIdString[i] !== searchIdString[i]) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    });

    // Actualizar el estado de los eventos filtrados
    setEvents(filteredEvents);
  };

  const search = (
    <div style={{ display: "flex" }}>
      <InputText
        style={{ width: "100%" }}
        placeholder="Ingrese números para comenzar a buscar por ID..."
        onKeyUp={(e) => {
          const value = e.target.value;
          const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
          if (regex.test(value)) {
            setEventSearch(value);
            setUpdate(true);
          }
        }}
      />
      <ModalEvent setUpdate={setUpdate} />
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
          sortField="id"
          sortOrder={1}
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column
            header="Resultados"
            body={(rowData) => <EventsResults rowData={rowData} />}
          ></Column>
          <Column
            header="Editar"
            body={(rowData) => (
              <EditEvent rowData={rowData} setUpdate={setUpdate} />
            )}
          ></Column>
          <Column
            header="Eliminar"
            body={(rowData) => (
              <DeleteEvent rowData={rowData} setUpdate={setUpdate} />
            )}
          ></Column>
        </DataTable>
      </Card>
    </div>
  );
};

export default TableEvents;
