import React from 'react';
import { Helmet } from 'react-helmet';

const CustomHead = () => {
  // SVG chef hat icon converted to data URL
  const svgDataUrl = `data:image/svg+xml,%3Csvg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='512' height='512' fill='%23ff6b6b' rx='100' /%3E%3Cpath d='M256 120C205 120 164 151 164 189C164 210 176 229 196 240C196 240 196 270 176 280C176 280 216 280 236 260L236 340L276 340L276 260C296 280 336 280 336 280C316 270 316 240 316 240C336 229 348 210 348 189C348 151 307 120 256 120Z' fill='white' stroke='white' stroke-width='12' /%3E%3Cpath d='M196 240L196 280C196 320 221 340 256 340C291 340 316 320 316 280L316 240' stroke='white' stroke-width='16' /%3E%3C/svg%3E`;

  return (
    <Helmet>
      <title>CuisineX | Modern Recipe Blog</title>
      <link rel="icon" href={svgDataUrl} type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="theme-color" content="#ff6b6b" />
    </Helmet>
  );
};

export default CustomHead; 