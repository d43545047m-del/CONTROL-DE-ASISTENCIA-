// Configuración de tu proyecto en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqheRJkcSJVPG1XuMEiZlithQKUYV9JKE",
  authDomain: "control-de-asistencia-aef47.firebaseapp.com",
  databaseURL: "https://control-de-asistencia-aef47-default-rtdb.firebaseio.com",
  projectId: "control-de-asistencia-aef47",
  storageBucket: "control-de-asistencia-aef47.firebasestorage.app",
  messagingSenderId: "918828594178",
  appId: "1:918828594178:web:e44ff1902cfc4502fca31b",
  measurementId: "G-56QDYD0B6Y"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Guardar registro
document.getElementById('attendanceForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const btn = document.getElementById('btnGuardar');
  btn.disabled = true;
  btn.innerText = 'Guardando...';

  const hoy = new Date();
  const fechaIso = hoy.toISOString().split('T')[0];
  const fechaFormateada = hoy.toLocaleDateString('es-ES') + ' ' + hoy.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const nuevoRegistro = {
    grado: document.getElementById('grado').value,
    aula: document.getElementById('aula').value,
    estudiante: document.getElementById('estudiante').value,
    estado: document.getElementById('estado').value,
    fecha: fechaFormateada,
    fechaFiltro: fechaIso
  };

  database.ref('asistencia').push(nuevoRegistro)
    .then(() => {
      alert('✅ Registro guardado en la nube con éxito');
      document.getElementById('attendanceForm').reset();
    })
    .catch((error) => {
      alert('❌ Error al guardar: ' + error.message);
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerText = 'Guardar Registro';
    });
});
