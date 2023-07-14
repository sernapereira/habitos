import { useRoutes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Home from "./Page/Home/Home";
import style from "./App.module.css";
import Habito from "./components/Section/section1/habito";
import { BrowserRouter } from "react-router-dom";
import Estudio from "./Page/Estudio/Estudio";
import axios from "axios";
import DWGvisor from "./components/DWGvisor/DWGvisor";
import FileConverter from "./components/DWGvisor/DWGvisor";

axios.defaults.baseURL = "http://localhost:3000";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/habito", element: <Habito /> },
    { path: "/estudio/:id", element: <Estudio /> },
    { path: "/estudio/dwg", element: <FileConverter /> },
  ]);

  return routes;
};

function App() {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
