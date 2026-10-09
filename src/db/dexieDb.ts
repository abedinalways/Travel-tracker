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
  }
}

export const db = new CancelTourDatabase();
