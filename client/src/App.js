import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Donate from "./pages/Donate";
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Team from "./pages/admin/Team";
import ManagePets from "./pages/admin/ManagePets";
import Messages from "./pages/admin/Messages";
import AdoptionForms from "./pages/admin/AdoptionForms";
import Donations from "./pages/admin/Donations";
import CatProfile from "./pages/CatProfile";
import Account from "./pages/admin/Account";
import AdoptionForm from "./components/AdoptionForm";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pets" element={<Pets />} />
            <Route path="/pets/:name" element={<CatProfile />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="donate" element={<Donate />} />
            <Route path="/form/choose/:choose" element={<AdoptionForm />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/cadmin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="pets" element={<ManagePets />} />
            <Route path="messages" element={<Messages />} />
            <Route path="forms" element={<AdoptionForms />} />
            <Route path="donations" element={<Donations />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
