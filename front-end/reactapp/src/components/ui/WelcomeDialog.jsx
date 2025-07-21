import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    console.log("hasVisited:", hasVisited);
    if (!hasVisited) {
      setOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl  bg-[#faf9f6] rounded-3xl shadow-2xl p-0 overflow-hidden">
            <motion.div
              key="welcome-dialog"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center gap-10 px-10 py-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full md:w-1/3 flex justify-center"
              >
                <LazyLoadImage
                  src="/assets/welcome_bot.webp"
                  alt="Hotelzi AI Bot"
                  width={240}
                  height={240}
                  className="rounded-full "
                />
              </motion.div>

              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full md:w-2/3 space-y-5 text-center md:text-left z-10"
              >
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-3xl text-black font-bold">
                    Welcome to <span>Hotelza</span>
                    <span className="animate-pulse text-blue-800">AI</span>
                  </DialogTitle>
                  <DialogDescription className="text-gray-700 text-base leading-relaxed">
                    I'm <strong>Hotelzi AI</strong>, your smart assistant.
                    <br />
                    I’ll guide you through everything — from finding your
                    perfect stay to managing your bookings with ease.
                  </DialogDescription>
                </DialogHeader>

                <p className="text-sm text-gray-600 leading-relaxed">
                  HotelzaAI is your intelligent hotel booking companion — built
                  for comfort, powered by AI. Get ready for a smooth,
                  personalized experience tailored just for you.
                </p>

                <div className="flex justify-center md:justify-end pt-4"></div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default WelcomeDialog;
