import { APPS } from "./apps-core";
import { APPS_EXT } from "./apps-extra";

export const ALL_APPS = [...APPS, ...APPS_EXT];
export const APP_MAP = new Map(ALL_APPS.map((a) => [a.id, a]));
export const ROOT_DIRS = ALL_APPS.map((a) => a.id);
