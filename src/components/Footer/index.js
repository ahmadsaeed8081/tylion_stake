import React, { useEffect, useState } from "react";
import { TwitterIcon, DiscordIcon, LinkedInIcon } from "../../assets/Icons";

const Footer = () => {
  return (
    <div className="footer-comp bg-themeColor flex flex-col">
      <div className="wrapWidth wrap flex items-center justify-between">
        <h1 className="copy-right">© Copyright 2023</h1>
        <h1 className="slug-txt">
          “The biggest risk of all, is not taking one.”
        </h1>
        <div className="social-icons flex items-center justify-center">
          <a
            href="https://twitter.com/plutus_trade"
            target="_blank"
            className="icon flex items-center justify-center hover:cursor-pointer"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://discord.gg/HhzB37FH85"
            target="_blank"
            className="icon flex items-center justify-center hover:cursor-pointer"
          >
            <DiscordIcon />
          </a>
          <a
            href="https://t.me/plutus_pulsechain"
            target="_blank"
            className="icon flex items-center justify-center hover:cursor-pointer"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
