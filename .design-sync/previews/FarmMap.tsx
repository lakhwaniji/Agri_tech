import { FarmMap } from 'src';

// Realistic Nashik, Maharashtra farmland coordinates.
export const WithLocation = () => (
  <div className="p-6">
    <FarmMap location={{ lat: 19.9975, lng: 73.7898 }} boundary={null} />
  </div>
);

export const WithBoundary = () => (
  <div className="p-6">
    <FarmMap
      location={{ lat: 19.9975, lng: 73.7898 }}
      boundary={[
        { lat: 19.998, lng: 73.789 },
        { lat: 19.998, lng: 73.7906 },
        { lat: 19.9968, lng: 73.7906 },
        { lat: 19.9968, lng: 73.789 },
      ]}
    />
  </div>
);
