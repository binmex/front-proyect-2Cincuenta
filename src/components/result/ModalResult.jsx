import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Swal from "sweetalert2";

const ModalResult = ({ setUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [postion, setPostion] = useState("");
  const [affiliates, setAffiliates] = useState([]); // Estado para la fecha, inicializado como null
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [events, setEvents] = useState([]); // Estado para la fecha, inicializado como null
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dropdownOptionsAffiliates = affiliates.map((affiliate) => ({
    label: affiliate.name,
    value: affiliate._id,
  }));

  const dropdownOptionsEvents = events.map((event) => ({
    label: event.name,
    value: event._id,
  }));

  useEffect(() => {
    loadEvents();
    loadAfiliates();
  }, []);

  const loadEvents = async () => {
    try {
      await fetch("https://back-proyect-2-cincuenta.vercel.app/event/")
        .then((response) => response.json())
        .then((resultado) => {
          const formattedEvents = resultado.data.map((event) => {
            return {
              ...event,
              date: new Date(event.date).toLocaleDateString(),
            };
          });
          setEvents(formattedEvents);
        });
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const loadAfiliates = () => {
    fetch("https://back-proyect-2-cincuenta.vercel.app/affiliate/")
      .then((response) => response.json())
      .then((result) => {
        setAffiliates(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Agregar Resultado</span>
    </div>
  );

  const clean = () => {
    setId("");
    setPostion("");
    setSelectedAffiliate(null);
    setSelectedEvent(null);
  };

  const saveResult = () => {
    // Datos del evento que deseas enviar
    const resultData = {
      id: id, // Asegúrate de tener las variables id, postion y affiliates definidas
      puesto: postion,
      affiliates: { _id: selectedAffiliate },
      events: { _id: selectedEvent },
    };
    // Configuración de la solicitud
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido del cuerpo de la solicitud
      },
      body: JSON.stringify(resultData), // Convierte el objeto resultData a formato JSON
    };

    // URL de la API
    const url = "https://back-proyect-2-cincuenta.vercel.app/result/";

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
            title: "¡Resultado agregado correctamente!",
            icon: "success",
          });
          setUpdate(true);
          clean();
        } else {
          Swal.fire({
            title: `Error al agregar el resultado: ${data.error}`, // Muestra el error proporcionado por el servidor
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
        onClick={saveResult}
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
              value={id}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
                if (regex.test(value)) {
                  setId(value);
                }
              }}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-chart-bar"></i>
            </span>
            <InputText
              placeholder="Posición"
              value={postion}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
                if (regex.test(value)) {
                  setPostion(value); // Actualiza el estado solo si la entrada es un número
                }
              }}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Dropdown
              value={selectedAffiliate}
              options={dropdownOptionsAffiliates}
              onChange={(e) => setSelectedAffiliate(e.value)}
              placeholder="Selecciona un afiliado"
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar"></i>
            </span>
            <Dropdown
              value={selectedEvent}
              options={dropdownOptionsEvents}
              onChange={(e) => setSelectedEvent(e.value)}
              placeholder="Selecciona un evento"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ModalResult;
