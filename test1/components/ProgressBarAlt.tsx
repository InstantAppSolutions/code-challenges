import { IonProgressBar } from "@ionic/react";
import React from "react";

const ProgressBarAlt = ({
  percent,
  className
}: {
  percent: number;
  className?: string;
}) => {
  return (
    <div className={`rounded-lg bg-primary-70 px-3 py-1 w-fit ${className}`}>
      <div className="flex items-center gap-2">
        <IonProgressBar value={percent / 100} className="w-20 guided-tour" />
        <span className="text-white font-medium">{percent}%</span>
      </div>
    </div>
  );
};

export default ProgressBarAlt;
