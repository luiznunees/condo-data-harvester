
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  message?: string;
}

const ProcessingIndicator = ({
  message = "Processando o arquivo PDF...",
}: ProcessingIndicatorProps) => {
  return (
    <div className="w-full py-8 flex flex-col items-center justify-center">
      <div className="spinner-container mb-4">
        <svg
          className="spinner"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <p className="text-center mb-4">{message}</p>
      <Progress className="w-full max-w-md" value={66} />
    </div>
  );
};

export default ProcessingIndicator;
