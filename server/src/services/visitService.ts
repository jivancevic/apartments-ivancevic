import { storage } from "../storage";

export const visitService = {
  async getLocations(params: { type?: string; category?: string }) {
    const { type, category } = params;
    if (type) return storage.getLocationsByType(type);
    if (category) return storage.getLocationsByCategory(category);
    return storage.getLocations();
  },
};
