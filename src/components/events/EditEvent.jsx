import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar"; // Importar el componente Calendar
import Swal from "sweetalert2";
import { useEffect } from "react";

const EditEvent = ({ rowData, setUpdate }) => {
  const [visible, setVisible] = useState(false);
  // Suponiendo que rowData.date es una cadena en formato "dd/mm/yyyy"
  const [date, setDate] = useState(() => {
    const parts = rowData.date.split("/"); // Divide la cadena en partes: día, mes y año
    // Asegúrate de que las partes estén en el orden correcto para el constructor de Date (año, mes - 1, día)
    const dateObject = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0])
    );
    return dateObject;
  });

  const [id, setId] = useState();
  const [name, setName] = useState();

  useEffect(()=>{
    setId(rowData.id)
    setName(rowData.name)
  },[rowData])

  const updateEvent = () => {
    const updateEvent = {
      name: name,
      date: date,
    };

    fetch(`https://back-proyect-2-cincuenta.vercel.app/event/${rowData._id}`, {
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
          Swal.fire({
            title: "¡Evento editado correctamente!",
            icon: "success",
          });
          setUpdate(true);
        } else {
          Swal.fire({
            title: `Error al editar el evento: ${
              data.error == undefined ? "Campos invalidos" : data.error
            }`, // Muestra el error proporcionado por el servidor
            icon: "error",
          }).then(() => {
            setVisible(true);
          });
        }
      })
      .catch((error) => {
        setVisible(false);
        Swal.fire({
          title: `Error al editar el evento: ${error}`, // Muestra el mensaje de error de la excepción
          icon: "error",
        }).then(() => {
          setVisible(true);
        });
      });
  };

  const reloadValues = () => {
    setId(rowData.id);
    setName(rowData.name);
    setDate(() => {
      const parts = rowData.date.split("/"); // Divide la cadena en partes: día, mes y año
      // Asegúrate de que las partes estén en el orden correcto para el constructor de Date (año, mes - 1, día)
      const dateObject = new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
      );
      return dateObject;
    });
    setVisible(false);
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Editar Evento</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="danger"
        onClick={() => reloadValues()}
      />
      <Button
        label="Aceptar"
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
        onHide={() => {
          reloadValues();
          setVisible(false);
        }}
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
