import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar"; // Importar el componente Calendar
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditEvent = ({ rowData, setUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(rowData.date);
  const [id, setId] = useState(rowData.id);
  const [name, setName] = useState(rowData.name);

  const updateEvent = () => {
    const MySwal = withReactContent(Swal);
    const updateEvent = {
      name: name,
      date: date,
    };

    fetch(`http://localhost:4000/event/${rowData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setVisible(false);
        if (data.state) {
          MySwal.fire({
            title: "¡Evento editado correctamente!",
            icon: "success",
          });
          setUpdate(true);
        } else {
          MySwal.fire({
            title: `Error al editar el evento: ${data.error}`, // Muestra el error proporcionado por el servidor
            icon: "error",
          });
        }
      })
      .catch((error) => {
        setVisible(false);
        MySwal.fire({
          title: `Error al editar el evento: ${error}`, // Muestra el mensaje de error de la excepción
          icon: "error",
        });
      });
  };

  const cleanFields = () => {
    setName("");
    setDate(null);
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Editar Evento</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="limpiar"
        icon="pi pi-eraser"
        severity="warning"
        onClick={() => cleanFields()}
      />
      <Button
        label="aceptar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={() => updateEvent()}
      />
    </div>
  );
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Editar"
        icon="pi pi-pencil"
        severity="warning"
        onClick={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
      >
        {/**Form */}
        <div className="card flex flex-column md:flex-row gap-3">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">ID</span>
            <InputText
              placeholder="ID"
              value={id} // Asegúrate de enlazar el valor del input con el estado
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
                if (regex.test(value)) {
                  setId(value); // Actualiza el estado solo si la entrada es un número
                }
              }}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Agregar input para la fecha */}
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar"></i>
            </span>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              placeholder="Fecha"
              showIcon
            />
          </div>
        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default EditEvent;
