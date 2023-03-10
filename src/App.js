import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Maps from "./components/Maps/Maps";
import Incidents from "./components/Incidents/Incidents";
import Wellcome from "./components/Wellcome/Wellcome";
import AddIncident from "./components/AddIncident/AddIncident";
import Chatbot from "./components/Chatbot/Chatbot";
import IncidentDetail from "./components/IncidentDetail/IncidentDetail";
import AddEvent from "./components/AddEvent/AddEvent";
import Events from "./components/Events/Events";
import CategoriesNav from "./components/CategoriesNav/CategoriesNav";
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/UpdateUser/:_id" element={<UpdateUser />} />
          <Route path="/wellcome" element={<Wellcome />} />
          <Route path="/addIncident" element={<AddIncident />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/incident/:_id" element={<IncidentDetail />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/events" element={<Events />} />
          <Route path="/maps" element={<Maps/>} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/cate" element={<CategoriesNav />} />
          <Route path="/*" element={<NotFound />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
//v12
export default App;
