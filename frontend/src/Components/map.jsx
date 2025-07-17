import React, { useState, useRef, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldBattlesGeoJSON from "../mapGeoJson/Geo.json";
import "../CSS/map.css";
import EventCard from "../Components/eventcard.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

const MapView = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const mapRef = useRef();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [eventsByLocation, setEventsByLocation] = useState([]);
    const [eventsByCountry, setEventsByCountry] = useState([]);
    const[loading, setLoading] = useState(true);

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

    //fetch gazwat based location
    useEffect(() => {
        const fetchEventsByCountry = async () => {
            if (!selectedCountry) return;

            console.log("📍 selectedCountry:", selectedCountry); // Debug

            try {
                const response = await fetch(`http://localhost:4000/api/gazwa/by-country?country=${selectedCountry}`);
                const data = await response.json();
                if (data.success) {
                    setEventsByLocation(data.data);
                } else {
                    setEventsByLocation([]);
                    console.error("❌ Failed:", data.message);
                }
            } catch (err) {
                console.error("🚨 Fetch Error:", err.message);
                setEventsByLocation([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsByCountry();
    }, [selectedCountry]);

    return (
        <div className="map-container">
            <MapContainer
                center={[25, 40]}
                zoom={4}
                style={{ height: "700px", width: "100%", backgroundColor: "transparent" }}
                doubleClickZoom={false}
                scrollWheelZoom={false}
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
                    <button className="close-btn" onClick={() => setSelectedCountry(null)}>✕</button>
                    <h3 className="map-header">
                        الغزوات والفتوحات في {selectedCountry}
                    </h3>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                            <div className="loader"></div>
                        </div>
                    ) : <ul data-aos="fade-up">
                        {eventsByLocation.length > 0 ? (
                            eventsByLocation.map((event, index) => (
                                <li key={index}>
                                    <EventCard
                                        key={event._id}
                                        id={event._id}
                                        title={event.name}
                                        era={`عهد ${event.era}`}
                                        enableAnimation={false} />
                                </li>
                            ))
                        ) : (
                            <li style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem' }}>
                                لا توجد أحداث مسجلة في هذه المنطقة
                            </li>
                        )}
                    </ul>
                    }
                </div>
            )}
        </div>
    );
};

export default MapView;
