import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import ModalResult from "./ModalResult";
import DisciplineAfiliates from "../discipline/DisciplineAfiliates";
import DeleteComponent from "../DeleteComponent";
import EventsModal from "./EventsModal";
import EditResult from "./EditResult";

const TableResult = () => {
  const [result, setResult] = useState([]);
  const [flag, setFlag] = useState(false);

  const [resultSearch, setResultSearch] = useState("");
  const [originalresult, setOriginalresult] = useState([]); // Mantén una copia de respaldo de los eventos originales

  useEffect(() => {
    loadTable();
  }, [flag]);

  useEffect(() => {
    if (resultSearch) {
      searchEvents();
    } else {
      loadTable();
    }
  }, [resultSearch]);

  const searchEvents = () => {
    // Filtrar los eventos originales según el valor de búsqueda
    const filterresult = originalresult.filter((event) => {
      // Convertir el id del evento y el valor de búsqueda en cadenas
      const resultIdString = event.id.toString();
      const searchIdString = resultSearch.toString();

      // Verificar si el id del evento coincide con el valor de búsqueda en orden exacto
      if (resultIdString.length >= searchIdString.length) {
        for (let i = 0; i < searchIdString.length; i++) {
          if (resultIdString[i] !== searchIdString[i]) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    });

    // Actualizar el estado de los eventos filtrados
    setResult(filterresult);
  };

  const loadTable = () => {
    fetch("https://back-proyect-2-cincuenta.vercel.app/result/")
      .then((response) => response.json())
      .then((result) => {
        setResult(result.data);
        setOriginalresult(result.data); // Guarda una copia de los eventos originales
        setFlag(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const search = (
    <div style={{ display: "flex" }}>
      <InputText
        style={{ width: "100%" }}
        placeholder="Ingrese el ID a buscar"
        onKeyUp={(e) => {
          const value = e.target.value;
          const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
          if (regex.test(value)) {
            setResultSearch(value);
          }
        }}
      />
      <ModalResult setUpdate={setFlag} />
    </div>
  );

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Resultados</span>
    </div>
  );
  const footer = `En total hay ${
    result ? result.length : 0
  } resultados registradas.`;

  return (
    <Card title={search} style={{ margin: "15px" }}>
      <DataTable
        value={result}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
        sortField="id"
        sortOrder={1}
      >
        <Column field="id" header="ID"></Column>
        <Column field="puesto" header="Puesto"></Column>
        <Column
          header="Afiliados"
          body={(rowData) => <DisciplineAfiliates rowData={rowData} />}
        ></Column>
        <Column
          header="Eventos"
          body={(rowData) => <EventsModal rowData={rowData} />}
        ></Column>
        <Column
          header="Editar"
          body={(rowData) => (
            <EditResult
              rowData={rowData}
              setUpdate={setFlag}
            />
          )}
        ></Column>
        <Column
          header="Eliminar"
          body={(rowData) => (
            <DeleteComponent
              rowData={`https://back-proyect-2-cincuenta.vercel.app/result/${rowData.id}`}
              setFlag={setFlag}
            />
          )}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default TableResult;
