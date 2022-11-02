import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { useDownloadImage } from "../hooks";

export default function Home() {
  const [images, setImages] = useState([]);
  const { download } = useDownloadImage();

  return (
    <div className="container">
      <Head>
        <title>D&D Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input
          accept="image/*"
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setImages((prev) => [
              ...prev,
              ...files.map((file) => URL.createObjectURL(file)),
            ]);
          }}
        />
        <div className="grid">
          {images.map((image) => (
            <div className="image-to-download" key={image}>
              <Image alt={image} style={{ height: 350 }} src={image} />
              <div
                style={{
                  width: "100%",
                  height: "30px",
                  backgroundColor: "black",
                }}
              />
              <Image
                alt={image}
                style={{
                  height: 350,
                  transform: "scaleX(-1) rotateZ(180deg)",
                }}
                src={image}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            Array.from(
              document.body.getElementsByClassName("image-to-download")
            ).forEach((image) => download(image));
          }}
        >
          Download All
        </button>
      </main>
    </div>
  );
}
