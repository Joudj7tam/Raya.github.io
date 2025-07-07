import React, { useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldBattlesGeoJSON from "../data/Geo.json";
import battleByCountry from "../data/battleByCountry";

const MapView = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const getCountryName = (feature) => {
    return feature.properties.name_ar || feature.properties.name || feature.properties.admin;
};

    const regionColors = [
        "#b3584a",
        "#d8b36f",
        "#5e6659",
        "#c7c0ae",
        "#7682a4",
        "#d2b6a2",
        "#c3a28d",
        "#a0522d",
        "#9ba88d",
        "#c1b5aa",
        "#826f66",
        "#b0a395",
        "#89735b",
        "#e2c4a0",
    ];

    const saudiRegions = [
        "الرياض",
        "مكة المكرمة",
        "المدينة المنورة",
        "القصيم",
        "الشرقية",
        "عسير",
        "تبوك",
        "حائل",
        "الحدود الشمالية",
        "جازان",
        "نجران",
        "الباحة",
        "الجوف",
        "المنطقة الشرقية",
        "المنطقة الشمالية",
        "جيزان"
    ];

    const getColorForCountry = (name) => {
        if (saudiRegions.includes(name)) {
            return "#2e8b57"; // Saudi green
        }
        const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return regionColors[hash % regionColors.length];
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
            fillColor: getColorForCountry(countryName),
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
                attributionControl={false}
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

