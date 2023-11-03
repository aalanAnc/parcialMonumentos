export type monumento = {
  id: number;
  nombre: infoMonNec["nombre"];
  descripcion: infoMonNec["descripcion"];
  CP: infoMonNec["CP"];
  ciudad: string;
  pais: string;
  continente: string;
  hora: string;
};

export type infoMonNec = {
  nombre: string;
  descripcion: string;
  CP: number;
  ISO: string;
};

export type timeApi = {
  dateTime: string;
  timeZone: string;
};
