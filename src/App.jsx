import heroImg from './assets/HERO.png'
import logoImg from './assets/HAZLO POSIBLE LOGO.png'
import './index.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import DonadorSelection from './Diseño/Donador/Seleccion/seleccion';
import DonadorDatosForm from './Diseño/Donador/DatosForm/datosForm';
import DonadorMetodoPago from './Diseño/Donador/MetodoPago/MetodoPago';
import DonadorConfirmacion from './Diseño/Donador/Confirmacion/confirmacion';
import VoluntarioSeleccion from './Diseño/Voluntarios/DatosForm/Apoyo';
import VoluntarioDatos from './Diseño/Voluntarios/Datos/datosForm';
import VoluntarioHorario from './Diseño/Voluntarios/Horario/horario';
import VoluntarioConfirmacion from './Diseño/Voluntarios/ConfirmacionVoluntario/confirmacionVoluntario';

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <img src={heroImg} alt="Hazlo Posible" className="hero-image" />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title"> <img src={logoImg} alt="Hazlo Posible" /></h1>
          <h2 className="hero-subtitle">Cada acción cuenta</h2>
          <p className="hero-description">Únete como donador o voluntario en menos de 1 minuto</p>
          <div className="hero-buttons">
            <button className="btn btn-donate" onClick={() => navigate('/donador/seleccion')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
              Donar
            </button>
            <button className="btn btn-volunteer" onClick={() => navigate('/voluntarios/seleccion')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
              Ser voluntario
            </button>
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
      <Route path="/donador/seleccion" element={<DonadorSelection onNext={() => navigate('/donador/datos')} />} />
      <Route path="/donador/datos" element={<DonadorDatosForm onContinue={() => navigate('/donador/pago')} />} />
      <Route path="/donador/pago" element={<DonadorMetodoPago onNext={() => navigate('/donador/confirmacion')} />} />
      <Route path="/donador/confirmacion" element={<DonadorConfirmacion />} />
      <Route path="/voluntarios/seleccion" element={<VoluntarioSeleccion onNext={() => navigate('/voluntarios/datos')} />} />
      <Route path="/voluntarios/datos" element={<VoluntarioDatos onContinue={() => navigate('/voluntarios/horario')} />} />
      <Route path="/voluntarios/horario" element={<VoluntarioHorario onNext={() => navigate('/voluntarios/confirmacion')} />} />
      <Route path="/voluntarios/confirmacion" element={<VoluntarioConfirmacion onVolver={() => navigate('/')} />} />
      <Route path="/formulario" element={<Navigate to="/donador/seleccion" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
