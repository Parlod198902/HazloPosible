import { useState } from "react";
import "./seleccion.css";
import { guardarSeleccionLocal } from "../../../Backend/seleccionBack";

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
    Object.fromEntries(NEEDS.map((n) => [n.id, 0]))
  );
  const [cart, setCart] = useState({});

  const selectedEntries = Object.values(cart);
  const cartCount = selectedEntries.length;
  const totalQuantity = selectedEntries.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = selectedEntries.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
  };

  const handleAdd = (need) => {
    const quantity = quantities[need.id];
    if (!quantity) return;

    setCart((prev) => ({
      ...prev,
      [need.id]: {
        ...need,
        quantity,
      },
    }));
  };

  return (
    <div className="ds-wrapper">
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

      <div className="ds-header">
        <h1 className="ds-header__title">¿Qué menú deseas donar?</h1>
        <p className="ds-header__subtitle">Selecciona el menú que quieres donar de forma significativa</p>
      </div>

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

                <button
                  className="ds-add-btn"
                  onClick={() => handleAdd(need)}
                  disabled={!qty}
                >
                  <span>Agregar</span>
                  <span>MX${(need.price * qty).toLocaleString()}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ds-cart-summary ds-cart-summary--lower">
        <div className="ds-cart-summary__info">
          <div className="ds-cart-summary__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-shopping-cart">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </div>
          <div>
            <p className="ds-cart-summary__label">{cartCount} Donativo{cartCount !== 1 ? 's' : ''}</p>
            <p className="ds-cart-summary__total">Total: MX${totalAmount.toLocaleString()}</p>
          </div>
        </div>
        <button
          className="ds-cart-summary__btn"
          type="button"
          onClick={() => {
            guardarSeleccionLocal(selectedEntries, totalAmount);
            if (onNext) onNext(selectedEntries);
          }}
          disabled={!cartCount}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
