import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(colors.magenta.bold(`Conectado a la base de datos en ${url}`));
    } catch (error) {
        console.log(colors.red.bold(`Error al conectar a la base de datos: ${error}`));
        process.exit(1);
    }
}