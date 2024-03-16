import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import DisciplineAfiliates2 from "./DisciplineAfiliates2";
import ModalAffiliate from "./ModalAffiliate";
import EditAffiliate from "./EditAffiliate";
import DeleteAffiliate from "../DeleteComponent";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";





const TableAffiliate = () => {
  const [affiliate, setAffiliate] = useState([]);
  const [flag,setFlag] = useState(false);

  const [affiliateSearch, setAffiliateSearch] = useState("");
  const [originalaffiliate, setOriginalaffiliate] = useState([]);
  useEffect(()=>{
    loadTable();
  },[flag])


  useEffect(() => {
    if (affiliateSearch) {
      searchEvents();
    } else {
      loadTable();
    }
  }, [affiliateSearch]);
  const searchEvents = () => {
        // Filtrar los afiliados originales según el valor de búsqueda
        const filteredAffiliates = originalaffiliate.filter((affiliate) => {
          // Convertir el id del afiliado y el valor de búsqueda en cadenas
          const affiliateIdString = affiliate.id.toString();
          const searchIdString = affiliateSearch.toString();
    
          // Verificar si el id del afiliado coincide con el valor de búsqueda en orden exacto
          if (affiliateIdString.length >= searchIdString.length) {
            for (let i = 0; i < searchIdString.length; i++) {
              if (affiliateIdString[i] !== searchIdString[i]) {
                return false;
              }
            }
            return true;
          } else {
            return false;
          }
        });
    
        // Actualizar el estado de los afiliados filtrados
        setAffiliate(filteredAffiliates);
      };


  const loadTable = ()=>{
    fetch("http://localhost:4000/affiliate/")
    .then((response)=>response.json())
    .then(result=>{
      setAffiliate(result.data)
      setOriginalaffiliate(result.data)
        setFlag(false)})
        .catch(error=>{
            console.log(error);
          })
  }
  const search = (
    <div style={{ display: "flex" }}>
      <InputText
        style={{ width: "100%" }}
        placeholder="Ingrese el ID a buscar"
        onKeyUp={(e) => {
          const value = e.target.value;
          const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
          if (regex.test(value)) {
            setAffiliateSearch(value);
          }
        }}
      />
      <ModalAffiliate setFlag={setFlag} />
    </div>
  );
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">afiliados</span>
      {/* <ModalAffiliate setFlag={setFlag}/> */}
    </div>
  );
  const footer = `In total there are ${
    affiliate ? affiliate.length : 0
  } products.`;
  return (
    <Card title={search} style={{ margin: "15px" }}>
      <DataTable
        value={affiliate}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
        sortField="id"
        sortOrder={1}
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
            <EditAffiliate rowData={rowData} setFlag={setFlag} />
          )}
        ></Column>
        <Column
          header="Eliminar"
          body={(rowData) => (
            <DeleteAffiliate rowData={`http://localhost:4000/affiliate/${rowData._id}`} setFlag={setFlag} />
          )}
        ></Column> */}
      </DataTable>
      </Card>
  );
};

export default TableAffiliate;
