import { IoMdClose } from "react-icons/io";
import { FaMinusSquare } from "react-icons/fa";
import { FaRegWindowMaximize } from "react-icons/fa6";
import type { CloseProps } from "../type";

export function CloseIcon({ onClose }: CloseProps) {
  return (
    <button type="button" className="window-buttons-style" onClick={onClose}>
      <IoMdClose />
    </button>
  );
}

export function MinIcon() {
  return (
    <button type="button" className="window-buttons-style">
      <FaMinusSquare />
    </button>
  );
}

export function MaxIcon() {
  return (
    <button type="button" className="window-buttons-style">
      <FaRegWindowMaximize />
    </button>
  );
}
