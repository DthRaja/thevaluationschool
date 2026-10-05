"use client";

import WhatsAppContactModal from "@/app/Components/layout/WhatsAppContactModal";
import { useCallback, useState } from "react";

const DropMessageButton = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className="have-a-question-btn"
        onClick={() => setOpen(true)}
      >
        Drop a message
      </button>
      {open && <WhatsAppContactModal onClose={close} />}
    </>
  );
};

export default DropMessageButton;
