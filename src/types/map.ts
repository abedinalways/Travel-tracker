import { TripStatus } from "./trip";

export interface DistrictGeoData {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionEn: string;
  divisionBn: string;
  svgPath: string;
  center?: [number, number];
}

export interface CountryGeoData {
  id: string;
  nameEn: string;
  nameBn: string;
  svgPath: string;
}

export type MapViewMode = "bangladesh" | "world";

export interface MapDistrictProps {
  district: DistrictGeoData;
  status: TripStatus;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
