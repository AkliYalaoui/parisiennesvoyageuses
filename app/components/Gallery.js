import React from "react";
import Image from "next/image";

const Gallery = () => {
  return (
    <section>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-950 text-center mb-8">
          Our best shots
        </h2>
        <div className="bg-orange-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
            {[1,2,3,4,5,6,7,8,9,10].map(n =>
            <div key={n} className={`${n == 2 || n == 6 ? "row-span-2" : ""}`}>
                <Image  src={`/gallery/g${n}.jpg`} alt="best shots" className="h-full w-full object-cover rounded-lg shadow-md hover:scale-110" height="500" width="1000"/>
            </div>
            )}
        </div>
    </section>
  );
};

export default Gallery;
