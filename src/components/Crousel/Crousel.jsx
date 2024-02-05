"use client";
/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "flowbite-react";
import img1PC from "../../assets/Bholaacover-image1.png";
import img2PC from "../../assets/Pathaan-cover-news.png";
import img3PC from "../../assets/Welcome-Hindi.jpg";
import img1M from "../../assets/bholam.jpg";
import img2M from "../../assets/ptnm.jpg";
import img3M from "../../assets/wlb.jpg";
import Image from "next/image";

function CrouselComp() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {/* Slide 1 */}
        <div>
          {/* For PC */}
          <Image
            className="hidden md:block w-full"
            src={img1PC}
            alt="Slide 1 PC"
            width={1000}
            height={1000}
          />
          {/* For Mobile */}
          <Image
            className="block md:hidden w-full"
            src={img1M}
            alt="Slide 1 Mobile"
            width={1000}
            height={1000}
          />
        </div>

        {/* Slide 2 */}
        <div>
          {/* For PC */}
          <Image
            className="hidden md:block w-full"
            src={img2PC}
            alt="Slide 2 PC"
            width={1000}
            height={1000}
          />
          {/* For Mobile */}
          <Image
            className="block md:hidden w-full"
            src={img2M}
            alt="Slide 2 Mobile"
            width={1000}
            height={1000}
          />
        </div>

        {/* Slide 3 */}
        <div>
          {/* For PC */}
          <Image
            className="hidden md:block w-full"
            src={img3PC}
            alt="Slide 3 PC"
            width={1000}
            height={1000}
          />
          {/* For Mobile */}
          <Image
            className="block md:hidden w-full"
            src={img3M}
            alt="Slide 3 Mobile"
            width={1000}
            height={1000}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default CrouselComp;
