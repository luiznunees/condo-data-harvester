
import React from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProcessingIndicatorProps {
  message?: string;
}

const ProcessingIndicator = ({
  message = "Processando o arquivo PDF...",
}: ProcessingIndicatorProps) => {
  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%", 
      transition: { 
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full py-8 flex flex-col items-center justify-center"
    >
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 relative"
        >
          <svg
            className="w-full h-full text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="2.5"
              strokeOpacity="0.3" 
            />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 12.6477 2.06115 13.2815 2.17873 13.897"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
      <p className="text-center mb-5 text-lg font-medium">{message}</p>
      <div className="w-full max-w-md bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Isso pode levar alguns instantes dependendo do tamanho do arquivo
      </p>
    </motion.div>
  );
};

export default ProcessingIndicator;
