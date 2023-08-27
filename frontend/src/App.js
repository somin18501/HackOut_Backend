import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, AllocationPage } from "./pages";
import { UserContextProvider } from "./UserContext";
import { AddHospital, AddLaboratory, AddMedicalStore } from "./pages/AddingForms";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/allocation' element={<AllocationPage  />} />
          <Route path="/addhospital" element={<AddHospital />} />
          <Route path="/addlab" element={<AddLaboratory />} />
          <Route path="/addmedical" element={<AddMedicalStore/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
