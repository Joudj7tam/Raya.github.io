import React, { useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldBattlesGeoJSON  from "../data/Geo.json";
import battleByCountry  from "../data/battleByCountry";

const MapView = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const getCountryName = (feature) => {
        // Some files use `properties.admin`, others `properties.name`
        return feature.properties.admin || feature.properties.name;
    };

    const onEachCountry = (feature, layer) => {
        const countryName = getCountryName(feature);

        layer.on({
            click: () => {
                setSelectedCountry(countryName);
            }
        });

        layer.bindTooltip(countryName, { sticky: true });

        layer.setStyle({
            color: "#333",
            fillColor: "#d4f1f4",
            fillOpacity: 0.6,
            weight: 1,
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <MapContainer
                center={[25, 45]}
                zoom={4}
                style={{ height: "500px", width: "100%", backgroundColor: "transparent" }}
                zoomControl={false}       
                doubleClickZoom={false}   
                scrollWheelZoom={false}   
                dragging={false}          
                touchZoom={false}        
                keyboard={false}         
                >
                <GeoJSON data={worldBattlesGeoJSON} onEachFeature={onEachCountry} />
            </MapContainer>

            {selectedCountry && (
                <div className="p-4 bg-white rounded shadow w-full md:w-1/3">
                    <h2 className="text-xl font-bold mb-3 text-right">
                        الغزوات والفتوحات في {selectedCountry}
                    </h2>
                    <ul className="list-disc pl-5 text-right">
                        {(battleByCountry[selectedCountry] || []).map((b, i) => (
                            <li key={i}>{b.name} – {b.year}</li>
                        ))}
                        {(!battleByCountry[selectedCountry] || battleByCountry[selectedCountry].length === 0) && (
                            <li>لا توجد أحداث مسجلة</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MapView;

