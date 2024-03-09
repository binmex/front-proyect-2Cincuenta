import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ModalDiscipline from "./ModalDiscipline";
import DisciplineAfiliates from "./DisciplineAfiliates";
import EditDiscipline from "./EditDiscipline";
import DeleteDiscipline from "./DeleteDiscipline";


const TableDiscipline = () => {
  const [discipline, setDiscipline] = useState([]);
  const [flag,setFlag] = useState(false);

  useEffect(()=>{
    loadTable();
  },[flag])

  const loadTable = ()=>{
    fetch("http://localhost:4000/discipline/")
    .then((response)=>response.json())
    .then(result=>{
      setDiscipline(result.data)
      setFlag(false)
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Products</span>
      <ModalDiscipline setFlag={setFlag}/>
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
        <Column field="id" header="ID"></Column>
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
              <EditDiscipline rowData={rowData} setFlag={setFlag}/>
            )}
          ></Column>
        <Column
            header="Eliminar"
            body={(rowData) => (
              <DeleteDiscipline rowData={rowData._id} setFlag={setFlag}/>
            )}
          ></Column>
      </DataTable>
    </div>
  );
};

export default TableDiscipline;
