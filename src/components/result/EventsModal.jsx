import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const EventsModal = ({rowData}) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();
  useEffect(() => {
    setRow(rowData.events);
  }, []);
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Eventos"
        icon="pi pi-calendar "
        severity="secondary"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Eventos"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <DataTable value={row} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="date" header="Fecha"></Column>
          </DataTable>
        </div>
      </Dialog>
    </div>
  );
};

export default EventsModal;
