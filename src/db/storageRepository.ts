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
    return db.memories.toArray();
  },

  async saveMemory(memory: TravelMemory): Promise<void> {
    await db.memories.put(memory);
  },

  async deleteMemory(districtId: string): Promise<void> {
    await db.memories.delete(districtId);
  },

  async getSetting(key: string): Promise<string | undefined> {
    const item = await db.settings.get(key);
    return item?.value;
  },

  async saveSetting(key: string, value: string): Promise<void> {
    await db.settings.put({ key, value });
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
        // Also clear existing settings so stale keys don't survive a restore.
        await db.settings.clear();
        if (parsed.memories.length > 0) {
          await db.memories.bulkPut(parsed.memories);
        }
        if (Array.isArray(parsed.settings) && parsed.settings.length > 0) {
          await db.settings.bulkPut(parsed.settings);
        }
      });
      return true;
    } catch {
      return false;
    }
  },

  async clearAllData(): Promise<void> {
    await db.transaction("rw", db.memories, db.settings, async () => {
      await db.memories.clear();
      await db.settings.clear();
    });
  },
};
