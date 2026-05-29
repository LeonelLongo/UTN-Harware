import placa1 from "../assets/imagenes/productos/placa1.png";
import proce1 from "../assets/imagenes/productos/proce1.png";
import ram1 from "../assets/imagenes/productos/ram1.png";

export const products = [
  {
    id: 1,
    name: "RTX 3060",
    price: 300000,
    image: placa1,
    specs: [
      { label: "Memoria", value: "12GB GDDR6" },
      { label: "Bus de memoria", value: "192-bit" },
      { label: "Velocidad de boost", value: "1777 MHz" },
      { label: "Consumo", value: "170W" },
    ],
  },
  {
    id: 2,
    name: "Ryzen 5 5600",
    price: 200000,
    image: proce1,
    specs: [
      { label: "Núcleos", value: "6" },
      { label: "Hilos", value: "12" },
      { label: "Frecuencia base", value: "3.5 GHz" },
      { label: "Frecuencia boost", value: "4.4 GHz" },
      { label: "Socket", value: "AM4" },
    ],
  },
  {
    id: 3,
    name: "16GB RAM DDR4",
    price: 80000,
    image: ram1,
    specs: [
      { label: "Capacidad", value: "16GB (2x8GB)" },
      { label: "Tipo", value: "DDR4" },
      { label: "Velocidad", value: "3200 MHz" },
      { label: "Latencia", value: "CL16" },
    ],
  },
];
