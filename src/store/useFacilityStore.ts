import { create } from 'zustand';

interface FacilityState {
  facilities: any[];
}

const useFacilityStore = create<FacilityState>()((set) => ({
  facilities: [],
}));
