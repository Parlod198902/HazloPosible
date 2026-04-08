import { useState } from "react";
import "./seleccion.css";

const NEEDS = [
  { id: 1, title: "Combo Infantil", description: "Hamburguesa Chica, Papas Chicas y Jugo Chico", price: 120 },
  { id: 2, title: "Combo Familiar", description: "4 Hamburguesas Chicas, 4 Papas Chicas y 4 Refrescos de 600 ml", price: 500 },
  { id: 3, title: "Combo Individual", description: "Hamburguesa Chica, Papas Chicas y Refresco de 600 ml", price: 180 },
  { id: 4, title: "Combo Amigos", description: "2 Hamburguesas Chicas, 4 Papas Chicas y 4 Refrescos de 600 ml", price: 250 },
];

const STEPS = [
  { number: 1, label: "Selección" },
  { number: 2, label: "Datos" },
  { number: 3, label: "Pago" },
  { number: 4, label: "Confirmación" },
];

export default function DonationSelection({ onNext }) {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(NEEDS.map((n) => [n.id, 1]))
  );

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, prev[id] + delta) }));
  };

  const handleAdd = (need) => {
    if (onNext) onNext({ ...need, quantity: quantities[need.id] });
  };

  return (
    <div className="ds-wrapper">
      {/* Step Progress */}
      <div className="ds-stepper">
        <div className="ds-stepper__row">
          {STEPS.map((step, i) => (
            <div key={step.number} className="ds-stepper__item">
              <div className="ds-stepper__info">
                <div className={`ds-stepper__circle${step.number === 1 ? " ds-stepper__circle--active" : ""}`}>
                  {step.number}
                </div>
                <span className={`ds-stepper__label${step.number === 1 ? " ds-stepper__label--active" : ""}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && <div className="ds-stepper__line" />}
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="ds-header">
        <h1 className="ds-header__title">¿Qué menú deseas donar?</h1>
        <p className="ds-header__subtitle">Selecciona el menú que quieres donar de forma significativa</p>
      </div>

      {/* Cards Grid */}
      <div className="ds-grid">
        {NEEDS.map((need) => {
          const qty = quantities[need.id];
          return (
            <div key={need.id} className="ds-card">
              <div>
                <h2 className="ds-card__title">{need.title}</h2>
                <p className="ds-card__desc">{need.description}</p>
              </div>

              <div className="ds-card__actions">
                <div className="ds-stepper-ctrl">
                  <button className="ds-stepper-ctrl__btn" onClick={() => changeQty(need.id, -1)}>-</button>
                  <span className="ds-stepper-ctrl__qty">{qty}</span>
                  <button className="ds-stepper-ctrl__btn" onClick={() => changeQty(need.id, 1)}>+</button>
                </div>

                <button className="ds-add-btn" onClick={() => handleAdd(need)}>
                  <span>Agregar</span>
                  <span>MX${(need.price * qty).toLocaleString()}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}