import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditAffiliate = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
 
  const [id, setID] = useState(rowData.id);
  const [name, setName] = useState(rowData.name);

  const [celphone, setCelphone] = useState(rowData.celphone);
  const [email, setEmail] = useState(rowData.email);
  // const [selectedDiscipline, setSelectedDiscipline] = useState(rowData.discipline);
  // const [disciplines, setDisciplines] = useState([]);


  const updateAffiliate = () => {
    const MySwal = withReactContent(Swal);
    const updateAffiliate = {
      name: name,
      celphone:celphone,
      email:email,
    };

    fetch(`https://back-proyect-2-cincuenta.vercel.app/affiliate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAffiliate),
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
    setCelphone("");
    setEmail("");
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
        onClick={() => updateAffiliate()}
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
            <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
            <InputText placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">Teléfono</span>
            <InputText placeholder="Teléfono" value={celphone || ""} onChange={(e) => setCelphone(e.target.value)} />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon"><i className="pi pi-envelope"></i></span>
            <InputText placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/* <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">Disciplina</span>
            <Dropdown 
              value={selectedDiscipline} 
              onChange={(e) => setSelectedDiscipline(e.value)} 
              options={disciplines} 
              optionLabel="name" 
              optionValue="_id" 
              placeholder="Selecciona una disciplina" 
              className="w-full md:w-14rem" 
            />
          </div> */}

        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default EditAffiliate;
