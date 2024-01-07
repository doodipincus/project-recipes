import { useSetAtom } from "jotai";
import { modalIsOpen } from "./atoms";

const [setModalIsOpen] = useSetAtom(modalIsOpen)

export const openModal = () => {
    setModalIsOpen(true);
  };

export const closeModal = () => {
    setModalIsOpen(false);
  };