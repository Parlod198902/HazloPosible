import './datosForm.css';
import { useState } from 'react';
import { guardarDatos } from '../../../Backend/back_voluntario/datosVoluntario';

const STEPS = [
  { number: 1, label: "Datos" },
  { number: 2, label: "Selección" },
  { number: 3, label: "Horario" },
  { number: 4, label: "Confirmación" },
];

const ACTIVE_STEP = 1;

export default function DatosForm({ onContinue }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const manejarContinuar = () => {
    if (!nombre || !telefono || !email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    guardarDatos(nombre, telefono, email);

    if (onContinue) onContinue();
  };

  return (
    <div className="df-wrap">
      {/* Stepper */}
      <div className="df-stepper">
        {STEPS.map((step, i) => {
          const isDone = step.number < ACTIVE_STEP;
          const isActive = step.number === ACTIVE_STEP;
          return (
            <div key={step.number} className="df-stepper__item">
              <div className="df-stepper__info">
                <div className={[
                  "df-stepper__circle",
                  isActive ? "df-stepper__circle--active" : "",
                  isDone ? "df-stepper__circle--done" : "",
                ].join(" ")}>
                  {step.number}
                </div>
                <span className={[
                  "df-stepper__label",
                  isActive ? "df-stepper__label--active" : "",
                  isDone ? "df-stepper__label--done" : "",
                ].join(" ")}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`df-stepper__line${isDone ? " df-stepper__line--done" : ""}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Header */}
      <div className="df-header">
        <h1 className="df-header__title">Tus datos</h1>
        <p className="df-header__subtitle">Completa tu información para continuar</p>
      </div>

      {/* Form */}
      <div className="df-form">
        <div className="df-field">
          <label htmlFor="nombre">Nombre completo</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="df-field">
          <label htmlFor="tel">Teléfono</label>
          <input 
            type="tel" 
            id="tel" 
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="df-field">
          <label htmlFor="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="df-btn" onClick={manejarContinuar}>Continuar</button>
      </div>
    </div>
  );
}