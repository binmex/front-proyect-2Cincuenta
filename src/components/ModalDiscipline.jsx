import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
//sweetAlet
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalDiscipline = ({ setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [id, setId] = useState();
  const [name, setName] = useState("");

  const type = [
    { name: "Grupal", code: "GR" },
    { name: "Individual", code: "IN" },
  ];

  const addDiscipline = () => {
    const MySwal = withReactContent(Swal);
    const newDiscipline = {
      id: id,
      name: name,
      type: selectedType.name,
    };

    fetch("http://localhost:4000/discipline/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiscipline),
    })
      .then((response) => response.json())
      .then((data) => {
        setVisible(false);
        if (data.state) {
          MySwal.fire({
            title: <p>Agregado</p>,
            icon: "success",
          });
        } else {
          MySwal.fire({
            title: <p>{data.error}</p>,
            icon: "error",
          });
        }
        setFlag(true);
      })
      .catch((error) => {
        setVisible(false);
        MySwal.fire({
          title: <p>{error}</p>,
          icon: "error",
        });
      });
  };

  const cleanFields = () => {
    setId();
    setName("");
    setSelectedType(null);
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Agregar Disciplina</span>
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
        label="Guardar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={() => addDiscipline()}
      />
    </div>
  );
  return (
    <div className="card flex justify-content-center">
      <Button
        label="nueva disciplina"
        icon="pi pi-save"
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
            <InputNumber value={id} placeholder="ID" onChange={(e) => setId(e.value)} />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
            value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-ticket"></i>
            </span>
            <Dropdown
              value={selectedType}
              onChange={(e) => setSelectedType(e.value)}
              options={type}
              optionLabel="name"
              placeholder="Select Mode"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default ModalDiscipline;
