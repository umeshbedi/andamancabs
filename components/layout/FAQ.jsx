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
    label: <p className='font-bold'>This is panel header 1</p>,
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: <p className='font-bold'>This is panel header 2</p>,
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: <p className='font-bold'>This is panel header 3</p>,
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: <p className='font-bold'>This is panel header 3</p>,
    children: <p>{text}</p>,
  },
  
];
export default function FAQ({isImage = true, padding = 'px-[5%]'}) {
  return (
    <div className={`faqclass bg-gray-50 w-full sm:flex justify-center mb-12 ${padding}`}>
  {isImage && (
    <div className='relative w-full h-full'>
      <img
      src="/img/icons/faq.avif"
      alt="FAQ Image"
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