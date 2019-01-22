import React from 'react';
/* global google */

// GoogleMap component standard example
// Default props: 
    // 1. zoom: 12
    // 2. height: 300
    // 3. width: 400
    
/* <GoogleMap 
    markerArray={[
        {
        coords:{lat:22.320188,lng:114.175812},
        content:'<h1>Dogotel & Spa</h1>'
        }
    ]} 
    zoom={13} height={300} width={400}
/> */

class GoogleMap extends React.Component {
    constructor (props) {
        super(props);
        if (!this.props.zoom) { 
            this.zoom = 12 
        } else {
            this.zoom = this.props.zoom
        }

        if (!this.props.height) { 
            this.height = 300
        } else {
            this.height = this.props.height
        }

        if (!this.props.width) { 
            this.width = 400
        } else {
            this.width = this.props.width
        }
    }

    getGoogleMaps() {
        // If we haven't already defined the promise, define it
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise((resolve) => {
                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(google);

                    // Tidy up
                    delete window.resolveGoogleMapsPromise;
                };

                // Load the Google Maps API
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&callback=resolveGoogleMapsPromise`;
                script.async = true;
                document.body.appendChild(script);
            });
        }

        // Return a promise for the Google Maps API
        return this.googleMapsPromise;
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
        this.getGoogleMaps();
    }

    componentDidMount() {
        // Once the Google Maps API has finished loading, initialize the map
        this.getGoogleMaps().then((google) => {
            const map = new google.maps.Map(document.getElementById('GoogleMap'), {
                zoom: this.zoom,
                center: this.props.markerArray[0].coords
            });

            for (let marker in this.props.markerArray) {
                this.addMarker(this.props.markerArray[marker], map);
            }
        });
    }

    addMarker = (marker, map) => {
        let markerObj = new google.maps.Marker({
            position: marker.coords,
            map: map,
        });
    
        if (marker.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: marker.content
            });
    
            markerObj.addListener('click', function () {
                infoWindow.open(map, markerObj);
            });
        }
    }

    render() {
        return (
            <div id='GoogleMap' style={{width: this.width, height: this.height}}></div>
        )
    }
}

export default GoogleMap;