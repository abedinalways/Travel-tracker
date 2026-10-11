import { db, AppSetting } from "./dexieDb";
import { TravelMemory } from "@/types/trip";

export interface BackupData {
  version: number;
  exportedAt: string;
  memories: TravelMemory[];
  settings: AppSetting[];
}

export const storageRepository = {
  async getMemory(districtId: string): Promise<TravelMemory | undefined> {
    return db.memories.get(districtId);
  },

  async getAllMemories(): Promise<TravelMemory[]> {
    try {
      return await db.memories.toArray();
    } catch (err) {
      console.error("[IndexedDB] Failed to get all memories:", err);
      return [];
    }
  },

  async saveMemory(memory: TravelMemory): Promise<void> {
    try {
      const normalized: TravelMemory = {
        ...memory,
        geoType: memory.geoType || (memory.divisionEn === "World" ? "country" : "district"),
        updatedAt: memory.updatedAt || Date.now(),
      };
      await db.memories.put(normalized);
    } catch (err) {
      console.error("[IndexedDB] Failed to save memory:", err);
      throw err;
    }
  },

  async deleteMemory(districtId: string): Promise<void> {
    try {
      await db.memories.delete(districtId);
    } catch (err) {
      console.error("[IndexedDB] Failed to delete memory:", err);
      throw err;
    }
  },

  async getSetting(key: string): Promise<string | undefined> {
    try {
      const item = await db.settings.get(key);
      return item?.value;
    } catch {
      return undefined;
    }
  },

  async saveSetting(key: string, value: string): Promise<void> {
    try {
      await db.settings.put({ key, value });
    } catch (err) {
      console.error("[IndexedDB] Failed to save setting:", err);
      throw err;
    }
  },

  async getStorageUsage(): Promise<{ usage: number; quota: number; percentage: number } | null> {
    if (typeof window !== "undefined" && navigator?.storage?.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        const usage = estimate.usage || 0;
        const quota = estimate.quota || 1;
        const percentage = Math.round((usage / quota) * 100);
        return { usage, quota, percentage };
      } catch {
        return null;
      }
    }
    return null;
  },

  async exportBackup(): Promise<string> {
    const memories = await db.memories.toArray();
    const settings = await db.settings.toArray();
    const payload: BackupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      memories,
      settings,
    };
    return JSON.stringify(payload, null, 2);
  },

  async restoreBackup(jsonString: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(jsonString) as BackupData;
      if (!parsed || !Array.isArray(parsed.memories)) {
        return false;
      }

      await db.transaction("rw", db.memories, db.settings, async () => {
        await db.memories.clear();
        await db.settings.clear();
        if (parsed.memories.length > 0) {
          const normalizedMemories = parsed.memories.map((m) => ({
            ...m,
            geoType: m.geoType || (m.divisionEn === "World" ? "country" : "district"),
            updatedAt: m.updatedAt || Date.now(),
          }));
          await db.memories.bulkPut(normalizedMemories);
        }
        if (Array.isArray(parsed.settings) && parsed.settings.length > 0) {
          await db.settings.bulkPut(parsed.settings);
        }
      });
      return true;
    } catch (err) {
      console.error("[IndexedDB] Failed to restore backup:", err);
      return false;
    }
  },

  async clearAllData(): Promise<void> {
    try {
      await db.transaction("rw", db.memories, db.settings, async () => {
        await db.memories.clear();
        await db.settings.clear();
      });
    } catch (err) {
      console.error("[IndexedDB] Failed to clear all data:", err);
      throw err;
    }
  },
};
