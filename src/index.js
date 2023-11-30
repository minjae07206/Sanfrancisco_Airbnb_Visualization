import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import "./styles.css";
import { AirbnbMap } from "./airbnbMap";
import { AirbnbBar } from "./airbnbBar";

const csvUrl = '/final.csv';
// Credits: 'https://cartographyvectors.com/map/627-san-francisco-ca'
const mapUrl = '/san-francisco-ca_.geojson';
const a = 1;
const b = 1;
function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.price = d.price.replace(/[^0-9.-]/g, '');
                d.price = parseFloat(d.price)
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}


function Main(){
    const airbnbs = useData(csvUrl);
    const map = useMap(mapUrl);
    
    if (!map || !airbnbs) {
        return <pre>Loading...</pre>;
    };
    //let airlines = groupByAirline(routes);
    //let airports = groupByAirport(routes);
    // console.log(airlines);
    // console.log(airports);
    // console.log(routes);
    return <div>
                <h1>Get the best deal for your Airbnb</h1>
                <h2>Map of Sanfrancisco with Airbnbs</h2>
                <AirbnbMap countries={map} airbnbs={airbnbs}></AirbnbMap>
                
                <AirbnbBar airbnbs={airbnbs}></AirbnbBar>
            </div>
}

ReactDOM.render(<Main/ >, document.getElementById("root")); 