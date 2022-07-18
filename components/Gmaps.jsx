import { useMemo } from 'react';
import{ GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import styles from "../public/styles/Footer.module.css";


export default function Gmaps() {
    

    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, });

    if(!isLoaded) return <div>Carregando...</div>;

    return <Map />
}

function Map() {
    const center = useMemo(() => ({lat: -22.61039925699339, lng: -46.70273110170582}), []);

    return <GoogleMap zoom={16} center={center} mapContainerClassName={styles.mapContainer}>
        <Marker position={center} />
    </GoogleMap>
}