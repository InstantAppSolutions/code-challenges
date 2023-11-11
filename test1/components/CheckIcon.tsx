import { IonIcon } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";

const CheckIcon: React.FC<{ check: boolean }> = ({ check }) => {
  return (
    <IonIcon
      icon={check ? checkmarkCircle : closeCircle}
      color={check ? "success" : "danger"}
    />
  );
};

export default CheckIcon;
