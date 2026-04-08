import { useState } from "react";
import "./horario.css";
import { finalizarYGuardarVoluntariado } from "../../../Backend/back_voluntario/horarioBack";

const STEPS = [
  { number: 1, label: "Selección" },
  { number: 2, label: "Datos" },
  { number: 3, label: "Horario" },
  { number: 4, label: "Confirmación" },
];

const SLOTS = [
  { id: 1, time: "9:00 am - 11:00 am", period: "Mañana" },
  { id: 2, time: "1:00 pm - 3:00 pm",  period: "Tarde" },
  { id: 3, time: "5:00 pm - 7:00 pm",  period: "Noche" },
];

const ACTIVE_STEP = 3;

export default function ScheduleSelection({ onNext }) {
  const [selected, setSelected] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelect = async (slot) => {
    if (isSaving) return;
    
    setSelected(slot.id);
    setIsSaving(true);

    const resultado = await finalizarYGuardarVoluntariado(slot);
    
    setIsSaving(false);

    if (resultado.success) {
      setTimeout(() => {
        if (onNext) onNext(slot);
      }, 400);
    } else {
      alert("Hubo un error al guardar tu registro. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="ss-wrapper">
      {/* Stepper */}
      <div className="ss-stepper">
        <div className="ss-stepper__row">
          {STEPS.map((step, i) => {
            const isDone   = step.number < ACTIVE_STEP;
            const isActive = step.number === ACTIVE_STEP;
            return (
              <div key={step.number} className="ss-stepper__item">
                <div className="ss-stepper__info">
                  <div className={[
                    "ss-stepper__circle",
                    isActive ? "ss-stepper__circle--active" : "",
                    isDone   ? "ss-stepper__circle--done"   : "",
                  ].join(" ")}>
                    {step.number}
                  </div>
                  <span className={[
                    "ss-stepper__label",
                    isActive ? "ss-stepper__label--active" : "",
                    isDone   ? "ss-stepper__label--done"   : "",
                  ].join(" ")}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`ss-stepper__line${isDone ? " ss-stepper__line--done" : ""}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div className="ss-header">
        <h1 className="ss-header__title">{isSaving ? "Registrando..." : "Elige tu horario"}</h1>
        <p className="ss-header__subtitle">{isSaving ? "Guardando" : "Selecciona el horario que mejor te acomode"}</p>
      </div>

      {/* Slots */}
      <div className="ss-slots">
        {SLOTS.map((slot) => (
          <button
            key={slot.id}
            className={`ss-slot${selected === slot.id ? " ss-slot--selected" : ""}`}
            onClick={() => handleSelect(slot)}
            disabled={isSaving}
          >
            <p className="ss-slot__time">{slot.time}</p>
            <p className="ss-slot__period">{slot.period}</p>
          </button>
        ))}
      </div>
    </div>
  );
}