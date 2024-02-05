"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";

function GalleryCrousel() {
  return (
    <div className="h-56  md:px-40 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel
        onSlideChange={(index) => console.log("onSlideChange()", index)}
      >
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          <Image
            width={1000}
            height={1000}
            src="https://www.voxco.com/wp-content/uploads/2021/04/Population-vs-Sample-cvr.jpg"
            alt=""
          />
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          <Image
            width={1000}
            height={1000}
            src="https://www.voxco.com/wp-content/uploads/2021/04/pasted-image-0-46.png"
            alt=""
          />
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          <Image
            width={1000}
            height={1000}
            src="https://www.simplypsychology.org/wp-content/uploads/Sample-Target-Population.jpeg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}
export default GalleryCrousel;
