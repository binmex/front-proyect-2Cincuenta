import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar"; // Importar el componente Calendar
import Swal from "sweetalert2";

const ModalEvent = ({ setUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null); // Estado para la fecha, inicializado como null

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Agregar Disciplina</span>
    </div>
  );

  const clean = () => {
    setId("");
    setName("");
    setDate(null);
  };

  const saveEvent = () => {
    // Datos del evento que deseas enviar
    const eventData = {
      id: id, // Asegúrate de tener las variables id, name y date definidas
      name: name,
      date: date,
    };

    // Configuración de la solicitud
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido del cuerpo de la solicitud
      },
      body: JSON.stringify(eventData), // Convierte el objeto eventData a formato JSON
    };

    // URL de la API
    const url = "http://localhost:4000/event"; // Reemplaza con la URL de tu API

    // Realizar la solicitud POST
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el evento"); // Lanza un error si la respuesta no es exitosa
        }
        return response.json();
      })
      .then((data) => {
        setVisible(false);
        if (data.state) {
          Swal.fire({
            title: "¡Evento agregado correctamente!",
            icon: "success",
          });
          setUpdate(true);
          clean();
        } else {
          console.log(data.error);
          Swal.fire({
            title: `Error al agregar el evento: ${data.error}`, // Muestra el error proporcionado por el servidor
            icon: "error",
          });
        }
      })
      .catch((error) => {
        setVisible(false);
        Swal.fire({
          title: `${error}`, // Muestra el mensaje de error de la excepción
          icon: "error",
        }).then(() => {
          setVisible(true);
        });
      });
  };

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="danger"
        onClick={() => {
          clean();
          setVisible(false);
        }}
      />
      <Button
        label="Guardar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={saveEvent}
      />
    </div>
  );

  return (
    <div
      className="card flex justify-content-center"
      style={{ paddingLeft: "5px" }}
    >
      <Button icon="pi pi-save" onClick={() => setVisible(true)} />
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => {
          clean();
          setVisible(false);
        }}
      >
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
      </Dialog>
    </div>
  );
};

export default ModalEvent;
