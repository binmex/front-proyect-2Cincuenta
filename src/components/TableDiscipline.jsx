import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ModalDiscipline from "./ModalDiscipline";
import DisciplineAfiliates from "./DisciplineAfiliates";
import EditDiscipline from "./EditDiscipline";


const TableDiscipline = () => {
  const [discipline, setDiscipline] = useState([]);

  useEffect(()=>{
    loadTable();
  },[discipline])

  const loadTable = ()=>{
    fetch("http://localhost:4000/discipline/")
    .then((response)=>response.json())
    .then(result=>setDiscipline(result.data))
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Products</span>
      <ModalDiscipline/>
    </div>
  );
  const footer = `In total there are ${
    discipline ? discipline.length : 0
  } products.`;
  return (
    <div className="card">
      <DataTable
        value={discipline}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="name" header="Nombre"></Column>
        <Column field="type" header="Categoria"></Column>
        <Column
            header="Afiliados"
            body={(rowData) => (
              <DisciplineAfiliates rowData={rowData}/>
            )}
          ></Column>
        <Column
            header="Editar"
            body={(rowData) => (
              <EditDiscipline rowData={rowData}/>
            )}
          ></Column>
      </DataTable>
    </div>
  );
};

export default TableDiscipline;
