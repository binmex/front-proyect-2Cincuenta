import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const EventsResults = ({ rowData }) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();

  useEffect(() => {
    setRow(rowData.result);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Button
        label="Resultados"
        icon="pi pi-bookmark"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Resultados"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <DataTable value={row} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="puesto" header="Puesto"></Column>
          </DataTable>
        </div>
      </Dialog>
    </div>
  );
};

export default EventsResults;
