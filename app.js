document.getElementById('attendanceForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const registro = {
    grado: document.getElementById('grado').value,
    aula: document.getElementById('aula').value,
    estudiante: document.getElementById('estudiante').value,
    estado: document.getElementById('estado').value,
    fecha: new Date().toLocaleDateString()
  };

  const registros = JSON.parse(localStorage.getItem('registrosAsistencia')) || [];
  registros.push(registro);
  localStorage.setItem('registrosAsistencia', JSON.stringify(registros));

  alert('Registro guardado correctamente');
  this.reset();
});
