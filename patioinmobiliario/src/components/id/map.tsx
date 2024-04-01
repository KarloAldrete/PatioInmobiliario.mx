import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { useRef, useEffect } from "react";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

interface MapProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

const MapComponent: React.FC<MapProps> = ({ center, zoom }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            new google.maps.Map(ref.current, {
                center,
                zoom,
            });
        }
    }, [ref, center, zoom]);

    return <div ref={ref} className="rounded" style={{ width: "100%", height: "100%" }} />;
};

const MapWithPlaces: React.FC<MapProps> = (props) => {
    return (
        <Wrapper apiKey={"AIzaSyAyj-ZAuA9LJlkuwIU5U9QrRX7JV6AgDrE"} render={render}>
            <MapComponent {...props} />
        </Wrapper>
    );
};

export default MapWithPlaces;