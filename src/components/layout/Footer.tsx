import { PiCode } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 md:py-12 mt-4 h-fit">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-start">
        <div className="w-[90%] mx-auto text-justify md:w-[50%]">
          <h1 className="text-lg md:text-3xl font-semibold text-white">AgroWorld</h1>
          <p className="text-gray-100 text-sm md:text-base mt-2 md:mt-4">
            We are dedicated to connecting farmers and service providers with
            the best agricultural equipment on the market. Whether you need to
            rent or purchase, we make sure you get the right tools for the job.
          </p>
        </div>

        <div className="w-[90%] mx-auto md:w-[18%] mt-8 md:mt-0">
          <h2 className="text-xl font-semibold mb-2 md:mb-4">Quick Links</h2>
          <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-100 ml-3">
            <li>
              <a href="/" className="hover:text-yellow-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/articles" className="hover:text-yellow-300 transition">
                Articles
              </a>
            </li>
            <li>
              <a href="/equipments" className="hover:text-yellow-300 transition">
                Equipments
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 flex justify-between px-[4%]">
        <p className="text-sm md:text-base text-gray-200">
          &copy; {new Date().getFullYear()} AgriWorld. All Rights Reserved.
        </p>
        <a
          href="https://www.linkedin.com/in/vikas-ipar/"
          target="_blank"
          className="flex items-center space-x-1 text-green-100"
        >
          <PiCode className="text-xl" /> <span className="text-sm">ipar</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
