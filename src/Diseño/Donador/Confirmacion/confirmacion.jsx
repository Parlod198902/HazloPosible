import { useNavigate } from 'react-router-dom';
import './confirmacion.css';

export default function Confirmacion() {
  const navigate = useNavigate();

  return (
    <div className="cf-wrap">
      <div className="cf-card">
        <div className="cf-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-circle-check">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
        </div>

        <h1 className="cf-title">¡Gracias por tu apoyo!</h1>
        <p className="cf-subtitle">Ahora eres parte de la fundación Ronald McDonald</p>

        <div className="cf-summary">
          <div className="cf-row">
            <span>Artículos</span>
            <strong>1</strong>
          </div>
          <div className="cf-row">
            <span>Total</span>
            <strong>MXN $120</strong>
          </div>
          <div className="cf-row">
            <span>Método de pago</span>
            <strong>Efectivo</strong>
          </div>
          <div className="cf-row">
            <span>Folio</span>
            <strong>12345678</strong>
          </div>
        </div>

        <button className="cf-button cf-button--primary" type="button">
          Descargar comprobante
        </button>
        <button className="cf-button cf-button--secondary" type="button" onClick={() => navigate('/') }>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
