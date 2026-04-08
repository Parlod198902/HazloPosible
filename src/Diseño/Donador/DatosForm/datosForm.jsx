import './datosForm.css';

const steps = [
  { num: 1, label: 'Selección', state: 'done' },
  { num: 2, label: 'Datos',     state: 'active' },
  { num: 3, label: 'Horario',   state: 'inactive' },
  { num: 4, label: 'Confirmación', state: 'inactive' },
];

export default function DatosForm({ onContinue }) {
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
        <input type="text" id="nombre" placeholder="José Gracia Lopéz" />
      </div>
      <div className="df-field">
        <label htmlFor="tel">Teléfono</label>
        <input type="tel" id="tel" placeholder="922-186-25-69" />
      </div>
      <div className="df-field">
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="josegarcia203@gmail.com" />
      </div>

      <button className="df-btn" onClick={onContinue}>Continuar</button>
    </div>
  );
}