import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

const ModalDiscipline = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { name: 'Grupo', code: 'GR' },
    { name: 'Individual', code: 'IN' }
];

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
      />
        <Button
          label="Guardar"
          icon="pi pi-user-edit"
          severity="success"
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
            <InputNumber placeholder="ID" />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText  placeholder="name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-ticket"></i>
            </span>
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select Mode" className="w-full md:w-14rem" />
          </div>


        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default ModalDiscipline;
