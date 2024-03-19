import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
//sweetAlet
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditDiscipline = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [id, setID] = useState("");
  const [name, setName] = useState("");

  const tipies = [
    { name: "Grupal", code: "GR" },
    { name: "Individual", code: "IN" },
  ];

  useEffect(()=>{
    setID(rowData.id)
    setName(rowData.name)
    setSelectedType(rowData.type)
  },[rowData])

  const updateDiscipline = () => {
    const MySwal = withReactContent(Swal);
    const updateDiscipline = {
      name: name,
      type: selectedType.name,
    };

    fetch(`https://back-proyect-2-cincuenta.vercel.app/discipline/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDiscipline),
    })
      .then((response) => response.json())
      .then((data) => {
        setVisible(false);

        if (data.state) {
          MySwal.fire({
            title: <p>Editado</p>,
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
        label="aceptar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={() => updateDiscipline()}
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
            <InputNumber placeholder="ID" value={id} disabled />
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

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-ticket"></i>
            </span>
            <Dropdown
              value={selectedType}
              onChange={(e) => setSelectedType(e.value)}
              options={tipies}
              optionLabel="name"
              placeholder={selectedType}
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default EditDiscipline;
