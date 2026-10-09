"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useMemo } from "react";
import { db } from "@/db/dexieDb";
import { storageRepository } from "@/db/storageRepository";
import { TravelMemory, TripStats } from "@/types/trip";
import { calculateBadge } from "@/config/badges";

const DEFAULT_TOTAL_DISTRICTS = 64;

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
