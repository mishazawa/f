import { CAMERA_POS } from "@/app/constants";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";

export function Camera() {
  return (
    <>
      <CameraControls />
      <PerspectiveCamera position={CAMERA_POS} makeDefault />
    </>
  );
}
