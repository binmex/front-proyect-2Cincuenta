import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const DisciplineAfiliates = ({rowData}) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();
  useEffect(()=>{
    setRow(rowData.affiliates)
  },[])
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Afiliados"
        icon="pi pi-users"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Afiliados"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <DataTable value={row} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="celphone" header="Celular"></Column>
            <Column field="email" header="Email"></Column>
          </DataTable>
        </div>
      </Dialog>
    </div>
  );
};

export default DisciplineAfiliates;
