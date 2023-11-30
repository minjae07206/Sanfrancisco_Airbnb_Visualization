import React, { useState, useEffect } from "react";
import { geoPath, geoMercator } from "d3-geo";
import {extent} from "d3";
import ReactSlider from 'react-slider'
import { filterPrice } from "./filterPrice";

function AirbnbMap(props) {
  const {countries, airbnbs } = props;
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPermanent, setTooltipPermanent] = useState(false);
  const airbnbPriceList = airbnbs.map((d)=> {
    return d.price
  });
  const [priceRange, setPriceRange] = useState(extent(airbnbPriceList))
  console.log(priceRange)
  const [currentAirbnbs, setCurrentAirbnbs] = useState(airbnbs);
  const projection = geoMercator()
    .scale(200000)
    .translate([427720, 142880]);
  const path = geoPath().projection(projection);
  function mouseEnter (event, airbnb) {
    console.log(event)
    if (!tooltipPermanent) {
      event.target.classList.add("selected-circle")
      setTooltip([airbnb, event]);
    }
  };

  const mouseOut = (event) => {
    if (!tooltipPermanent) {
      event.target.classList.remove("selected-circle")
      setTooltip(null);
    }
  };

  const mouseClick = (event) => {
    event.target.classList.add("selected-circle")
    setTooltipPermanent(true);
    
  };

  const removeTooltip = (event) => {
    const target = document.querySelector('.selected-circle')
    target.classList.remove("selected-circle")
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
          r={3}
          fill={"#6CB4EE"}
        ></circle>
      ))}
      
    </g>
    </svg>
    {tooltip && (
      <div className={'tooltip-container'} style={{left: tooltip[1].screenX - 80, top: tooltip[1].screenY - 50}}>
        <div className="tooltip-text">
          <div>{tooltip[0].name}</div>
          <div>Price: ${tooltip[0].price}.00</div>
      </div>
      </div>
      )}
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
    max={1800}
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
