// other solution is to use state to control the dialog visibility but this solution is more elegant and closer to how we would use a dialog in vanilla js
// for invalid inputs we can disable the save button instead of showing an error message but this is just for demo purposes

import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
const Modal = forwardRef(function Modal({ children }, ref) {
   const dialogRef = useRef();
   useImperativeHandle(ref, () => {
      return {
         open: () => {
            dialogRef.current.showModal();
         },
         close: () => {
            dialogRef.current.close();
         },
      };
   });
   return createPortal(
      <dialog ref={dialogRef}>{children}</dialog>,
      document.getElementById("modal-root"),
   );
});
export default Modal;
