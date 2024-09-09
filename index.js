const fs = require('fs');
const axios = require('axios');

// Función para hacer una petición a la API con delay fijo
const fetchData = async (url, delay) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error; // Lanzar el error si ocurre
  }
};

// Leer el archivo JSON con las URLs
fs.readFile('apiUrls.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error leyendo el archivo apiUrls.json:', err);
    return;
  }

  try {
    // Parsear el contenido JSON
    const { urls } = JSON.parse(data);

    // Hacer llamadas a cada URL y mostrar resultados
    for (let index = 0; index < urls.length; index++) {
      const url = urls[index];
      try {
        const result = await fetchData(url, 10000); // Delay de 10 segundos entre cada solicitud
        console.log(`Respuesta de URL ${index + 1}:`);
        console.log(result);
        console.log('---------------------------------');
      } catch (error) {
        console.error(`Error al hacer la llamada a ${url}:`, error.message);
      }

      // Esperar antes de hacer la siguiente solicitud
      if (index < urls.length - 1) { // Evitar el delay después de la última solicitud
        await new Promise(resolve => setTimeout(resolve, 10000)); // Esperar 10 segundos
      }
    }
  } catch (parseError) {
    console.error('Error al parsear el archivo JSON:', parseError);
  }
});


