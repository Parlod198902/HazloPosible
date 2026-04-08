export const guardarDatos = (nombre_voluntario, telefono_voluntario, email_voluntario) => {
    const datosVoluntario = {
        nombre: nombre_voluntario,
        telefono: telefono_voluntario,
        email: email_voluntario,
        fecha_registro: new Date().toISOString
    };

    localStorage.setItem('datos_voluntario', JSON.stringify(datosVoluntario));
    return datosVoluntario
 };

export const obtenerDatos = () => {
  const data = localStorage.getItem('datos_voluntario');
  return data ? JSON.parse(data) : null;
};
