import dwg2dxf from "dwg2dxf";
import React, { useState } from "react";

function FileConverter() {
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    // Verifica si el archivo es un DWG válido
    const allowedExtensions = ["dwg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      console.log("Archivo no válido. Se requiere un archivo DWG.");
      return;
    }

    try {
      const convertedData = await dwg2dxf(file);

      // Generar el nombre del archivo DXF convertido
      const convertedFileName = file.name.replace(/\.dwg$/i, ".dxf");

      // Crear un objeto de URL para descargar el archivo
      const fileURL = URL.createObjectURL(convertedData);

      // Crear un enlace para descargar el archivo
      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.download = convertedFileName;

      // Simular un clic en el enlace para iniciar la descarga
      downloadLink.click();
    } catch (error) {
      console.error("Error al convertir el archivo:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {convertedFile && (
        <a href={convertedFile} download>
          Descargar DXF convertido
        </a>
      )}
    </div>
  );
}

export default FileConverter;
