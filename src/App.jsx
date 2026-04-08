import heroImg from './assets/HERO.png'
import logoImg from './assets/HAZLO POSIBLE LOGO.png'
import './index.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import DonationSelection from './seleccion';
import DatosForm from './datosForm';
import ScheduleSelection from './horario';
import Confirmacion from './confirmacion';

function Hero() {
  const navigate = useNavigate();
  return (

      /* Sección Hero */
    <div className="hero-section">
      {/* Imagen de fondo */}
      <img src={heroImg} alt="Hazlo Posible" className="hero-image" />
      
      {/* Contenido superpuesto */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title"> <img src={logoImg} alt="Hazlo Posible" /></h1>
          <h2 className="hero-subtitle">Cada acción cuenta</h2>
          <p className="hero-description">Únete como donador o voluntario en menos de 1 minuto</p>
          
          {/* Botones */}
          <div className="hero-buttons">
            <button className="btn btn-donate" onClick={() => navigate('/seleccion')}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>Donar</button>
            <button className="btn btn-volunteer" onClick={() => navigate('/seleccion')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg> Ser voluntario</button>
          </div>
          
          <p className="hero-stats">Más de 2,500 personas ya se han unido</p>
        </div>
      </div>
    </div>
  )
}
function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/formulario" element={<Navigate to="/seleccion" replace />} />
      <Route path="/seleccion" element={<DonationSelection onNext={() => navigate('/datos')} />} />
      <Route path="/datos" element={<DatosForm onContinue={() => navigate('/horario')} />} />
      <Route path="/horario" element={<ScheduleSelection onNext={() => navigate('/confirmacion')} />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
    </Routes>
  )
}
export default App
