import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { navBarAction } from "../../redux/action/navBarAction";
import { getTemaAction } from "../../redux/action/estudioAction";
import useNavBar from "./HooskNavBar";
import { useEffect } from "react";

const Navbar = () => {
  const temaPost = useSelector((state) => state.estudio.temaPost);
  // =========================== section variables =========================
  const dispatch = useDispatch();
  //=========================== section Hoosk ================================
  const {
    section2,
    newTema,
    setSection2,
    handleMouseEnter,
    activarForm,
    formHandler,
    manejarCambioArchivo,
    enviarForm,
    navHabito,
    temas,
  } = useNavBar();

  useEffect(() => {
    dispatch(getTemaAction());
  }, [dispatch, temaPost]);

  return (
    <div className={style.nav}>
      {/* ========================= Retorno ====================== */}
      <Link
        to="/"
        className={style.button_inicio}
        value=""
        onClick={(e) => handleMouseEnter(e)}
      >
        Inicio
      </Link>
      {/* ======================== section 1 ======================= */}
      {navHabito !== "Estudios" && (
        <div className={style.nav__section1}>
          <button
            onClick={(e) => {
              setSection2(true);
              setTimeout(() => {
                handleMouseEnter(e);
                setSection2(false);
              }, 500);
            }}
            value="Estudios"
            className={section2 ? style.nav__button2 : style.nav__button}
          >
            Estudios
          </button>
        </div>
      )}
      {/* =========================  section Temas ========================= */}
      {navHabito && (
        <div className={style.tema}>
          {temas?.map((tema, index) => {
            return (
              <Link
                to={`/estudio/${tema.id}`}
                className={section2 ? style.tema_ref2 : style.tema_ref}
                key={index}
                value=""
                onClick={(e) => {
                  setSection2(true);
                  setTimeout(() => {
                    handleMouseEnter(e);
                    setSection2(false);
                  }, 500);
                }}
              >
                {tema.titulo}
              </Link>
            );
          })}
          {navHabito && (
            <div className={style.agragrTema__container}>
              <button
                className={style.agragrTema}
                onClick={() => activarForm(true)}
              >
                Nuevo tema
              </button>
            </div>
          )}
          {newTema && (
            <form className={style.form}>
              <button
                className={style.form__salir}
                onClick={() => activarForm(false)}
              >
                X
              </button>
              <h1>Titulo</h1>
              <input
                className={style.form__title}
                type="text"
                onChange={(e) => formHandler(e)}
                name="titulo"
              />
              <h2>Descripcion</h2>
              <textarea
                name="descriccion"
                className={style.form__textarea}
                onChange={(e) => formHandler(e)}
              ></textarea>
              <h3>Imagen </h3>
              <input
                type="file"
                onChange={(e) => manejarCambioArchivo(e)}
                name="imagenPrincipal"
              />
              <button
                onClick={(e) => enviarForm(e)}
                className={style.from__button}
              >
                Agrgar
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
