import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DisciplineAfiliates from "./DisciplineAfiliates";
import EditDiscipline from "./EditDiscipline";
import DeleteDiscipline from "./DeleteDiscipline";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import ModalDiscipline from "./ModalDiscipline";

const TableDiscipline = () => {
  const [discipline, setDiscipline] = useState([]);
  const [flag, setFlag] = useState(false);

  const [disciplineSearch, setDisciplineSearch] = useState("");
  const [originalDiscipline, setOriginalDiscipline] = useState([]); // Mantén una copia de respaldo de los eventos originales

  useEffect(() => {
    loadTable();
  }, [flag]);

  useEffect(() => {
    if (disciplineSearch) {
      searchEvents();
    } else {
      loadTable();
    }
  }, [disciplineSearch]);

  const searchEvents = () => {
    // Filtrar los eventos originales según el valor de búsqueda
    const filterDiscipline = originalDiscipline.filter((event) => {
      // Convertir el id del evento y el valor de búsqueda en cadenas
      const disciplineIdString = event.id.toString();
      const searchIdString = disciplineSearch.toString();

      // Verificar si el id del evento coincide con el valor de búsqueda en orden exacto
      if (disciplineIdString.length >= searchIdString.length) {
        for (let i = 0; i < searchIdString.length; i++) {
          if (disciplineIdString[i] !== searchIdString[i]) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    });

    // Actualizar el estado de los eventos filtrados
    setDiscipline(filterDiscipline);
  };

  const loadTable = () => {
    fetch("http://localhost:4000/discipline/")
      .then((response) => response.json())
      .then((result) => {
        setDiscipline(result.data);
        setOriginalDiscipline(result.data); // Guarda una copia de los eventos originales
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
            setDisciplineSearch(value);
          }
        }}
      />
      <ModalDiscipline setFlag={setFlag}/>
    </div>
  );

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Products</span>
    </div>
  );
  const footer = `In total there are ${
    discipline ? discipline.length : 0
  } products.`;

  return (
    <Card title={search} style={{ margin: "15px" }}>
      <DataTable
        value={discipline}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="type" header="Categoria"></Column>
        <Column
          header="Afiliados"
          body={(rowData) => <DisciplineAfiliates rowData={rowData} />}
        ></Column>
        <Column
          header="Editar"
          body={(rowData) => (
            <EditDiscipline rowData={rowData} setFlag={setFlag} />
          )}
        ></Column>
        <Column
          header="Eliminar"
          body={(rowData) => (
            <DeleteDiscipline rowData={rowData._id} setFlag={setFlag} />
          )}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default TableDiscipline;
