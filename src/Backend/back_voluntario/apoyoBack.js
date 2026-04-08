export const guardarActividadVoluntariado = (activity) => {
    const seleccionVoluntario = {
        actividad_id: activity.id,
        categoria: activity.category,
        titulo: activity.title,
        fecha_seleccion: new Date().toISOString()
    };

    localStorage.setItem('voluntariado_seleccion', JSON.stringify(seleccionVoluntario));
    return seleccionVoluntario;
};

export const obtenerActividadVoluntariado = () => {
    const data = localStorage.getItem('voluntariado_seleccion');
    return data ? JSON.parse(data) : null;
};

export const limpiarVoluntariado = () => {
    localStorage.removeItem('voluntariado_seleccion');
};