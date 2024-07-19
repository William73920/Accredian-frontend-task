import { useState } from "react";
import PopupForm from "./components/Popupform";
import hero from "./assets/hero.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  return (
    <div className="relative bg-white text-black py-20 min-h-screen">
      <div className="container mx-auto px-4 flex flex-col justify-center lg:flex-row items-center text-center lg:text-left">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Refer Someone</h1>
          <p className="text-lg mb-8">
            Help us spread the word by referring someone you know!
            <br />
            Get a chance to win an amazing gift!
          </p>
          <button
            onClick={handleOpenPopup}
            className="inline-block bg-yellow-500 w-2/3  md:w-1/3 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 max-sm:mx-auto max-lg:mx-auto xs:mx-auto"
          >
            Refer Someone
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={hero} className="w-full h-auto" alt="Hero" />
        </div>
        <PopupForm isOpen={isPopupOpen} onClose={handleClosePopup} />

        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
      </div>
    </div>
  );
}

export default App;
