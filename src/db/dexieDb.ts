import Dexie, { type EntityTable } from "dexie";
import { TravelMemory } from "@/types/trip";

export interface AppSetting {
  key: string;
  value: string;
}

export class CancelTourDatabase extends Dexie {
  memories!: EntityTable<TravelMemory, "districtId">;
  settings!: EntityTable<AppSetting, "key">;

  constructor() {
    super("CancelTourDB");
    this.version(1).stores({
      memories: "districtId, status, updatedAt",
      settings: "key",
    });
    this.version(2).stores({
      memories: "districtId, status, geoType, updatedAt",
      settings: "key",
    });
  }
}

export const db = new CancelTourDatabase();

/**
 * Requests the browser to preserve IndexedDB without eviction on storage pressure.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof window !== "undefined" && navigator?.storage?.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      return isPersisted;
    } catch {
      return false;
    }
  }
  return false;
}

