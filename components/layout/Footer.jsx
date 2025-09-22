export const dynamic = "force-dynamic";

import React from 'react';

import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaGoogle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

export default function Footer() {

  function MyDivider({ width = "[80%]" }) { return <div className={`w-${width} my-3 h-[1px] bg-gray-700`} /> }

  return (
    <div>
      <svg id="wave" style={{ transform: 'rotate(0deg)', transition: '0.3s', marginBottom: "-20px" }} viewBox="0 0 1440 210" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(0, 0, 0, 1)" offset="0%" />
            <stop stopColor="rgba(152.865, 152.865, 152.865, 1)" offset="100%" />
          </linearGradient>
        </defs>
        <path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)" d="M0,0L40,24.5C80,49,160,98,240,101.5C320,105,400,63,480,45.5C560,28,640,35,720,52.5C800,70,880,98,960,115.5C1040,133,1120,140,1200,147C1280,154,1360,161,1440,143.5C1520,126,1600,84,1680,73.5C1760,63,1840,84,1920,87.5C2000,91,2080,77,2160,70C2240,63,2320,63,2400,77C2480,91,2560,119,2640,136.5C2720,154,2800,161,2880,154C2960,147,3040,126,3120,98C3200,70,3280,35,3360,49C3440,63,3520,126,3600,126C3680,126,3760,63,3840,42C3920,21,4000,42,4080,73.5C4160,105,4240,147,4320,154C4400,161,4480,133,4560,101.5C4640,70,4720,35,4800,17.5C4880,0,4960,0,5040,10.5C5120,21,5200,42,5280,70C5360,98,5440,133,5520,133C5600,133,5680,98,5720,80.5L5760,63L5760,210L5720,210C5680,210,5600,210,5520,210C5440,210,5360,210,5280,210C5200,210,5120,210,5040,210C4960,210,4880,210,4800,210C4720,210,4640,210,4560,210C4480,210,4400,210,4320,210C4240,210,4160,210,4080,210C4000,210,3920,210,3840,210C3760,210,3680,210,3600,210C3520,210,3440,210,3360,210C3280,210,3200,210,3120,210C3040,210,2960,210,2880,210C2800,210,2720,210,2640,210C2560,210,2480,210,2400,210C2320,210,2240,210,2160,210C2080,210,2000,210,1920,210C1840,210,1760,210,1680,210C1600,210,1520,210,1440,210C1360,210,1280,210,1200,210C1120,210,1040,210,960,210C880,210,800,210,720,210C640,210,560,210,480,210C400,210,320,210,240,210C160,210,80,210,40,210L0,210Z" />
      </svg>
      <footer className="bg-[black] text-white py-10 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8border-gray-700 pb-10 gap-2">
          <div>
            <h3 className="font-semibold mb-4">Cruises</h3>
            <MyDivider />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/ferry/Makruzz">Makruzz</a></li>
              <li><a href="/ferry/Nautika">Nautika</a></li>
              <li><a href="ferry/Green-Ocean">Green Ocean</a></li>
            </ul>
            <h3 className="mt-8 font-semibold mb-4">Cab Services</h3>
            <MyDivider />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/cabs/Cabs-In-Port-Blair">Cabs in Port Blair</a></li>
              <li><a href="/cabs/Cabs-In-Havelock">Cabs in Havelock Island</a></li>
              <li><a href="/cabs/Cabs-In-Neil">Cabs in Neil Island</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Packages</h3>
            <MyDivider />
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/package/Andaman-Adventure-Packages/Explore-Andaman-04-Nights-05-Days">Andaman Adventure (4 Nights 5 Days)</a></li>
              <li><a href="/package/Andaman-Family-Packages/Adventure-Andaman-03-Nights-04-Days">Andaman Family (3 Nights 4 Days)</a></li>
              <li><a href="/package/Andaman-Family-Packages/Emerald-Andaman-05-Nights-06-Days">Andaman Family (5 Nights 6 Days)</a></li>
              <li><a href="/package/Andaman-Budget-Packages/Incredible-Andaman-05-Nights-06-Days">Andaman Budget (5 Nights 6 Days)</a></li>
              <li><a href="/package/Andaman-Honeymoon-Packages/Honeymoon-Andaman-06-Nights-07-Days">Andaman HoneyMoon (6 Nights 7 Days)</a></li>
              <li><a href="/package/Andaman-Honeymoon-Packages/Bliss-Andaman-04-Nights-05-Days">Andaman HoneyMoon (4 Nights 5 Days)</a></li>
              <li><a href="/package/Andaman-Honeymoon-Packages/Amazing-Andaman-03-Nights-04-Days">Andaman HoneyMoon (3 Nights 4 Days)</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Activities</h3>
            <MyDivider />
            <ul className="space-y-2 text-sm text-gray-400 px-2">
              <li><a className='line-clamp-1' href="/activities/Dinner-Cruise-at-Havelock-Island__Dinner-Cruise">Dinner Cruise at Havelock Island</a></li>
              <li><a className='line-clamp-1' href="/activities/Bella-Bay-Luxury-Dinner-Cruise-at-Port-Blair__Dinner-Cruise">Bella Bay Luxury Dinner Cruise at Port Blair</a></li>
              <li><a className='line-clamp-1' href="/activities/Light-and-Sound-Show-at-Cellular-Jail__Light-and-Sound-Show">Light And Sound Show at Cellular Jail</a></li>
              <li><a className='line-clamp-1' href="/activities/Light-and-Sound-show-at-Ross-Island__Light-and-Sound-Show">Light and Sound show at Ross Island</a></li>
              <li><a className='line-clamp-1' href="/activities/Andaman-Dolphin-Glass-Boat-Ride-at-North-Bay-Coral-Island__Glass-Bottom-Boat">Andaman Dolphin Glass Boat Ride at North Bay Coral Island</a></li>
              <li><a className='line-clamp-1' href="/activities/Coral-Safari-Semi--Submarine-Glass-Boat-Ride-at-North-Bay-Coral-Island__Glass-Bottom-Boat">Coral Safari Semi- Submarine Glass Boat Ride at North Bay Coral Island</a></li>
              <li><a className='line-clamp-1' href="/activities/Reef-Looker-Semi--Submarine-Glass-Boat-Ride-at-Elephant-Beach__Glass-Bottom-Boat">Reef Looker Semi- Submarine Glass Boat Ride at Elephant Beach</a></li>
              <li><a className='line-clamp-1' href="/activities/Nemo-Semi-Submarine-at-Havelock__Glass-Bottom-Boat">Nemo Semi Submarine at Havelock</a></li>
              <li><a className='line-clamp-1' href="/activities/Under-Water-Scooter-in-Andaman__Under-Water-Scooter-in-Andaman">Under Water Scooter in Andaman</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact with Us</h3>
            <MyDivider />
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><FaPhoneAlt className="mt-1" /> +91 99332 37775 | +91 9933263867</li>
              <li className="flex items-start gap-2"><FaWhatsapp className="mt-1" /> WhatsApp: +91 99332 37775 | +91 9933263867</li>
              <li className="flex items-start gap-2"><FaEnvelope className="mt-1" /> enquiryandamancabs@gmail.com</li>
              <li className="flex items-start gap-2"><FaMapMarkerAlt size={40} className="mt-1" /> Shop No. 01, Pulikeezu Bhavan Bargat Line, near juvenile home, DRDO TRANSIT, Nayagaon, Port Blair, Andaman and Nicobar Islands 744106</li>
            </ul>

            <div className="mt-5 flex items-center gap-4">
              <p className="uppercase font-semibold text-sm">Follow Us</p>
              <div className="flex items-center gap-3">
                <a href="https://share.google/FcT40x72ZqMzqgi8P" target="_blank">
                  <FaGoogle size={25} className="text-red-600" />
                </a>

                <a href="https://www.facebook.com/andamancabsservices" target="_blank">
                  <FaFacebookF size={25} className="text-blue-500" />
                </a>

                <a href="https://www.instagram.com/andamancabs/" target="_blank">
                  <FaInstagram size={25} className="text-pink-500" />
                </a>

                <a href="https://www.youtube.com/@andamancabs" target="_blank" >
                  <FaYoutube size={25} className="text-red-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='w-full flex justify-center'>
          <MyDivider width='full' />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-sm text-gray-500">

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 border border-gray-500 px-2 py-1 rounded">English <IoIosArrowDown /></button>
            <button className="flex items-center gap-1 border border-gray-500 px-2 py-1 rounded">INR <IoIosArrowDown /></button>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Content Disclaimer</a> |
            <a href="#" className="hover:text-white">Terms and Conditions</a> |
            <a href="#" className="hover:text-white">Privacy</a> |
            <span>© 2023 to 2025 Andaman Cabs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
