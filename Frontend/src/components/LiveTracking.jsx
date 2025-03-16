import React, { useState, useEffect, useRef } from "react";

const LiveTracking = () => {
    const mapRef = useRef(null);
    const platformRef = useRef(null);
    const markerRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPosition = { lat: latitude, lng: longitude };

                console.log("Initial Location:", newPosition);
                setCurrentPosition(newPosition);
            },
            (error) => {
                console.error("Error fetching location:", error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (!currentPosition) return;

        if (typeof H === "undefined") {
            console.error("HERE Maps SDK is not loaded!");
            return;
        }

        platformRef.current = new H.service.Platform({
            apikey: import.meta.env.VITE_HERE_MAPS_API_KEY
        });

        const defaultLayers = platformRef.current.createDefaultLayers();
        const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: currentPosition,
            zoom: 15,
            pixelRatio: window.devicePixelRatio || 1
        });

        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        const ui = H.ui.UI.createDefault(map, defaultLayers);
        ui.removeControl("zoom");
        ui.removeControl("mapsettings");
        ui.removeControl("scalebar");

        const marker = new H.map.Marker(currentPosition);
        map.addObject(marker);
        markerRef.current = marker;

        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newPosition = { lat: latitude, lng: longitude };

                    // console.log("Updated Position:", newPosition);
                    setCurrentPosition(newPosition);

                    markerRef.current.setGeometry(new H.geo.Point(latitude, longitude));
                    map.setCenter(newPosition);
                },
                (error) => console.error("Error fetching location:", error),
                { enableHighAccuracy: true, maximumAge: 0 }
            );
        };

        const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [currentPosition]);

    return (
        <div className={`rounded-lg overflow-hidden w-full h-full relative`}>
            <div ref={mapRef} className="w-full h-full"></div>
        </div>
    );
};

export default LiveTracking;
