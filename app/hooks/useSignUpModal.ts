import { create } from "zustand";

interface SignUpModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSignUpModal = create<SignUpModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSignUpModal;
