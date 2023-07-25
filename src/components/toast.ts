/* eslint-disable import/prefer-default-export */
import Toastify from "toastify-js";

export const dangerToast = (text: string) =>
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "#DC3545",
    },
  });
