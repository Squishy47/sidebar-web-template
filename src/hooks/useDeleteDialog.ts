import { create } from "zustand";

type DeleteData = {
    deleteFn: () => void;
};

interface DeleteDialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    deleteFn: () => void;
    setDeleteFn(cb: DeleteData["deleteFn"]): void;
}

export const useDeleteDialog = create<DeleteDialogProps>((set) => ({
    isOpen: false,

    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    deleteFn: () => {},
    setDeleteFn: (data) => set({ deleteFn: data }),
}));
