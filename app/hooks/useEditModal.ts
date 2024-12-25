import { create } from "zustand";

interface EditModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<EditModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useEditModal;
