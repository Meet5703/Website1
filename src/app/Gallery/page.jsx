"use client";
import React, { useState } from "react";
import "./PhotoGallery.css";
import GalleryCrousel from "./photoCrousel";
import Image from "next/image";

const Gallery = () => {
  const [columns, setColumns] = useState([[], [], []]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    // Find the column with the least number of images
    const minColumnIndex = columns.reduce((minIndex, column, currentIndex) => {
      return column.length < columns[minIndex].length ? currentIndex : minIndex;
    }, 0);

    // Add the image URL to the column with the least number of images
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[minColumnIndex] = [...newColumns[minColumnIndex], imageUrl];
      return newColumns;
    });
  };

  return (
    <div>
      <h1 className="w-full text-center text-5xl mb-20 font-semi-bold font-serif">
        Image Gallery
      </h1>
      <GalleryCrousel className="mb-10" />
      <div className="body">
        <div className="container">
          <div className="row" style={{ display: "flex" }}>
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="col"
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                {column.map((image, imageIndex) => (
                  <Image
                    key={imageIndex}
                    width={1000}
                    height={1000}
                    src={image}
                    alt={`Image ${imageIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "10px"
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                // disabled="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
