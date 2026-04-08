import './datosForm.css';
import { useState } from 'react';
import { guardarDatos } from '../../../Backend/back_donar/datosForm';

const steps = [
  { num: 1, label: 'Datos',     state: 'active' },
  { num: 2, label: 'Selección', state: 'inactive' },
  { num: 3, label: 'Horario',   state: 'inactive' },
  { num: 4, label: 'Confirmación', state: 'inactive' },
];

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
  }

  return (
    <div className="df-wrap">
      <div className="df-stepper">
        {steps.map((s) => (
          <div key={s.num} className={`df-step-item ${s.state}`}>
            <div className={`df-circle ${s.state}`}>{s.num}</div>
            <span className={`df-label ${s.state}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <h1 className="df-title">Tus datos</h1>
      <p className="df-subtitle">Completa tu información para continuar</p>

      <div className="df-field">
        <label htmlFor="nombre">Nombre completo</label>
        <input 
        type="text" 
        id="nombre" 
        value = {nombre}
        onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="df-field">
        <label htmlFor="tel">Teléfono</label>
        <input 
        type="tel" 
        id="tel" 
        value = {telefono}
        onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div className="df-field">
        <label htmlFor="email">Correo electrónico</label>
        <input 
        type="email" 
        id="email" 
        value = {email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="df-btn" onClick={manejarContinuar}>Continuar</button>
    </div>
  );
}