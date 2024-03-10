import React from "react";
import { Button } from "primereact/button";
//sweetAlet
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DeleteDiscipline = ({ rowData, setFlag }) => {
  const dropDiscipline = () => {
    const MySwal = withReactContent(Swal);
    fetch(`http://localhost:4000/discipline/${rowData}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          MySwal.fire({
            title: <p>Error al eliminar los datos</p>,
            icon: "error",
          });
        }
        MySwal.fire({
          title: <p>Eliminado</p>,
          icon: "success",
        });
      })
      .catch((error) => console.error("Error:", error));

    setFlag(true);
  };

  return (
    <>
      <Button
        label="Eliminar"
        icon="pi pi-eraser"
        severity="danger"
        onClick={() => dropDiscipline()}
      />
    </>
  );
};

export default DeleteDiscipline;
