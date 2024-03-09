import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import ModalDiscipline from "./ModalDiscipline";

const TableEvents = () => {
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadEvents();
  }, [events]);

  const loadEvents = async () => {
    try {
      await fetch("http://localhost:4000/event")
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
          resultado.data.forEach((event) => {
            event.date = new Date(parseInt(event.date)).toLocaleDateString();
          });
          setEvents(respuesta.data);
        });
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between">
      <span className="text-xl text-900 font-bold">Eventos</span>
    </div>
  );

  const footer = `En total hay ${events ? events.length : 0} eventos.`;

  return (
    <div className="card">
      <DataTable
        value={events}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="date" header="Fecha"></Column>
        {/* <Column
        header="Resultados"
        body={(rowData) => (
          <ul>
            {rowData.results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      ></Column> */}
        {/* <Column
        header="Editar"
        body={(rowData) => <ModalDiscipline rowData={rowData} />}
      ></Column> */}
      </DataTable>
    </div>
  );
};

export default TableEvents;
