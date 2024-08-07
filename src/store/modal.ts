import { create } from "zustand";
import { Modal } from "@/src/services";

interface ModalState {
  openModal: Modal | null;
  modalProps: Record<string, any>;
  setOpenModal: (modal: Modal | null, props?: Record<string, any>) => void;
  closeModal: () => void;
};

export const useModal = create<ModalState>((set) => ({
  openModal: null,
  modalProps: {},
  setOpenModal: (openModal, modalProps = {}) => set({ openModal, modalProps }),
  closeModal: () => set({ openModal: null, modalProps: {} }),
}));