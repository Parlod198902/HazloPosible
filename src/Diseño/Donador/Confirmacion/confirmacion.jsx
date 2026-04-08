import { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import './confirmacion.css';
import emailjs from '@emailjs/browser';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../db/config';

export default function Confirmacion() {
  const navigate = useNavigate();
  
  // Estados para el correo
  const [enviando, setEnviando] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');

  // 2. Estado para los datos reales de FIREBASE
  const [datosTicket, setDatosTicket] = useState(null);

  // 3. Efecto para cargar los datos de Firebase al entrar a la pantalla
  useEffect(() => {
    const cargarDatosDesdeFirebase = async () => {
      try {
        const ticketLocal = JSON.parse(localStorage.getItem('ticket_final') || '{}');
        const folioBusqueda = ticketLocal.folio;

        if (!folioBusqueda) return;

        const q = query(collection(db, "donaciones"), where("folio", "==", folioBusqueda));
        const snap = await getDocs(q);

        if (!snap.empty) {
          // Guardamos los datos reales de Firebase en nuestro estado
          setDatosTicket(snap.docs[0].data());
        }
      } catch (err) {
        console.error("Error cargando datos de ticket:", err);
      }
    };

    cargarDatosDesdeFirebase();
  }, []);

  const enviarCorreo = async () => {
    // Usamos los datosTicket que ya bajamos de Firebase
    if (!datosTicket) return;

    setEnviando(true);
    setErrorEnvio('');
    try {
      await emailjs.send(
        'service_g3asyi4',
        'template_1cfhqei',
        {
          folio:          datosTicket.folio,
          total:          datosTicket.donacion.total,
          articulos:      datosTicket.donacion.articulos,
          metodo_pago:    datosTicket.metodo_pago,
          nombre_donante: datosTicket.donante.nombre,
          email_destino:  datosTicket.donante.email,
        },
        'q3W4Oa-hNhBMNuz9q'
      );
      setCorreoEnviado(true);
    } catch (error) {
      console.error(error);
      setErrorEnvio("Error al enviar el correo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="cf-wrap">
      <div className="cf-card">
        <div className="cf-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
        </div>

        <h1 className="cf-title">¡Gracias por tu apoyo!</h1>
        <p className="cf-subtitle">Ahora eres parte de la fundación Ronald McDonald</p>

        {/* 4. ACTUALIZACIÓN DEL HTML CON DATOS DE FIREBASE */}
        <div className="cf-summary">
          <div className="cf-row">
            <span>Artículos</span>
            <strong>{datosTicket ? datosTicket.donacion.articulos : "..."}</strong>
          </div>
          <div className="cf-row">
            <span>Total</span>
            <strong>{datosTicket ? `MXN $${datosTicket.donacion.total}` : "..."}</strong>
          </div>
          <div className="cf-row">
            <span>Método de pago</span>
            <strong style={{textTransform: 'capitalize'}}>{datosTicket ? datosTicket.metodo_pago : "..."}</strong>
          </div>
          <div className="cf-row">
            <span>Folio</span>
            <strong>{datosTicket ? datosTicket.folio : "..."}</strong>
          </div>
        </div>

        {errorEnvio && <p className="msg-error"  style={{ color: "red", fontSize: "13px", marginBottom: "8px" }} >⚠ {errorEnvio}</p>}
        {correoEnviado && <p className="msg-success" style={{ color: "green", fontSize: "13px", marginBottom: "8px"}}>✓ Comprobante enviado correctamente</p>}

        <button 
          className="cf-button cf-button--primary" 
          type="button"
          onClick={enviarCorreo} 
          disabled={enviando || correoEnviado || !datosTicket}
        >
          {enviando ? "Enviando..." : correoEnviado ? "Correo enviado ✓" : "Enviar comprobante"}
        </button>

        <button className="cf-button cf-button--secondary" type="button" 
          onClick={() => {
            localStorage.clear(); // Limpiamos al salir
            navigate("/");
          }}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}