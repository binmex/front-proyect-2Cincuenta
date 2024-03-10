import React, { useState , useEffect} from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalAffiliate = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [celphone, setCelphone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [disciplines, setDisciplines] = useState([]);
  const [prueba, setprueba] = useState("");

  const [flag,setFlag] = useState(false);
  
  const addAffiliate = () => {
    const MySwal = withReactContent(Swal);
    
    const newAffiliate = {
       id: id,
       name: name,
       celphone: celphone,
       email: email,
     
      discipline: { _id: selectedDiscipline }
   };
   
    fetch("http://localhost:4000/affiliate/", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newAffiliate),
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
           title: <p>{error.message}</p>, 
           icon: "error",
         });
       });
   };
  const fetchDisciplines = async () => {
    try {
      const response = await fetch("http://localhost:4000/discipline");
      if (!response.ok) {
        throw new Error("Failed to fetch disciplines");
      }
      const data = await response.json();
      setDisciplines(data.data);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  };

const openDialog = () => {
  setVisible(true);
  fetchDisciplines(); 
};

const closeDialog = () => {
  setVisible(false);
};
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Agregar Afiliado</span>
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
          onClick={() => addAffiliate()}
        />
    </div>
  );
  return (
    <div className="card flex justify-content-center">
      <Button
        label="nuevo afiliado"
        icon="pi pi-save"
        onClick={() =>  openDialog()}
      />
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => closeDialog()}
      >
        {/**Form */}
        

        <div className="card flex flex-column md:flex-row gap-3">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">ID</span>
            <InputNumber placeholder="ID" value={id} onChange={(e) => setId(e.value)} />
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
          <div className="p-inputgroup flex-1">
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
          </div>

         


        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default ModalAffiliate;
