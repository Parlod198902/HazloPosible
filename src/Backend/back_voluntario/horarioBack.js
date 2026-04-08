
import { db } from "../../db/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const finalizarYGuardarVoluntariado = async (horarioSeleccionado) => {
  try {
    const datosPersonales = JSON.parse(localStorage.getItem("datos_donante") || "{}");
    const actividadData = JSON.parse(localStorage.getItem("voluntariado_seleccion") || "{}");

    const folio = `VOL-${Math.floor(1000 + Math.random() * 9000)}`;

    const registroVoluntario = {
      voluntario: {
        nombre: datosPersonales.nombre,
        email: datosPersonales.email,
        telefono: datosPersonales.telefono
      },
      actividad: {
        id: actividadData.actividad_id,
        titulo: actividadData.titulo,
        categoria: actividadData.categoria
      },
      horario: {
        rango: horarioSeleccionado.time,
        turno: horarioSeleccionado.period
      },
      folio: folio,
      fecha_registro: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "voluntarios"), registroVoluntario);

    localStorage.setItem("registro_voluntario_final", JSON.stringify({
      ...registroVoluntario,
      dbId: docRef.id
    }));

    return { success: true, folio };
  } catch (error) {
    console.error("Error al registrar voluntario:", error);
    return { success: false, error };
  }
};