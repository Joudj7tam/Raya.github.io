import React, { useState, useRef, useCallback,useEffect} from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldBattlesGeoJSON from "../data/Geo.json";
import battleByCountry from "../data/battleByCountry";
import "../CSS/map.css";
import EventCard from "../Components/eventcard.jsx"
import AOS from 'aos';
import 'aos/dist/aos.css';

const MapView = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const mapRef = useRef();

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

    const getCountryName = (feature) => {
    return feature.properties.name_ar || feature.properties.name || feature.properties.admin;
};

    const getColorForCountry = (name) => {
        if (saudiRegions.includes(name)) {
            return "#2e8b57"; // Saudi green
        }
        const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return regionColors[hash % regionColors.length];
    };

    const onEachCountry = (feature, layer) => {
        const countryName = getCountryName(feature);

        layer.on("click", (e) => {
            e.originalEvent.stopPropagation(); // Prevent event from bubbling to map
            setSelectedCountry(countryName);
            const bounds = layer.getBounds();
            mapRef.current?.fitBounds(bounds.pad(1.5));
        });

        layer.bindTooltip(countryName, { sticky: true });
    };

    const styleFeature = (feature) => {
        const countryName = getCountryName(feature);
        const isSelected = selectedCountry === countryName;

        return {
            color: "#333",
            weight: 1,
            fillColor: getColorForCountry(countryName),
            fillOpacity: selectedCountry ? (isSelected ? 1 : 0.2) : 0.6,
            className: isSelected ? "country-shape selected" : selectedCountry ? "country-shape dimmed" : "country-shape",
        };
    };

    return (
        <div className="map-container">
            <MapContainer
                center={[25, 45]}
                zoom={4}
                style={{ height: "700px", width: "100%", backgroundColor: "transparent" }}
                zoomControl={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                dragging={false}
                touchZoom={false}
                keyboard={false}
                attributionControl={false}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
                <GeoJSON
                    key={selectedCountry || "all"}
                    data={worldBattlesGeoJSON}
                    onEachFeature={onEachCountry}
                    style={styleFeature}
                />
            </MapContainer>
            {selectedCountry && (
                <div className="info-container">
                    <h3 className="map-header">
                        الغزوات والفتوحات في {selectedCountry}
                    </h3>
                    <ul data-aos="fade-up">
                        {(battleByCountry[selectedCountry] || []).map((b, i) => (
                            <li key={i}>{b.name} – {b.year}</li>
                        ))}
                        {(!battleByCountry[selectedCountry] || battleByCountry[selectedCountry].length === 0) && (
                            <> 
                            <li><EventCard
                                title="kjlhygtf"
                                era="jhg"/></li>
                                <li><EventCard
                                title="kjlhygtf"
                                era="jhg"/></li>
                                <li><EventCard
                                title="kjlhygtf"
                                era="jhg"/></li>
                                </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MapView;
