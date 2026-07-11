// Maps OpenWeatherMap's many condition names down to the 3 icon categories
// we actually display: "sun", "cloud", "rain".
function toIconCategory(main: string): "sun" | "cloud" | "rain" {
  if (main === "Clear") return "sun";
  if (["Rain", "Drizzle", "Thunderstorm", "Snow"].includes(main)) return "rain";
  return "cloud"; // Clouds, Mist, Haze, Fog, etc.
}

export type WeatherInfo = {
  temp: number;
  condition: string;
  icon: "sun" | "cloud" | "rain";
  locationName: string;
};

// Server-side only — uses OPENWEATHER_API_KEY (no NEXT_PUBLIC_ prefix, never
// sent to the browser). Looks up current weather by district/state name
// rather than precise coordinates, since that's what we have from the
// pincode lookup at registration — good enough for a district-level forecast.
export async function getWeather(
  district: string,
  state: string,
): Promise<WeatherInfo | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) return null;

  const query = encodeURIComponent(`${district},${state},IN`);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`,
  );

  if (!res.ok) return null;
  const data = await res.json();

  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].description,
    icon: toIconCategory(data.weather[0].main),
    locationName: district,
  };
}
