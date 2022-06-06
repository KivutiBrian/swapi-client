import { useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import './App.css';

// import components
import People from "./pages/People"
import Auth from "./pages/Auth"
import Person from "./pages/Person"
import ProtectedRoutes from "./ProtectedRoutes";

function App() {

  useEffect(() => {
    localStorage.setItem("loggedIn", false)
  }, [])
  

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<People />} />
          <Route path="/person/:name" element={<Person />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
