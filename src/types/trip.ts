export type TripStatus = "visited" | "planned" | "cancelled" | "bucketlist" | "never";

// Distinguishes Bangladesh districts (counted against the 64-district total)
// from world countries (which must NOT reduce the "never planned" district
// count). Falls back to inferring from divisionEn === "World" for older data.
export type GeoType = "district" | "country";

export interface TravelMemory {
  districtId: string;
  districtNameEn: string;
  districtNameBn: string;
  divisionEn: string;
  divisionBn: string;
  geoType?: GeoType;
  status: TripStatus;
  cancelReason?: string;
  cancelReasonCustom?: string;
  visitedDate?: string;
  favoriteSpot?: string;
  favoriteFood?: string;
  rating?: number;
  notes?: string;
  photos?: string[];
  updatedAt: number;
}

export interface BadgeInfo {
  id: string;
  titleBn: string;
  titleEn: string;
  icon: string;
  descriptionBn: string;
  descriptionEn: string;
  colorScheme: string;
}

export interface TripStats {
  totalDistricts: number;
  visitedCount: number;
  cancelledCount: number;
  plannedCount: number;
  bucketlistCount: number;
  neverPlannedCount: number;
  cancellationRate: number;
  visitedRate: number;
  badge: BadgeInfo;
}
