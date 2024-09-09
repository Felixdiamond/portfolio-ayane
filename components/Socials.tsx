import { socialMedia } from "@/data";
import Image from "next/image";

const Socials = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center w-full pb-10">
      <p className="flex items-center justify-center md:text-base text-sm md:font-normal font-light mb-4 md:mb-0">
        Copyright © 2024 Felix
      </p>
      <div className="flex items-center md:gap-3 gap-6">
        {socialMedia.map((profile) => (
          <div
            key={profile.id}
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            onClick={() => window.open(profile.link, "_blank")}
          >
            <Image
              src={profile.img}
              alt="social profile"
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socials;