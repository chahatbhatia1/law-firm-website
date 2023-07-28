import React from "react";
import logo from "../assets/logo-law-firm.jpeg";
import { Link, useMatch } from "react-router-dom";


const Header = () => {
    const homeMatch = useMatch('/');
    const hireLawyersMatch = useMatch('/hire-lawyers');
    const aboutMatch = useMatch('/about');
    const contactMatch = useMatch('/contact');

	return (
		<div className="flex justify-between shadow-md">
            <Link to="/">
                <div className="flex">
                    <img src={logo} alt="company-logo" className="w-[80px] h-auto" />
                    <span className="block self-center font-bold w-20">Law Firm</span>
                </div>
            </Link>
			<ul className="flex self-center align-middle mr-10">
				<li className={`mx-6 rounded-md ${homeMatch ? "bg-gray-200 hover:bg-none" : "hover:bg-gray-100"}`}>
					<Link to="/" className="block p-3">Home</Link>
				</li>
				<li className={`mx-6 rounded-md ${hireLawyersMatch ? "bg-gray-200 hover:bg-none" : "hover:bg-gray-100"}`}>
					<Link to="/hire-lawyers" className="block p-3">Hire Lawyers</Link>
				</li>
				<li className={`mx-6 rounded-md ${aboutMatch ? "bg-gray-200 hover:bg-none" : "hover:bg-gray-100"}`}>
					<Link to="/about" className="block p-3">About Us</Link>
				</li>
				<li className={`mx-6 rounded-md ${contactMatch ? "bg-gray-200 hover:bg-none" : "hover:bg-gray-100"}`}>
					<Link to="/contact" className="block p-3">Contact Us</Link>
				</li>
			</ul>
		</div>
	);
};

export default Header;
