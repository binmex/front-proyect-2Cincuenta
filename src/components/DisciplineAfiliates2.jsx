import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const DisciplineAfiliates2 = ({rowData}) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();
  useEffect(()=>{
    setRow(rowData.discipline)
  },[])
  return (
    <div className="card flex justify-content-center">
      <Button
        label="disciplinas"
        icon="pi pi-users"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="disciplinas"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <div>ID: {rowData.discipline.id}</div>
          <div>Nombre: {rowData.discipline.name}</div>
          <div>Tipo: {rowData.discipline.type}</div>
        </div>
      </Dialog>
    </div>
  );
};

export default DisciplineAfiliates2;
