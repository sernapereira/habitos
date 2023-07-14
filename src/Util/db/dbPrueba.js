export default function dbPruebas() {
  const habitos = [
    { name: "leer" },
    { name: "dormir temprano" },
    { name: "Hora de comida" },
  ];

  const temas = [{ id: "1", title: "SQL", descriccion: "" }];

  const agregarHabito = (habito) => {
    habito.push(habito);
    return habito[0];
  };

  return {
    habitos,
    temas,
    agregarHabito,
  };
}
