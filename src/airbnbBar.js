import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis, XAxis2, YAxis2 } from "./axes";


function AirbnbBar_price (props) {
    const { offsetX, offsetY, height, width, data, selectedAirbnbID, setSelectedAirbnbID } = props;



    // Define the xScale using price for the horizontal axis
    const xScale = scaleLinear()
        .domain([0, max(data.map(d => d.price))]) // Use the maximum price as the upper limit
        .range([0, width])
        .nice();

    // Define the yScale using neighbourhood for the vertical axis
    const yScale = scaleBand()
        .domain(["Airbnb", "Average of Airbnb"])
        .range([0, height])
        .padding(0.1);

    // // Define a function to determine the color for each bar
    // const color = (d) => {
    //     return d.id === selectedAirbnbID ? "#992a5b" : "#2a5599";
    // };

    // // Define a function to handle mouse over event
    // const onMouseOver = (d) => {
    //     setSelectedAirbnbID(d.id);
    // };

    // // Define a function to handle mouse out event
    // const onMouseOut = () => {
    //     setSelectedAirbnbID(null);
    // };

    const firstNeighborhoodData = data[0];
    const secondNeighborhoodData = data[1];


    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* X and Y axes components */}
            <XAxis xScale={xScale} width={width} height={height}></XAxis>
            <YAxis yScale={yScale} height={height} offsetX={offsetX}></YAxis>
            <rect
                key={"bar1"}  // Unique key for the first rect
                x={yScale(firstNeighborhoodData.neighbourhood)}
                y={72}
                height={30}
                width={xScale(firstNeighborhoodData.price)}
                stroke={"#2a5599"}
            />

            <rect
                key={"bar2"}  // Unique key for the second rect
                x={yScale(secondNeighborhoodData.neighbourhood)}
                y={220}
                height={xScale(secondNeighborhoodData.price)}
                width={yScale.bandwidth()}
                stroke={"#2a5599"}
            />
        </g>
    );
    

}

export {AirbnbBar_price}


function AirbnbBar_overall_rating (props) {
    const { offsetX, offsetY, height, width, data, selectedAirbnbID, setSelectedAirbnbID } = props;

    // Define the xScale using price for the horizontal axis
    const xScale = scaleLinear()
        .domain([70, max(data.map(d => d.overall_rating))]) // Use the maximum price as the upper limit
        .range([0, width])
        .nice();

    // Define the yScale using neighbourhood for the vertical axis
    const yScale = scaleBand()
        .domain(["Airbnb", "Average of Airbnb"])
        .range([0, height])
        .padding(0.1);

    // // Define a function to determine the color for each bar
    // const color = (d) => {
    //     return d.id === selectedAirbnbID ? "#992a5b" : "#2a5599";
    // };

    // // Define a function to handle mouse over event
    // const onMouseOver = (d) => {
    //     setSelectedAirbnbID(d.id);
    // };

    // // Define a function to handle mouse out event
    // const onMouseOut = () => {
    //     setSelectedAirbnbID(null);
    // };

    const firstNeighborhoodData = data[0];
    const secondNeighborhoodData = data[1];


    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* X and Y axes components */}
            <XAxis xScale={xScale} width={width} height={height}></XAxis>
            <YAxis yScale={yScale} height={height} offsetX={offsetX}></YAxis>
            <rect
                key={"bar1"}  // Unique key for the first rect
                x={yScale(firstNeighborhoodData.neighbourhood)}
                y={72}
                height={30}
                width={xScale(firstNeighborhoodData.overall_rating)}
                stroke={"#2a5599"}
            />

            <rect
                key={"bar2"}  // Unique key for the second rect
                x={yScale(secondNeighborhoodData.neighbourhood)}
                y={220}
                height={30}
                width={xScale(secondNeighborhoodData.overall_rating)}
                stroke={"#2a5599"}
            />
            
        </g>
    );
    

}

export {AirbnbBar_overall_rating}




function AirbnbBar_indivdual_rating (props) {
    const { offsetX, offsetY, height, width, data, selectedAirbnbID, setSelectedAirbnbID } = props;

    // Define the xScale using price for the horizontal axis
    const xScale = scaleLinear()
        .domain([7, max(data.map(d => d.review_checking))]) // Use the maximum price as the upper limit
        .range([0, width])
        .nice();

    // Define the yScale using neighbourhood for the vertical axis
    const yScale = scaleBand()
        .domain(["1", "2", "3", "4", "5"])
        .range([0, height])
        .padding(0.1);

    // // Define a function to determine the color for each bar
    // const color = (d) => {
    //     return d.id === selectedAirbnbID ? "#992a5b" : "#2a5599";
    // };

    // // Define a function to handle mouse over event
    // const onMouseOver = (d) => {
    //     setSelectedAirbnbID(d.id);
    // };

    // // Define a function to handle mouse out event
    // const onMouseOut = () => {
    //     setSelectedAirbnbID(null);
    // };

    const firstNeighborhoodData = data[0];
    const secondNeighborhoodData = data[1];
    const thirdNeighborhoodData = data[2];
    const fourthNeighborhoodData = data[3];
    const fifthNeighborhoodData = data[4];


    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* X and Y axes components */}
            <XAxis xScale={xScale} width={width} height={height}></XAxis>
            <YAxis yScale={yScale} height={height} offsetX={offsetX}></YAxis>
            <rect
                key={"bar1"}  // Unique key for the first rect
                x={yScale(firstNeighborhoodData.neighbourhood)}
                y={72}
                height={30}
                width={xScale(firstNeighborhoodData.overall_rating)}
                stroke={"#2a5599"}
            />

            <rect
                key={"bar2"}  // Unique key for the second rect
                x={yScale(secondNeighborhoodData.neighbourhood)}
                y={220}
                height={30}
                width={xScale(secondNeighborhoodData.overall_rating)}
                stroke={"#2a5599"}
            />
            
        </g>
    );
    

}

export {AirbnbBar_indivdual_rating}

