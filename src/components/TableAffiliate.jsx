import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ModalAffiliate from "./ModalAffiliate";
import DisciplineAfiliates2 from "./DisciplineAfiliates2";
import EditAffiliate from "./EditAffiliate";
// import Discipline from "../pages/Discipline";
// import Affiliate from "../pages/Affiliate";



const TableAffiliate = () => {
  const [affiliate, setAffiliate] = useState([]);
  const [flag,setFlag] = useState(false);
  useEffect(()=>{
    loadTable();
  },[flag])

  const loadTable = ()=>{
    fetch("http://localhost:4000/affiliate/")
    .then((response)=>response.json())
    .then(result=>{setAffiliate(result.data)
        setFlag(false)})
        .catch(error=>{
            console.log(error);
          })
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">afiliados</span>
      <ModalAffiliate setFlag={setFlag}/>
    </div>
  );
  const footer = `In total there are ${
    affiliate ? affiliate.length : 0
  } products.`;
  return (
    <div className="card">
      <DataTable
        value={affiliate}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="celphone" header="telefono"></Column>
        <Column field="email" header="gmail"></Column>

        <Column
            header="disciplinas"
            body={(rowData) => (
              <DisciplineAfiliates2 rowData={rowData}/>
            // <DisciplineAfiliates2 key={rowData.id} rowData={rowData}/>
            )}
          ></Column>

        {/* <Column
            header="Editar"
            body={(rowData) => (
              <EditAffiliate rowData={rowData}  setFlag={setFlag}/>
            )}
          ></Column> */}
      </DataTable>
    </div>
  );
};

export default TableAffiliate;
