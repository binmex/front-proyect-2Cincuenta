import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Swal from "sweetalert2";

const EditResult = ({ rowData, setUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [postion, setPostion] = useState("");

  useEffect(() => {
    loadResults();
  }, [rowData]);

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Editar Resultado</span>
    </div>
  );

  const loadResults = () => {
    setId(rowData.id);
    setPostion(rowData.puesto);
  };

  const clean = () => {
    setId(rowData.id);
    setPostion(rowData.puesto);
  };

  const editResult = () => {
    // Datos del evento que deseas enviar
    const resultData = {
      id: id,
      puesto: postion,
    };
    // Configuración de la solicitud
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido del cuerpo de la solicitud
      },
      body: JSON.stringify(resultData), // Convierte el objeto resultData a formato JSON
    };

    // URL de la API
    const url = `https://back-proyect-2-cincuenta.vercel.app/result/${id}`;

    // Realizar la solicitud POST
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al editar el evento"); // Lanza un error si la respuesta no es exitosa
        }
        return response.json();
      })
      .then((data) => {
        setVisible(false);
        if (data.state) {
          Swal.fire({
            title: "¡Resultado editado correctamente!",
            icon: "success",
          });
          setUpdate(true);
        } else {
          Swal.fire({
            title: `Error al editar el resultado: ${
              data.error == undefined ? "Campos invalidos" : data.error
            }`,
            icon: "error",
          }).then(() => {
            setVisible(true);
          });
        }
      })
      .catch((error) => {
        setVisible(false);
        Swal.fire({
          title: `Error al editar el resultado: ${error}`, // Muestra el mensaje de error de la excepción
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
        label="Editar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={editResult}
      />
    </div>
  );

  return (
    <div
      className="card flex justify-content-center"
      style={{ paddingLeft: "5px" }}
    >
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
        </div>
      </Dialog>
    </div>
  );
};

export default EditResult;
