import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: function(origin, callback) {
    const whitelist = [process.env.FRONTEND_URL];

    // Registro en la consola utilizando la función global 'console'
    console.log('Origen recibido:', origin);

    if (whitelist.includes(origin)) {
      console.log('Origen permitido:', origin);
      callback(null, true);
    } else {
      console.error('Error de CORS:', origin);
      callback(new Error('Error de CORS'));
    }
  }
};