import express, { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.4";
import monumentModel from "./db/monumentos.ts";

await mongoose.connect(
  "mongodb+srv://alananconaortiz:12345@examenparcial.ujf1hqc.mongodb.net/monumentos?retryWrites=true&w=majority",
);

const BASE_URL_TIEMPO = `http://worldtimeapi.org/api/timezone`;
const BASE_URL_CODE = `https://zip-api.eu/api/v1/info`;
const BASE_URL_ISO = `https://restcountries.com/v3.1/alpha/`;

const miapp = express();

miapp.get(
  "/monumentos/:id",
  async (res: Response, req: Request) => {
    try {
      const { id } = req.params;
      const monumentoBuscar = await monumentModel.findOne({ id }).exec();
      res.status(200).send({
        id: monumentoBuscar.id,
        nombre: monumentoBuscar.nombre,
        pais: monumentoBuscar.pais,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
);

miapp.get(
  "/addMonumentos/",
  async (res: Response, req: Request) => {
    const { nombre, descripcion, pais, id } = req.body;
    const nuevoMonumento = new monumentModel({ nombre, descripcion, pais });
    const monumentoExistente = await monumentModel.findOne({ id }).exec();
    if (monumentoExistente) {
      res.status(500).send("Ya existe este monumento");
      return;
    }
    await nuevoMonumento.save();
    res.status(200).send({
      nombre: nuevoMonumento.nombre,
      descripcion: nuevoMonumento.descripcion,
      pais: nuevoMonumento.pais,
    });
  },
);

miapp.put(
  "/modificarMonumento",
  async (res: Response, req: Request) => {
    try {
      const { nombre, descripcion, pais } = req.body;

      const actualizarDatos = await monumentModel.findOneAndUpdate(
        { nombre },
        { descripcion },
        { pais },
      );
      if (!actualizarDatos) {
        res.status(500).send("Monumento no encontrado");
      }
      res.status(200).send({
        nombre: actualizarDatos.nombre,
        descripcion: actualizarDatos.descripcion,
        pais: actualizarDatos.pais,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
);

miapp.delete(
  "/borrarMonumento/:id",
  async (res: Response, req: Request) => {
    const { id } = req.params;
    const monumentoBorrar = monumentModel.findOneAndRemove({ id }).exec();
    if (!monumentoBorrar) {
      res.status(500).send("Monumento no encontrado");
      return;
    }
    res.status(200).send("Monumento eliminado");
  },
);

miapp.listen(3000, () => {
  console.log("Conectado y en el puerto 3000");
});
