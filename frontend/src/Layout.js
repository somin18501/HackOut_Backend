import { Outlet } from "react-router-dom";
import { MyNavbar, Footer } from "./components";

export default function Layout(){
    return (
        <div className="flex flex-col min-h-screen bg-gray-800">
            <MyNavbar />
            <Outlet />
            <Footer />
        </div>
    );
}