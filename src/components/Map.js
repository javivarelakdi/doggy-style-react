import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoiamF2aXZhcmVsYWtkaSIsImEiOiJjazhidjdxMmEwZzR6M21vM2Y5NDg5emk1In0.3IMS-CAg151Lm_gXRL_koQ";

export default class Map extends Component {
  
  state={
    lng: 5,
    lat: 34,
    zoom: 2
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {

    return (
      <div className="profile__pic-container__map">
        <div ref={el => this.mapContainer = el}  className="mapbox-content"/>
      </div>
    );
  }
}
