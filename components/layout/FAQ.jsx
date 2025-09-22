import React from 'react';
import { Collapse } from 'antd';
import Image from 'next/image';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: '1',
    label: <p className='font-bold'>1. Is Cab will be available all the time?</p>,
    children: <p>Yes, you can book cab all the time 1 Hours prior to the Start time and for Out Station like Baratang Island and Diglipur Island you have to book at least 12 hours prior.</p>,
  },
  {
    key: '2',
    label: <p className='font-bold'>2. How can I book a cab?</p>,
    children: <p>You can book a cab through our website or by calling our customer support at Contact- +91 99332 37775 | +91 9933263867 same For WhatsApp also
      Email- enquiryandamancabs@gmail.com or by visiting our office. Advance bookings are recommended for guaranteed availability.</p>,
  },
  {
    key: '3',
    label: <p className='font-bold'>3. What types of vehicles do you offer?</p>,
    children: <p>We provide a wide range of vehicles – from Xylo, Ertiga, Rumion, Innova, tempo travelers, Bus– depending on your travel needs.</p>,
  },
  {
    key: '4',
    label: <p className='font-bold'>4. Do I need to pay in advance?</p>,
    children: <p>If you book a package you can do advance for it, but if you book a pick and drop services for that you have to pay whole for the services to confirm your booking.</p>,
  },
  {
    key: '5',
    label: <p className='font-bold'>5. What do i get with the Cab services?</p>,
    children: <p>You get experienced travel assistant for the trip will be available on call.</p>,
  },
  {
    key: '6',
    label: <p className='font-bold'>6. Are your cabs available for outstation trips?</p>,
    children: <p>Yes, we provide both local, Baratang and for Diglipur also.</p>,
  },
  {
    key: '7',
    label: <p className='font-bold'>7. Can I cancel my booking?</p>,
    children: <p>Yes, you can cancel your booking. Cancellations made 24 hours before the trip get a refund (only the tax amount will be deducted). For more details visit our cancellation policy page.</p>,
  },
  {
    key: '8',
    label: <p className='font-bold'>8. What payment methods do you accept?</p>,
    children: <p>We accept cash, UPI, debit/credit cards, and online bank transfers. But through website you need to do UPI or by your debit card and credit card.</p>,
  },
  {
    key: '9',
    label: <p className='font-bold'>9. Are your drivers licensed and experienced?</p>,
    children: <p>Absolutely. All our drivers are well-trained, licensed, and experienced in local as well as outstation travel.</p>,
  },
  {
    key: '10',
    label: <p className='font-bold'>10. How many years of experience do the drivers have?</p>,
    children: <p>More than 7 years each driver is working in this company. Don't Worry you are in safe hands.</p>,
  },

];
export default function FAQ({ isImage = true, padding = 'px-[5%]' }) {
  return (
    <div className={`faqclass bg-[#f9f9f9] py-5 w-full sm:flex gap-3 justify-center mb-12 ${padding}`}>
      {isImage && (
        <div className='relative w-full h-full mt-10 sm:mr-5'>
          <img
            src="/img/icons/faq.png"
            alt="FAQ Image"
            loading='lazy'
            className="object-contain w-full ha-auto"
          />
        </div>
      )}

      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={['1']}
        style={{
          width: '100%',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          fontSize: '1rem',
        }}
      />
    </div>

  );
}