import './confirmacion.css';

const STEPS = [
  { number: 1, label: 'Selección' },
  { number: 2, label: 'Datos' },
  { number: 3, label: 'Horario' },
  { number: 4, label: 'Confirmación' },
];

export default function Confirmacion() {
  return (
    <div className="cf-wrap">
      <div className="cf-stepper">
        {STEPS.map((step, index) => {
          const isActive = step.number === 4;
          const isDone = step.number < 4;
          return (
            <div key={step.number} className="cf-step-item">
              <div className={`cf-circle ${isDone ? 'cf-circle--done' : ''} ${isActive ? 'cf-circle--active' : ''}`}>
                {step.number}
              </div>
              <span className={`cf-label ${isDone ? 'cf-label--done' : ''} ${isActive ? 'cf-label--active' : ''}`}>
                {step.label}
              </span>
              {index < STEPS.length - 1 && <div className={`cf-line ${isDone ? 'cf-line--done' : ''}`} />}
            </div>
          );
        })}
      </div>

      <div className="cf-content">
        <h1>¡Listo!</h1>
        <p>Tu selección y datos se han registrado correctamente. Gracias por formar parte de Hazlo Posible.</p>
      </div>
    </div>
  );
}
