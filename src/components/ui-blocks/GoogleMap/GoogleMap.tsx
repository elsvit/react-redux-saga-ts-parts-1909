import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAP_API_KEY } from '../../../constants/config';
import { LOCATION_STUB } from '../../../constants/stub';
import { ILocation } from '../../../types/IShops';
import './googleMap.scss';

interface IMarker extends ILocation {
  title?: string;
}

interface GoogleMapProps {
  zoom?: Maybe<number>;
  center?: Maybe<ILocation>;
  markers?: Maybe<IMarker[]>;
}

const CustomMarker = ({title}: { title: string }) => (
  <div className="google-marker-wrapper">
    <div className="google-marker"/>
    {title}
  </div>
);

export default class GoogleMap extends Component<GoogleMapProps> {
  public render() {
    const { zoom: zoomProp, center, markers } = this.props;
    const lat = center && (center.lat <= 90 && center.lat >= -90) ? center.lat : LOCATION_STUB.lat;
    const lng = center && (center.lng <= 180 && center.lng >= -180) ? center.lng : LOCATION_STUB.lng;
    const zoom = zoomProp || LOCATION_STUB.zoom;
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        defaultCenter={{lat, lng}}
        defaultZoom={zoom}
        options={{fullscreenControl: true}}
      >
        {markers &&
          markers.map((marker: IMarker, idx: number) => (
            <CustomMarker key={idx} title={marker.title || ''}/>
          ))}
      </GoogleMapReact>
    );
  }
}
