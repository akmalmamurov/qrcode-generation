import { configurePersist } from "zustand-persist";
const { persist } = configurePersist({
  storage: localStorage,
});
export default persist;
