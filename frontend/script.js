// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const btnFetch = document.getElementById('btnFetch');
  const output = document.getElementById('output');

  // Verificar que los elementos existen antes de continuar
  if (!btnFetch || !output) {
    console.error('Error: No se encontraron los elementos necesarios en el DOM');
    return;
  }

  btnFetch.addEventListener('click', async () => {
    // Deshabilitar el botón mientras se procesa la solicitud
    btnFetch.disabled = true;
    output.textContent = 'Solicitando al servidor...';
    
    try {
      const res = await fetch('/api/message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      
      // Mostrar los datos de forma legible
      output.textContent = JSON.stringify(data, null, 2);
      
    } catch (err) {
      // Manejo de errores más específico
      if (err.name === 'TypeError') {
        output.textContent = 'Error de conexión: Verifica tu conexión a internet';
      } else {
        output.textContent = `Error: ${err.message}`;
      }
      console.error('Error completo:', err);
      
    } finally {
      // Rehabilitar el botón después de la solicitud
      btnFetch.disabled = false;
    }
  });
});