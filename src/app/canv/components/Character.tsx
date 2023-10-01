import { SKIN_SCALE } from "@/app/constants";
import { Wireframe, useFBX, useHelper } from "@react-three/drei";
import { useRef } from "react";
import { Object3D, SkeletonHelper } from "three";

export function Character() {
  const char = useFBX("/assets/biped.fbx");
  // const char = useFBX("/api/files/temp/out.fbx");
  const ref = useRef(null!);

  // eslint-disable-next-line functional/no-expression-statements
  useHelper(ref, SkeletonHelper);
  return (
    <mesh ref={ref}>
      <meshPhongMaterial color="#f3f3f3" wireframe />
    </mesh>
  );
}
