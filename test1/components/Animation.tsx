import { useLottie } from "lottie-react";

interface ContainerProps {
  animationData: any;
}

const AnimationContainer: React.FC<ContainerProps> = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    style: {
      height: 200,
    },
  };
  const { View } = useLottie(defaultOptions);

  return <>{View}</>;
};

export default AnimationContainer;
