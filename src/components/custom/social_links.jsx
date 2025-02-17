/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaTwitter,
  FaTiktok,
  FaInstagram,
  FaDiscord,
  FaSpotify,
  FaXbox,
  FaFacebook,
} from "react-icons/fa";

export const SocialIcon = ({ name }) => {
  const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    email: FaEnvelope,
    twitter: FaTwitter,
    tiktok: FaTiktok,
    instagram: FaInstagram,
    discord: FaDiscord,
    spotify: FaSpotify,
    xbox: FaXbox,
    facebook: FaFacebook,
  };

  const Icon = iconMap[name.toLowerCase()] || FaEnvelope;
  return <Icon className="w-6 h-6" />;
};

export const SocialLinks = ({ links, className = "" }) => {
  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      {links.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="c-cursor-pointer text-gray-600 hover:text-primary transition-colors"
          title={social.name}
        >
          <SocialIcon name={social.icon} />
        </a>
      ))}
    </div>
  );
};
