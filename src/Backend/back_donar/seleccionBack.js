export const guardarSeleccion = (selectedEntries, totalAmount) => {
  const totalArticulos = selectedEntries.reduce((sum, item) => sum + item.quantity, 0);

  const resumenDonacion = {
    cantidadArticulos: totalArticulos, 
    totalMonto: totalAmount,          
    fecha: new Date().toISOString()
  };
  
  localStorage.setItem("carrito_donacion", JSON.stringify(resumenDonacion));
  return resumenDonacion;
};

export const obtenerSeleccionLocal = () => {
  const data = localStorage.getItem("carrito_donacion");
  return data ? JSON.parse(data) : null;
};