import React, { useState, useEffect } from "react";
import { geoPath, geoMercator } from "d3-geo";
import {extent} from "d3";
import ReactSlider from 'react-slider'
import { filterPrice } from "./filterPrice";

function AirbnbMap(props) {
  const {countries, airbnbs } = props;
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPermanent, setTooltipPermanent] = useState(false);
  const airbnbPriceList = airbnbs.map((d)=> d.price);
  const [priceRange, setPriceRange] = useState(extent(airbnbPriceList))
  const [currentAirbnbs, setCurrentAirbnbs] = useState(airbnbs);
  const projection = geoMercator()
    .scale(200000)
    .translate([427720, 142880]);
  const path = geoPath().projection(projection);
  function mouseEnter (event, airbnb) {
    if (!tooltipPermanent) {
      setTooltip([airbnb, event]);
    }
  };

  const mouseOut = (event) => {
    if (!tooltipPermanent) {
      setTooltip(null);
    }
  };

  const mouseClick = (event) => {
    setTooltipPermanent(true);
    
  };

  const removeTooltip = (event) => {
    setTooltipPermanent(false);
    setTooltip(null);
}
const handleDocumentClick = (event) => {
    if (tooltipPermanent) {
        removeTooltip();
    }
  };
useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
  
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [tooltipPermanent]);
  return (<div>
  <svg id={"map"} width={700} height={700}>
    <g>
      {countries.features.map((d) => (
        <path
          key={d.properties.name}
          d={path(d)}
          stroke={"#ccc"}
          fill={"#eee"}
        ></path>
      ))}
      {currentAirbnbs.map((d) => (
        <circle
          onMouseEnter={(e) => {
            mouseEnter(e, d);}}
          onMouseOut={mouseOut}
          onClick={mouseClick}
          key={d.id}
          cx={projection([d.longitude, d.latitude])[0]}
          cy={projection([d.longitude, d.latitude])[1]}
          r={2}
          fill={"#2a5599"}
        ></circle>
      ))}
      {tooltip && (
        <g>
          <rect
            x={tooltip[1].clientX - 55}
            y={tooltip[1].clientY - 115}
            width="120"
            height="40"
            fill="yellow"
            rx="5"
            ry="5"
          />
          <text
            x={tooltip[1].clientX - 55}
            y={tooltip[1].clientY - 105}
            fill="green"
            className="tooltip-text"
          >
            <tspan>{tooltip[0].name}</tspan>
            <tspan dy="1em">{tooltip[0].price}</tspan>
          </text>
        </g>
      )}
    </g>
    </svg>
    <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    defaultValue={[priceRange[0], priceRange[1]]}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    pearling
    minDistance={10}
    // For some reason, putting priceRange[1] and priceRange[0] causes the track to not move.
    max={999}
    min={30}
    onChange={(price)=>{
        setPriceRange(price);
        setCurrentAirbnbs(filterPrice(airbnbs, priceRange));
    }}
/>
    </div>
  );
}

export { AirbnbMap };
