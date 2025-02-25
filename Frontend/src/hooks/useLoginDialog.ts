import { create } from "zustand";

interface AuthDialogProps {
    isOpen: boolean;
    title: string;
    redirectUrl: string;
    resetRedirectUrl: () => void;
    onOpen: () => void;
    onClose: () => void;
    setTitle: (title: string) => void;
    setRedirectUrl: (url: string) => void;
}

export const useAuthDialog = create<AuthDialogProps>((set) => {
    return {
        isOpen: false,
        title: "Login",
        redirectUrl: `${import.meta.env.VITE_LOGIN_REDIRECT_URL}/app`,
        resetRedirectUrl: () =>
            set({
                redirectUrl: `${import.meta.env.VITE_LOGIN_REDIRECT_URL}/app`,
            }),
        setRedirectUrl: (url: string) => set({ redirectUrl: url }),
        setTitle: (title: string) => set({ title }),
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});
