import mongoose from "npm:mongoose@7.6.4";
import { monumento } from "../types.ts";

const Schema = mongoose.Schema;

const monumentoSchema = new Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  CP: { type: Number, required: true },
  ciudad: { type: Number, required: true },
  pais: { type: String, required: true },
  contienente: { type: String, required: true },
  hora: { type: String, required: true },
});

export type monumentoModel = mongoose.Document & Omit<monumento, "id">;

export default mongoose.model<monumentoModel>(
  "monumento",
  monumentoSchema,
);
