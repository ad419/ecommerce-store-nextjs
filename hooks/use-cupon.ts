import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Cupon } from "@/types";
import toast from "react-hot-toast";

interface CuponStore {
  items: Cupon[];
  addItem: (data: Cupon) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCupon = create(
  persist<CuponStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Cupon) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("You already have this cupon.");
        }
        set({ items: [...get().items, data] });
        toast.success("Cupon added to your cupon list.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Cupon removed from your cupon list.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cupon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCupon;
