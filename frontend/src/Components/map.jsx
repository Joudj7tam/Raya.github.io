import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import regionData from "../data/SA_regions.json";
import ghazawatByRegion from "../data/ghazawatByRegion";

const MapView = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const onEachRegion = (feature, layer) => {
        const regionName = feature.properties.name;
        layer.on({
            click: () => {
                setSelectedRegion(regionName);
            }
        });

        layer.bindTooltip(regionName, { sticky: true });

        layer.setStyle({
            color: "#000",
            weight: 1,
            fillColor: "#8ecae6",
            fillOpacity: 0.5,
        });

    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <MapContainer center={[23.8859, 45.0792]} zoom={5.2} style={{ height: "600px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON data={regionData} onEachFeature={onEachRegion} />
            </MapContainer>

            {selectedRegion && (
                <div className="p-4 bg-white rounded shadow w-full md:w-1/3">
                    <h2 className="text-xl font-bold mb-3">
                        الغزوات في منطقة {selectedRegion}
                    </h2>
                    <ul className="list-disc pl-5 text-right">
                        {(ghazawatByRegion[selectedRegion] || []).map((g, i) => (
                            <li key={i}>
                                {g.name} – {g.year}
                            </li>
                        ))}
                        {(!ghazawatByRegion[selectedRegion] || ghazawatByRegion[selectedRegion].length === 0) && (
                            <li>لا توجد غزوات مسجلة في هذه المنطقة</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MapView;

