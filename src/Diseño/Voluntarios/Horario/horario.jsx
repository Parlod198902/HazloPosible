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
  { id: 2, time: "1:00 pm - 3:00 pm", period: "Tarde" },
  { id: 3, time: "5:00 pm - 7:00 pm", period: "Noche" },
];

const ACTIVE_STEP = 3;

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function ScheduleSelection({ onNext }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  // --- Lógica del Calendario ---
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    setSelectedDate(date);
    setSelectedSlot(null); // Resetear horario al cambiar fecha
  };

  const handleSlotSelect = (slot) => {
    if (isSaving) return;
    setSelectedSlot(slot.id);
  };

  // --- Lógica de Guardado ---
  const handleContinue = async () => {
    if (isSaving || !selectedDate || !selectedSlot) return;
    
    setIsSaving(true);

    const selectedSlotData = SLOTS.find(s => s.id === selectedSlot);
    
    // Llamada al backend pasando el slot y el objeto Date
    const resultado = await finalizarYGuardarVoluntariado({
      ...selectedSlotData,
      date: selectedDate
    });
    
    setIsSaving(false);

    if (resultado.success) {
      if (onNext) onNext({ slot: selectedSlotData, date: selectedDate });
    } else {
      alert("Error: " + resultado.error);
    }
  };

  // --- Helpers de UI ---
  const isDateSelected = (date) => date && selectedDate?.toDateString() === date.toDateString();
  const isToday = (date) => date && new Date().toDateString() === date.toDateString();
  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(currentMonth);
  const canContinue = selectedDate && selectedSlot && !isSaving;

  return (
    <div className="ss-wrapper">
      {/* Stepper */}
      <div className="ss-stepper">
        <div className="ss-stepper__row">
          {STEPS.map((step, i) => {
            const isDone = step.number < ACTIVE_STEP;
            const isActive = step.number === ACTIVE_STEP;
            return (
              <div key={step.number} className="ss-stepper__item">
                <div className="ss-stepper__info">
                  <div className={`ss-stepper__circle ${isActive ? "ss-stepper__circle--active" : ""} ${isDone ? "ss-stepper__circle--done" : ""}`}>
                    {step.number}
                  </div>
                  <span className={`ss-stepper__label ${isActive ? "ss-stepper__label--active" : ""} ${isDone ? "ss-stepper__label--done" : ""}`}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`ss-stepper__line ${isDone ? "ss-stepper__line--done" : ""}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div className="ss-header">
        <h1 className="ss-header__title">{isSaving ? "Procesando..." : "Elige fecha y horario"}</h1>
        <p className="ss-header__subtitle">
          {isSaving ? "Estamos registrando tu voluntariado" : "Selecciona una fecha y tu horario preferido"}
        </p>
      </div>

      {/* Main Content */}
      <div className="ss-content">
        {/* Calendario */}
        <div className="ss-calendar">
          <div className="ss-calendar__header">
            <button className="ss-calendar__nav" onClick={handlePrevMonth} disabled={isSaving}>‹</button>
            <h2 className="ss-calendar__month">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button className="ss-calendar__nav" onClick={handleNextMonth} disabled={isSaving}>›</button>
          </div>

          <div className="ss-calendar__grid">
            {DAYS.map(day => <div key={day} className="ss-calendar__day-label">{day}</div>)}
            {days.map((date, i) => (
              <button
                key={i}
                type="button"
                className={`ss-calendar__day ${!date ? "ss-calendar__day--empty" : ""} ${isToday(date) ? "ss-calendar__day--today" : ""} ${isDateSelected(date) ? "ss-calendar__day--selected" : ""} ${isPastDate(date) ? "ss-calendar__day--disabled" : ""}`}
                onClick={() => handleDateSelect(date)}
                disabled={!date || isPastDate(date) || isSaving}
              >
                {date ? date.getDate() : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Horarios */}
        <div className="ss-slots-container">
          <h3 className="ss-slots__title">Horarios disponibles</h3>
          {!selectedDate ? (
            <p className="ss-slots__hint">Selecciona primero una fecha en el calendario</p>
          ) : (
            <div className="ss-slots">
              {SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  className={`ss-slot ${selectedSlot === slot.id ? " ss-slot--selected" : ""}`}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={isSaving}
                >
                  <p className="ss-slot__time">{slot.time}</p>
                  <p className="ss-slot__period">{slot.period}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="ss-actions">
        <button
          className="ss-btn-continue"
          onClick={handleContinue}
          disabled={!canContinue}
          type="button"
        >
          {isSaving ? "Guardando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
}