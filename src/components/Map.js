import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoiamF2aXZhcmVsYWtkaSIsImEiOiJjazhidjdxMmEwZzR6M21vM2Y5NDg5emk1In0.3IMS-CAg151Lm_gXRL_koQ";

export default class Map extends Component {
  
  state={
    lng: this.props.lng || "",
    lat: this.props.lat || "",
    zoom: this.props.zoom || ""
  }

  componentDidMount() {
    if (this.props.mapType === "profileMap"){
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
      });
      new mapboxgl.Marker()
        .setLngLat([this.state.lng, this.state.lat])
        .addTo(map);
    }

    if (this.props.mapType === "newMap"){
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((position) => {
          const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: this.state.zoom
          });
          const marker = new mapboxgl.Marker()
            .setLngLat([position.coords.longitude, position.coords.latitude])
            .addTo(map);
          map.on('click', (evt) => { marker.setLngLat([evt.lngLat.lng, evt.lngLat.lat]) })
        })
      }
    }

    if (this.props.mapType === "editMap"){
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
      });
      const marker = new mapboxgl.Marker()
        .setLngLat([this.state.lng, this.state.lat])
        .addTo(map);
      map.on('click', (evt) => { marker.setLngLat([evt.lngLat.lng, evt.lngLat.lat]) })
    }
  }

  
        
  render() {
    return (
      <div className={this.props.containerClass}>
        <div ref={el => this.mapContainer = el}  className="mapbox-content"/>
      </div>
    );
  }
}
