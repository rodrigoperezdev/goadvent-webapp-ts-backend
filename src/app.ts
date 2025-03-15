import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/destination.routes';

// Cargar variables de entorno
//dotenv.config({ path: '.env' });

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE_URL!, {
    dbName: process.env.MONGO_DB_NAME!,
    authSource: 'admin',
  })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err);
  });

app.use('/destinations', router);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
