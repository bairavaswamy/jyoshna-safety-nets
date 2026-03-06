import { locations } from "./locationsData";

export function getRelatedAreas(citySlug: string, currentArea: string) {
  const city = locations[citySlug as keyof typeof locations];

  return Object.values(city.areas)
    .filter((area: any) => area.slug !== currentArea)
    .slice(0, 6);
}