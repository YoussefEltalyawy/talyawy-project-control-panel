
import React from "react";

export function DashboardHero() {
  return (
    <div className="bg-black/95 text-talyawy-cream pb-16 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start">
        <div className="mb-8 md:mb-0">
          <h1 className="text-7xl sm:text-8xl font-light text-talyawy-beige mb-4">talyawy</h1>
          <p className="text-talyawy-gray text-sm">
            Full-Stack Web Developer & Designer<br />
            Based In Giza, Egypt
          </p>
        </div>
        
        <div className="max-w-lg text-right">
          <p className="text-lg md:text-xl leading-relaxed">
            I craft pixel-perfect web experiences for creators, 
            startups, and entrepreneurs to boost revenue and 
            stand out in a crowded market.
          </p>
        </div>
      </div>
    </div>
  );
}
