document.addEventListener('DOMContentLoaded', () => {
  const registros = JSON.parse(localStorage.getItem('registrosAsistencia')) || [];

  // Conteo por Estado
  const estados = { Tardanza: 0, Inasistencia: 0 };
  // Conteo por Grado
  const grados = {};

  registros.forEach(r => {
    if (estados[r.estado] !== undefined) estados[r.estado]++;
    grados[r.grado] = (grados[r.grado] || 0) + 1;
  });

  // Gráfico de Pastel (Tardanza vs Inasistencia)
  new Chart(document.getElementById('chartEstado'), {
    type: 'pie',
    data: {
      labels: ['Tardanzas', 'Inasistencias'],
      datasets: [{
        data: [estados.Tardanza, estados.Inasistencia],
        backgroundColor: ['#ffc107', '#dc3545']
      }]
    }
  });

  // Gráfico de Barras (Por Grado)
  new Chart(document.getElementById('chartGrado'), {
    type: 'bar',
    data: {
      labels: Object.keys(grados),
      datasets: [{
        label: 'Total Incidencias',
        data: Object.values(grados),
        backgroundColor: '#0d6efd'
      }]
    }
  });
});