import { useState, useEffect } from "react";
import "./confirmacionVoluntario.css";
import emailjs from '@emailjs/browser';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../db/config';

export default function ApoyoVoluntario({ onVolver }) {
  const [enviando, setEnviando] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  
  // Estado para la interfaz con el nuevo campo 'fecha'
  const [datosUI, setDatosUI] = useState({
    seleccion: "Cargando...",
    tipo: "Cargando...",
    fecha: "Cargando...", // <-- Nuevo campo
    horario: "Cargando...",
    folio: "Cargando..."
  });

  useEffect(() => {
    const registroLocal = JSON.parse(localStorage.getItem("registro_voluntario_final") || "{}");
    if (registroLocal.folio) {
      setDatosUI({
        seleccion: registroLocal.actividad?.categoria || "",
        tipo: registroLocal.actividad?.titulo || "",
        fecha: registroLocal.horario?.fecha_voluntariado || "", // <-- Extraído del back actualizado
        horario: registroLocal.horario?.rango || "",
        folio: registroLocal.folio || ""
      });
    }
  }, []);

  const handleEnviar = async () => {
    setEnviando(true);
    setErrorEnvio('');

    try {
      const registroLocal = JSON.parse(localStorage.getItem("registro_voluntario_final") || "{}");
      const folioLocalStorage = registroLocal.folio;
      
      if (!folioLocalStorage) throw new Error("No se encontró el folio del voluntario.");

      const q = query(collection(db, "voluntarios"), where("folio", "==", folioLocalStorage));
      const snap = await getDocs(q);
      
      if (snap.empty) throw new Error("No se encontró el registro en la base de datos.");

      const datos = snap.docs[0].data();

      // Enviar correo incluyendo la fecha en el template
      await emailjs.send(
        'service_g3asyi4',
        'template_funxd4i',
        {
          folio:             datos.folio,
          categoria:         datos.actividad.categoria,
          actividad_titulo:  datos.actividad.titulo,
          fecha:             datos.horario.fecha_voluntariado, // <-- Agregado para el correo
          horario:           datos.horario.rango,
          turno:             datos.horario.turno,
          nombre_voluntario: datos.voluntario.nombre,
          email_destino:     datos.voluntario.email 
        },
        'q3W4Oa-hNhBMNuz9q'
      );

      setCorreoEnviado(true);
    } catch (error) {
      console.error(error);
      setErrorEnvio(error.message || "Error al enviar la credencial por correo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="av-wrapper">
      <div className="av-check">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </div>

      <h1 className="av-title">¡Gracias por tu apoyo!</h1>
      <p className="av-subtitle">Tu pre-registro ha sido completado exitosamente</p>

      <div className="av-card">
        <div className="av-card__row">
          <span className="av-card__key">Selección</span>
          <span className="av-card__val">{datosUI.seleccion}</span>
        </div>
        <div className="av-card__divider" />
        
        <div className="av-card__row">
          <span className="av-card__key">Tipo</span>
          <span className="av-card__val">{datosUI.tipo}</span>
        </div>
        <div className="av-card__divider" />

        {/* --- NUEVA FILA DE FECHA --- */}
        <div className="av-card__row">
          <span className="av-card__key">Fecha</span>
          <span className="av-card__val">{datosUI.fecha}</span>
        </div>
        <div className="av-card__divider" />
        {/* --------------------------- */}

        <div className="av-card__row">
          <span className="av-card__key">Horario</span>
          <span className="av-card__val">{datosUI.horario}</span>
        </div>
        <div className="av-card__divider" />
        
        <div className="av-card__row">
          <span className="av-card__key">Folio registro</span>
          <span className="av-card__val">{datosUI.folio}</span>
        </div>
      </div>

      {errorEnvio && (
        <p style={{ color: "red", fontSize: "13px", marginBottom: "8px", textAlign: "center" }}>
          ⚠ {errorEnvio}
        </p>
      )}
      {correoEnviado && (
        <p style={{ color: "green", fontSize: "13px", marginBottom: "8px", textAlign: "center" }}>
          ✓ Credencial enviada correctamente
        </p>
      )}

      <button 
        className="av-btn av-btn--primary" 
        onClick={handleEnviar}
        disabled={enviando || correoEnviado}
      >
        {enviando ? "Enviando..." : correoEnviado ? "Credencial enviada ✓" : "Enviar credencial por correo"}
      </button>

      <button className="av-btn av-btn--secondary" onClick={onVolver}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
        </svg>
        Volver al inicio
      </button>
    </div>
  );
}