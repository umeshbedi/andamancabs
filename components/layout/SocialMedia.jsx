"use client"
import React from 'react'
import { FaInstagram } from 'react-icons/fa';

export default function SocialMedia() {
const profiles = [
    { id: 1, imgSrc: '/uploads/cruise-photos/11360.jpg', instagramUrl: 'https://instagram.com/person1' },
    { id: 2, imgSrc: '/uploads/cruise-photos/27811.jpg', instagramUrl: 'https://instagram.com/person2' },
    { id: 3, imgSrc: '/uploads/cruise-photos/28076.jpg', instagramUrl: 'https://instagram.com/person3' },
    { id: 4, imgSrc: '/uploads/cruise-photos/11360.jpg', instagramUrl: 'https://instagram.com/person4' },
    { id: 5, imgSrc: '/uploads/cruise-photos/11360.jpg', instagramUrl: 'https://instagram.com/person5' },
    { id: 6, imgSrc: '/uploads/cruise-photos/11360.jpg', instagramUrl: 'https://instagram.com/person6' },
];

return (
    <div className="social-media-grid mt-8 mb-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {profiles.map((profile) => (
            <a
                key={profile.id}
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-item"
            >
                <img loading='lazy' src={profile.imgSrc} alt={`Profile ${profile.id}`} className="social-media-image" />
                <div className="overlay">
                    <FaInstagram className="instagram-icon" size={30} color='white'/>
                </div>
            </a>
        ))}
        <style jsx>{`
            .social-media-grid {
                display: grid;
                
            }
            .social-media-item {
                position: relative;
                overflow: hidden;
                cursor: pointer;
            }
            .social-media-image {
                width: 100%;
                height: auto;
                display: block;
            }
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(225, 48, 108, 0.7); /* Instagram gradient color */
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .social-media-item:hover .overlay {
                opacity: 1;
            }
        `}</style>
    </div>
);
  
}
