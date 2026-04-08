import { useState } from "react";
import "./Apoyo.css";

const ACTIVITIES = [
  { id: 1, category: "Cocina", title: "Apoyo en el comedor", description: "Apoya preparando desayuno para las familias" },
  { id: 2, category: "Transporte", title: "Transporte hospitalario", description: "Acompaña a las familias en sus traslados médicos" },
  { id: 3, category: "Actividades infantiles", title: "Taller de arte infantil", description: "Actividad creativa con los niños de la casa" },
  { id: 4, category: "Mantenimiento", title: "Limpieza de áreas comunes", description: "Ayudar con el mantenimiento de espacios" },
];

const STEPS = [
  { number: 1, label: "Selección" },
  { number: 2, label: "Datos" },
  { number: 3, label: "Horario" },
  { number: 4, label: "Confirmación" },
];

const ACTIVE_STEP = 1;

export default function Apoyo({ onNext }) {
  const [selected, setSelected] = useState(null);

  const handleInscribirse = (activity) => {
    setSelected(activity.id);
    if (onNext) onNext(activity);
  };

  return (
    <div className="apoyo-wrapper">
      {/* Stepper */}
      <div className="apoyo-stepper">
        {STEPS.map((step, i) => {
          const isDone = step.number < ACTIVE_STEP;
          const isActive = step.number === ACTIVE_STEP;
          return (
            <div key={step.number} className="apoyo-stepper__item">
              <div className="apoyo-stepper__info">
                <div className={[
                  "apoyo-stepper__circle",
                  isActive ? " apoyo-stepper__circle--active" : "",
                  isDone ? " apoyo-stepper__circle--done" : "",
                ].join("")}> 
                  {step.number}
                </div>
                <span className={[
                  "apoyo-stepper__label",
                  isActive ? " apoyo-stepper__label--active" : "",
                  isDone ? " apoyo-stepper__label--done" : "",
                ].join("")}> 
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && <div className="apoyo-stepper__line" />}
            </div>
          );
        })}
      </div>

      {/* Header */}
      <div className="apoyo-header">
        <h1 className="apoyo-header__title">¿Cómo quieres ayudar?</h1>
        <p className="apoyo-header__subtitle">Elige la actividad que más te interese</p>
      </div>

      {/* Cards Grid */}
      <div className="apoyo-grid">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className={`apoyo-card${selected === activity.id ? " apoyo-card--selected" : ""}`}>
            <div>
              <span className="apoyo-card__category">{activity.category}</span>
              <h2 className="apoyo-card__title">{activity.title}</h2>
              <p className="apoyo-card__desc">{activity.description}</p>
            </div>
            <button
              className="apoyo-card__btn"
              onClick={() => handleInscribirse(activity)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
              Inscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
