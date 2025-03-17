
import { FaFacebookF, FaYoutube , FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../share/Logo";
import { Link } from "react-router";

const Footer = () => {


    return (
        <footer className="bg-gradient-to-tr from-[#171339] via-[#0B0C26] to-[#020617] py-10 overflow-hidden">
        
            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
                    {/* Website Info */}
                    <div>
                        
                        <div className="flex justify-center md:justify-start">
                            <Logo></Logo>
                        </div>

                        <p className="mt-4 text-sm text-gray-400">
                        8 May 2024 Pro  Academy  started From the beginning, our goal was to develop the educated unemployed of the country completely free of cost. And provide guaranteed jobs. Now we are moving forward with this goal. Initially, we started with about 150 students, but some students were serious and in the end, Pro  Academy  was able to arrange their jobs and internships. Thank you all for being with us.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="text-gray-400">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a className="hover:text-blue-500">
                                    Support@Pro  Academy .com
                                </a>
                            </li>
                            <li>
                                <p className="hover:text-blue-500">01764984545 (Whatsapp)</p>
                                <p className="hover:text-blue-500">(Available : 10:00am to 07:00pm)</p>
                            </li>
                        </ul>
                    </div>

                    {/* important link */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Important Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to={'/'} className="hover:text-blue-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-blue-500">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <Link to={'/privacy-policy'} className="hover:text-blue-500">Privacy & Terms</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                        <ul className="mt-4 flex justify-center md:justify-start space-x-4">
                        <li>
                            <a
                            href="https://www.facebook.com/profile.php?id=61555467427663"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500"
                            >
                            <FaFacebookF size={24} />
                            </a>
                        </li>
                        <li>
                            <a
                            href="https://www.youtube.com/@proacdemy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500"
                            >
                            <FaYoutube size={24} />
                            </a>
                        </li>
                        <li>
                            <a
                            href="https://www.instagram.com/Pro  Academy ?igsh=bnVzMzZvMTJ4ZzFz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500"
                            >
                            <FaInstagram size={24} />
                            </a>
                        </li>
                        <li>
                            <a
                            href="https://www.linkedin.com/company/saidee-hasan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500"
                            >
                            <FaLinkedin size={24} />
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8"></div>

                {/* Bottom Section */}
                <div className="text-center mt-4 text-sm">
                    <p>Copyright ©2025 Pro  Academy  | All Rights Reserved</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer
