import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { showSuccessToast } from "../utils/toastUtil";

const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem('product_access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';

        showSuccessToast("Logged out successfully.");
    };

    let userData = {};
    if (localStorage.getItem('user')) {
        userData = JSON.parse(localStorage.getItem('user'));
    }

    return (
        <>
            <nav className="container px-6 pt-4 pb-2 mx-auto bg-white/8 backdrop-blur-sm border-bottom shadow-md">
                <div className="relative flex gap-4 justify-between items-center mb-2">
                    <Link to={"/"} className="flex gap-2">
                        <h3 className="text-md sm:text-md md:text-xl lg:text-3xl font-bold tracking-tight cursor-pointer animated-logo">
                            Product Management Portal
                        </h3>
                    </Link>
                    <div className="flex items-center gap-4">
                        <h3 className="text-md sm:text-md md:text-lg lg:text-xl md:text-base">Hello, {userData.name}</h3>
                        <button 
                            onClick={() => handleLogout()} 
                            // className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors cursor-pointer"
                        >
                            <span>Logout</span>
                            <IoLogOutOutline style={{ marginTop: "4px" }}/>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Header;