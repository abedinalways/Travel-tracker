export type TripStatus = "visited" | "planned" | "cancelled" | "bucketlist" | "never";

export interface TravelMemory {
  districtId: string;
  districtNameEn: string;
  districtNameBn: string;
  divisionEn: string;
  divisionBn: string;
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
