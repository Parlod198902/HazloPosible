
import { db } from "../db/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const finalizarYGuardarDonacion = async (metodoSeleccionado) => {
  try {
    const seleccionData = JSON.parse(localStorage.getItem("carrito_donacion") || "{}");
    const donanteData = JSON.parse(localStorage.getItem("datos_donante") || "{}");

    const folio = `RM-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Estructuramos el paquete completo para Firebase
    const donacionFinal = {
      donante: donanteData,
      donacion: {
        articulos: seleccionData.cantidadArticulos,
        total: seleccionData.totalMonto,
      },
      metodo_pago: metodoSeleccionado,
      folio: folio,
      fecha_servidor: serverTimestamp(), // Hora oficial de Google
    };

    // 4. Guardamos en la colección 'donaciones'
    const docRef = await addDoc(collection(db, "donaciones"), donacionFinal);

    // 5. Guardamos el folio y el ID en LocalStorage para que el PDF lo pueda leer
    localStorage.setItem("ticket_final", JSON.stringify({
      folio: folio,
      dbId: docRef.id,
      ...donacionFinal
    }));

    return { success: true, folio };
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    return { success: false, error };
  }
};