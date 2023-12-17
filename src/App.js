import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import AddCustomer from "./components/Customer/AddCustomer";
import EditCustomer from "./components/Customer/EditCustomer";
import File from "./components/File/File";
import AddFile from "./components/File/AddFile";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/addcustomer" element={<AddCustomer />} />
          <Route exact path="/editcustomer/:id" element={<EditCustomer />} />
          <Route exact path="/files" element={<File />} />
          <Route exact path="/addfile" element={<AddFile />} />

          <Route exact path="*" element={<Home />} />
          <Route
            exact
            path="/auth"
            element={
              localStorage.getItem("token") != null ? (
                <Navigate to="/" />
              ) : (
                <Auth />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
