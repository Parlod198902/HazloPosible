import { useState } from 'react';
import './AgregarTarjeta.css';
import Confirmacion from '../Confirmacion/confirmacion';
import { finalizarYGuardarDonacion } from '../../../Backend/back_donar/metodoPagoBack';

const STEPS = [
  { number: 1, label: "Selección" },
  { number: 2, label: "Datos" },
  { number: 3, label: "Pago" },
  { number: 4, label: "Confirmación" },
];

const ACTIVE_STEP = 3;

export default function AgregarTarjeta({ onContinue }) {
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatearNumeroTarjeta = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    const grupos = numeros.match(/.{1,4}/g);
    return grupos ? grupos.join(' ') : numeros;
  };

  const formatearFecha = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length >= 2) {
      return numeros.slice(0, 2) + '/' + numeros.slice(2, 4);
    }
    return numeros;
  };

  const handleNumeroTarjetaChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 16) {
      setNumeroTarjeta(formatearNumeroTarjeta(valor));
    }
  };

  const handleFechaChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 4) {
      setFechaVencimiento(formatearFecha(valor));
    }
  };

  const handleCodigoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 3) {
      setCodigoSeguridad(valor);
    }
  };

  const handleContinuar = async () => {
    const numeroLimpio = numeroTarjeta.replace(/\s/g, '');
    
    if (!numeroLimpio || numeroLimpio.length !== 16) {
      alert('Por favor, ingresa un número de tarjeta válido (16 dígitos)');
      return;
    }
    
    if (!fechaVencimiento || fechaVencimiento.length !== 5) {
      alert('Por favor, ingresa una fecha de vencimiento válida (MM/AA)');
      return;
    }
    
    if (!codigoSeguridad || codigoSeguridad.length !== 3) {
      alert('Por favor, ingresa un código de seguridad válido (3 dígitos)');
      return;
    }

    setLoading(true);
    
    // Guardar los datos en Firestore igual que en MetodoPago
    const resultado = await finalizarYGuardarDonacion('tarjeta');
    
    setLoading(false);

    if (resultado.success) {
      setShowConfirmacion(true);
    } else {
      alert("Hubo un problema al guardar tu donación. Intenta de nuevo.");
    }
  };

  if (showConfirmacion) {
    return <Confirmacion />;
  }

  return (
    <div className="at-wrapper">
      {/* Stepper */}
      <div className="at-stepper">
        {STEPS.map((step, i) => {
          const isDone = step.number < ACTIVE_STEP;
          const isActive = step.number === ACTIVE_STEP;
          return (
            <div key={step.number} className="at-stepper__item">
              <div className="at-stepper__info">
                <div className={[
                  "at-stepper__circle",
                  isActive ? "at-stepper__circle--active" : "",
                  isDone ? "at-stepper__circle--done" : "",
                ].join(" ")}>
                  {step.number}
                </div>
                <span className={[
                  "at-stepper__label",
                  isActive ? "at-stepper__label--active" : "",
                  isDone ? "at-stepper__label--done" : "",
                ].join(" ")}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`at-stepper__line${isDone ? " at-stepper__line--done" : ""}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Header */}
      <div className="at-header">
        <h1 className="at-header__title">Agregar tarjeta</h1>
      </div>

      {/* Form */}
      <div className="at-form">
        <div className="at-field">
          <label htmlFor="numero">Número de la tarjeta</label>
          <input
            type="text"
            id="numero"
            value={numeroTarjeta}
            onChange={handleNumeroTarjetaChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
        </div>

        <div className="at-field-row">
          <div className="at-field">
            <label htmlFor="fecha">Fecha de vencimiento</label>
            <input
              type="text"
              id="fecha"
              value={fechaVencimiento}
              onChange={handleFechaChange}
              placeholder="MM/AA"
              maxLength="5"
            />
          </div>

          <div className="at-field">
            <label htmlFor="cvv">Código de seguridad</label>
            <input
              type="text"
              id="cvv"
              value={codigoSeguridad}
              onChange={handleCodigoChange}
              placeholder="123"
              maxLength="3"
            />
          </div>
        </div>

        <button 
          className="at-btn" 
          onClick={handleContinuar}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
}