export const guardarDatos = (nombre_donante, telefono_donante, email_donante) => {
    const datosDonante = {
        nombre: nombre_donante,
        telefono: telefono_donante,
        email: email_donante,
        fecha_registro: new Date().toISOString
    };

    localStorage.setItem('datos_donante', JSON.stringify(datosDonante));
    return datosDonante
 };

export const obtenerDatosDonanteLocal = () => {
  const data = localStorage.getItem('datos_donante');
  return data ? JSON.parse(data) : null;
};
