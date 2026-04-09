import { db } from "../../db/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const finalizarYGuardarVoluntariado = async (datosSeleccion) => {
  try {
    const datosPersonales = JSON.parse(localStorage.getItem("datos_voluntario") || "{}");
    const actividadData = JSON.parse(localStorage.getItem("voluntariado_seleccion") || "{}");

    const folio = `VOL-${Math.floor(1000 + Math.random() * 9000)}`;

    // Formateamos la fecha para que sea legible en Firestore (ej: "9 de Abril de 2026")
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = datosSeleccion.date.toLocaleDateString('es-ES', opcionesFecha);

    const registroVoluntario = {
      voluntario: {
        nombre: datosPersonales.nombre || "Sin nombre",
        email: datosPersonales.email || "Sin email",
        telefono: datosPersonales.telefono || "Sin teléfono"
      },
      actividad: {
        id: actividadData.actividad_id,
        titulo: actividadData.titulo,
        categoria: actividadData.categoria
      },
      horario: {
        rango: datosSeleccion.time,
        turno: datosSeleccion.period,
        fecha_voluntariado: fechaFormateada // <-- NUEVO CAMPO
      },
      folio: folio,
      fecha_registro: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "voluntarios"), registroVoluntario);

    // Guardamos en local storage para la pantalla de confirmación
    localStorage.setItem("registro_voluntario_final", JSON.stringify({
      ...registroVoluntario,
      dbId: docRef.id
    }));

    return { success: true, folio };
  } catch (error) {
    console.error("Error al registrar voluntario:", error);
    return { success: false, error: error.message };
  }
};