document.addEventListener('DOMContentLoaded', () => {
  const registros = JSON.parse(localStorage.getItem('registrosAsistencia')) || [];

  if (registros.length === 0) {
    console.warn("No hay registros guardados en localStorage todavía.");
    return;
  }

  // Conteo de registros
  const estados = { Tardanza: 0, Inasistencia: 0 };
  const grados = {};

  registros.forEach(r => {
    if (estados[r.estado] !== undefined) {
      estados[r.estado]++;
    }
    grados[r.grado] = (grados[r.grado] || 0) + 1;
  });

  // Gráfico 1: Estado (Tardanza vs Inasistencia)
  const ctxEstado = document.getElementById('chartEstado');
  if (ctxEstado) {
    new Chart(ctxEstado, {
      type: 'pie',
      data: {
        labels: ['Tardanzas', 'Inasistencias'],
        datasets: [{
          data: [estados.Tardanza, estados.Inasistencia],
          backgroundColor: ['#ffc107', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Gráfico 2: Incidencias por Grado
  const ctxGrado = document.getElementById('chartGrado');
  if (ctxGrado) {
    new Chart(ctxGrado, {
      type: 'bar',
      data: {
        labels: Object.keys(grados),
        datasets: [{
          label: 'Cantidad de Incidencias',
          data: Object.values(grados),
          backgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }
});
