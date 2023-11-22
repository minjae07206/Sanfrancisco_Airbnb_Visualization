import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import "./styles.css";
import { AirbnbMap } from "./airbnbMap";
import { AirbnbBar } from "./airbnbBar";

const csvUrl = '/final.csv';
// Credits: 'https://cartographyvectors.com/map/627-san-francisco-ca'
const mapUrl = '/san-francisco-ca_.geojson';
const a;
function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                console.log(d)
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
    // const [selectedAirline, setSelectedAirline]=React.useState(null);
    const routes = useData(csvUrl);
    const map = useMap(mapUrl);
    
    if (!map || !routes) {
        return <pre>Loading...</pre>;
    };
    //let airlines = groupByAirline(routes);
    //let airports = groupByAirport(routes);
    // console.log(airlines);
    // console.log(airports);
    // console.log(routes);
    return <div>
                <h1>Sanfrancisco Airbnb</h1>
                <AirbnbMap></AirbnbMap>
                <AirbnbBar></AirbnbBar>
            </div>
}

ReactDOM.render(<Main/ >, document.getElementById("root")); 