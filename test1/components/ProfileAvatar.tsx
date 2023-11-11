import { IonAvatar, IonIcon, IonImg } from "@ionic/react";
import { personOutline } from "ionicons/icons";

interface ProfileAvatarProps {
  imgUrl: string | undefined;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ imgUrl }) => {
  return (
    <IonAvatar className="w-[48px] h-[48px] border-white border m-2 bg-slate-300">
      {imgUrl && <IonImg src={imgUrl} alt="profile avatar" />}
      {!imgUrl && (
        <div className="text-2xl text-black pl-3 pt-[10px]">
          <IonIcon icon={personOutline} />
        </div>
      )}
    </IonAvatar>
  );
};

export default ProfileAvatar;
