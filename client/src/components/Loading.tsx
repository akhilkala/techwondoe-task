import { useLottie } from "lottie-react";

interface Props {
  width?: number;
  height?: number;
  fullScreen?: boolean;
}

export default function Loading({
  width = 250,
  height = 250,
  fullScreen,
}: Props) {
  const { View: LoadingView } = useLottie({
    animationData: require(`../assets/loading.json`),
    loop: true,
    autoplay: true,
  });

  if (fullScreen)
    return (
      <div className="screen-center">
        <div style={{ width, height }} className="loading">
          {LoadingView}
        </div>
      </div>
    );

  return (
    <div style={{ width, height }} className="loading">
      {LoadingView}
    </div>
  );
}
