import { IonButton, IonCard, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { copyOutline } from "ionicons/icons";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";

interface Props {
  qrCode: string;
}

const QRCodeComponent: React.FC<Props> = ({ qrCode }) => {
  const copyToClipboard = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(qrCode).then(() => {
      toast.success("Copied to clipboard!", {
        duration: 3000
      });
    });
  };
  if (!qrCode) return null;

  return (
    <>
      <IonCard className="flex flex-col justify-center items-center">
        <QRCode value={qrCode} size={256} className="rounded" />
      </IonCard>
      <IonItem
        className="mt-4 flex items-center border border-primary-50 rounded-lg"
        button
        lines="none"
        detail={false}
        onClick={copyToClipboard}
      >
        <IonLabel className="mr-4">{qrCode}</IonLabel>
        <IonButton onClick={copyToClipboard}>
          <IonIcon icon={copyOutline} slot="icon-only" />
        </IonButton>
      </IonItem>
    </>
  );
};

export default QRCodeComponent;
