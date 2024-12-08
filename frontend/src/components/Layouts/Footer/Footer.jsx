import { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarsIcon from '@mui/icons-material/Stars';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';



const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
     
          {/* <!-- footer ends --> */}

          <div className="px-16 py-6 w-full bg-primary-darkBlue hidden sm:flex justify-between items-center text-sm text-white">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <span className="text-yellow-400"><WorkIcon sx={{ fontSize: "20px" }} /></span> Sell On Bazaar
            </a>
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <span className="text-yellow-400"><StarsIcon sx={{ fontSize: "20px" }} /></span> Advertise
            </a>
            <a href="/" rel="noreferrer" target="_blank" className="flex items-center gap-2">
              <span className="text-yellow-400"><CardGiftcardIcon sx={{ fontSize: "20px" }} /></span> Gift Cards
            </a>
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <span className="text-yellow-400"><HelpIcon sx={{ fontSize: "20px" }} /></span> Help Center
            </a>

            <span>&copy; 2007-{new Date().getFullYear()} Bazaar.com</span>
            <img draggable="false" src={paymentMethods} alt="Card Payment" />
          </div>
        </>
      )};
   
  

export default Footer;
