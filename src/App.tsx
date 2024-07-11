import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useSelector } from "react-redux";
import { sessionData } from "./lib/features/session/session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const session = useSelector(sessionData);

  const element = useRoutes(routes(session.isLoggedIn));

  return (
    <>
      {element}
      <ToastContainer />
    </>
  );
}

export default App;
