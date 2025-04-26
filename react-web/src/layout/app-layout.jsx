import { Outlet } from "react-router-dom";

import Header from "../components/header";

const AppLayout = () => {
    return (
        <div className="bg-white text-black min-h-screen">
            
            <Header />
            
            <div className="container px-4 py-2 mx-auto">

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default AppLayout;