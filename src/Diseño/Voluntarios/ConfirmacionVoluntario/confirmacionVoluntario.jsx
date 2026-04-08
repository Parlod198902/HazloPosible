import "./confirmacionVoluntario.css";

export default function ApoyoVoluntario({ datos = {}, onVolver }) {
  const {
    seleccion = "Actividades infantiles",
    tipo = "Actividad creativa",
    horario = "9:00 am – 11:00 am",
    folio = "12345678",
  } = datos;

  const handleEnviar = () => {
    alert("Credencial enviada al correo registrado.");
  };

  return (
    <div className="av-wrapper">
      {/* Ícono de check */}
      <div className="av-check">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </div>

      <h1 className="av-title">¡Gracias por tu apoyo!</h1>
      <p className="av-subtitle">Tu registro ha sido completado exitosamente</p>

      {/* Resumen */}
      <div className="av-card">
        <div className="av-card__row">
          <span className="av-card__key">Selección</span>
          <span className="av-card__val">{seleccion}</span>
        </div>
        <div className="av-card__divider" />
        <div className="av-card__row">
          <span className="av-card__key">Tipo</span>
          <span className="av-card__val">{tipo}</span>
        </div>
        <div className="av-card__divider" />
        <div className="av-card__row">
          <span className="av-card__key">Horario</span>
          <span className="av-card__val">{horario}</span>
        </div>
        <div className="av-card__divider" />
        <div className="av-card__row">
          <span className="av-card__key">Folio registro</span>
          <span className="av-card__val">{folio}</span>
        </div>
      </div>

      <button className="av-btn av-btn--primary" onClick={handleEnviar}>
        Enviar credencial por correo
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
