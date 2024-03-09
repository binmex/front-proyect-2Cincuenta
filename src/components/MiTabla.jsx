import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ModalDiscipline from "./ModalDiscipline";


const MiTabla = () => {
  const [products, setProducts] = useState([]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Products</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );
  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;
  return (
    <div className="card">
      <DataTable
        value={products}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column
            header="Editar"
            body={(rowData) => (
              <ModalDiscipline rowData={rowData}/>
            )}
          ></Column>
      </DataTable>
    </div>
  );
};

export default MiTabla;
