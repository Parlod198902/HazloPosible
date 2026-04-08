import { useState } from "react";
import "./MetodoPago.css";

const STEPS = [
  { number: 1, label: "Selección" },
  { number: 2, label: "Datos" },
  { number: 3, label: "Pago" },
  { number: 4, label: "Confirmación" },
];

const METODOS = [
  {
    id: "efectivo",
    label: "Efectivo",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        <path d="M18 12l.01 0" />
        <path d="M6 12l.01 0" />
      </svg>
    ),
  },
  {
    id: "tarjeta",
    label: "Tarjeta",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
        <path d="M3 10l18 0" />
        <path d="M7 15l.01 0" />
        <path d="M11 15l2 0" />
      </svg>
    ),
  },
];

export default function MetodoPago({ onNext }) {
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    if (onNext) onNext(selected);
  };

  return (
    <div className="mp-wrapper">
      {/* Stepper */}
      <div className="mp-stepper">
        {STEPS.map((step, i) => (
          <div key={step.number} className="mp-stepper__item">
            <div className="mp-stepper__info">
              <div className={`mp-stepper__circle ${step.number === 3 ? "mp-stepper__circle--active" : step.number < 3 ? "mp-stepper__circle--done" : ""}`}>
                {step.number}
              </div>
              <span className={`mp-stepper__label ${step.number === 3 ? "mp-stepper__label--active" : step.number < 3 ? "mp-stepper__label--done" : ""}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mp-stepper__line${step.number < 3 ? " mp-stepper__line--done" : ""}`} />
            )}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mp-header">
        <h1 className="mp-header__title">¿Cómo deseas pagar?</h1>
        <p className="mp-header__subtitle">Selecciona tu método de pago</p>
      </div>

      {/* Options */}
      <div className="mp-options">
        {METODOS.map((metodo) => (
          <button
            key={metodo.id}
            className={`mp-option${selected === metodo.id ? " mp-option--selected" : ""}`}
            onClick={() => setSelected(metodo.id)}
          >
            <div className="mp-option__icon">{metodo.icon}</div>
            <span className="mp-option__label">{metodo.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <button className="mp-continue-btn" onClick={handleContinue}>
          Continuar
        </button>
      )}
    </div>
  );
}
