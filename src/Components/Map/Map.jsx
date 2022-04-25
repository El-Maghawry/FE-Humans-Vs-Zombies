/* eslint-disable no-undef */
import '../../index.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import {useEffect, useRef, useState} from "react";
import tt from '@tomtom-international/web-sdk-maps';

function Map(props) {
    const [map, setMap] = useState({});
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const mapElement = useRef();
    let firstLoad = useRef(true);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((e) => {
                setLat(e.coords.latitude);
                setLng(e.coords.longitude);
            });
        }
    }

    useEffect(() => {
        if (firstLoad.current) {
            getLocation();
            firstLoad.current = false;
        }

        let map = tt.map({
            key: '70dIwiN4SXoAAOPO2fmaoP2k6ktjlP5i',
            container: mapElement.current,
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true
            },
            basePath: "sdk",
            source: "vector",
            center: [lng, lat],
            zoom: 14
        });

        setMap(map);

        const addMarker = () => {
           props.players && props.players.forEach((player) => {

            const element = document.createElement('div');
            element.className = 'marker';

            const popupOffset = {
                bottom: [0, -25]
            };

            const popup = new tt.Popup({offset: popupOffset})
                .setHTML(player.username);

            const marker = new tt.Marker({
                draggable: true,
                element: element
            })
                .setLngLat([player.lng, player.lat])
                .addTo(map);

            marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                setLat(lngLat.lat);
                setLng(lngLat.lng);
            });

            marker.setPopup(popup);

            });
        };

        addMarker();

        return () => map.remove();
    }, [lat, lng, props.players]);

    return (
        <>
            {
                map && <div className="app-map">
                    <div ref={mapElement} className="map"/>
                </div>
            }
        </>
    );
}

export default Map;