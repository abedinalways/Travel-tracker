"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useMemo } from "react";
import { db } from "@/db/dexieDb";
import { storageRepository } from "@/db/storageRepository";
import { TravelMemory, TripStats, GeoType } from "@/types/trip";
import { calculateBadge } from "@/config/badges";
import { WORLD_COUNTRIES } from "@/config/worldCountries";

const DEFAULT_TOTAL_DISTRICTS = 64;

// Older records may not have an explicit geoType. Infer it: world-country
// records were historically stored with divisionEn === "World".
function getGeoType(memory: TravelMemory): GeoType {
  if (memory.geoType) return memory.geoType;
  return memory.divisionEn === "World" ? "country" : "district";
}

export function useTripStorage() {
  const memoriesList = useLiveQuery(() => db.memories.toArray(), []);
  const nicknameSetting = useLiveQuery(
    () => db.settings.get("user_nickname"),
    []
  );

  const memoriesMap = useMemo(() => {
    const map: Record<string, TravelMemory> = {};
    if (memoriesList) {
      for (const item of memoriesList) {
        map[item.districtId] = item;
      }
    }
    return map;
  }, [memoriesList]);

  const stats: TripStats = useMemo(() => {
    let visitedCount = 0;
    let cancelledCount = 0;
    let plannedCount = 0;
    let bucketlistCount = 0;

    if (memoriesList) {
      for (const item of memoriesList) {
        // Only Bangladesh districts feed the 64-district overview stats.
        if (getGeoType(item) !== "district") continue;
        if (item.status === "visited") visitedCount++;
        else if (item.status === "cancelled") cancelledCount++;
        else if (item.status === "planned") plannedCount++;
        else if (item.status === "bucketlist") bucketlistCount++;
      }
    }

    const neverPlannedCount = Math.max(
      0,
      DEFAULT_TOTAL_DISTRICTS -
        (visitedCount + cancelledCount + plannedCount + bucketlistCount)
    );

    const totalDecided = visitedCount + cancelledCount;
    const cancellationRate =
      totalDecided > 0 ? Math.round((cancelledCount / totalDecided) * 100) : 0;
    const visitedRate = Math.round(
      (visitedCount / DEFAULT_TOTAL_DISTRICTS) * 100
    );

    const badge = calculateBadge(visitedCount, cancelledCount);

    return {
      totalDistricts: DEFAULT_TOTAL_DISTRICTS,
      visitedCount,
      cancelledCount,
      plannedCount,
      bucketlistCount,
      neverPlannedCount,
      cancellationRate,
      visitedRate,
      badge,
    };
  }, [memoriesList]);

  // Separate world-country tallies so country memories no longer leak into
  // the district stats above.
  const countryStats = useMemo(() => {
    let visitedCount = 0;
    let cancelledCount = 0;
    let plannedCount = 0;
    let bucketlistCount = 0;

    if (memoriesList) {
      for (const item of memoriesList) {
        if (getGeoType(item) !== "country") continue;
        if (item.status === "visited") visitedCount++;
        else if (item.status === "cancelled") cancelledCount++;
        else if (item.status === "planned") plannedCount++;
        else if (item.status === "bucketlist") bucketlistCount++;
      }
    }

    const marked = visitedCount + cancelledCount + plannedCount + bucketlistCount;
    const totalCountries = WORLD_COUNTRIES.length;
    const neverPlannedCount = Math.max(0, totalCountries - marked);
    const visitedRate =
      totalCountries > 0
        ? Math.round((visitedCount / totalCountries) * 100)
        : 0;

    return {
      totalCountries,
      visitedCount,
      cancelledCount,
      plannedCount,
      bucketlistCount,
      neverPlannedCount,
      visitedRate,
    };
  }, [memoriesList]);

  const nickname = nicknameSetting?.value || "";

  const saveMemory = useCallback(async (memory: TravelMemory) => {
    await storageRepository.saveMemory(memory);
  }, []);

  const deleteMemory = useCallback(async (districtId: string) => {
    await storageRepository.deleteMemory(districtId);
  }, []);

  const setNickname = useCallback(async (name: string) => {
    await storageRepository.saveSetting("user_nickname", name);
  }, []);

  const exportBackup = useCallback(async () => {
    return storageRepository.exportBackup();
  }, []);

  const restoreBackup = useCallback(async (jsonString: string) => {
    return storageRepository.restoreBackup(jsonString);
  }, []);

  const resetAll = useCallback(async () => {
    await storageRepository.clearAllData();
  }, []);

  return {
    memories: memoriesList ?? [],
    memoriesMap,
    stats,
    countryStats,
    nickname,
    saveMemory,
    deleteMemory,
    setNickname,
    exportBackup,
    restoreBackup,
    resetAll,
    isLoading: memoriesList === undefined,
  };
}
