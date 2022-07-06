import TesseractComp from "./components/TesseractComp";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.scss";

function App() {
  return (
    <div className="App">
      <Nav/>
      <TesseractComp />
    </div>
  );
}

export default App;
