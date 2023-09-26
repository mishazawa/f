import { SKIN_SCALE } from "@/app/constants";
import { useFBX, useHelper } from "@react-three/drei";
import { useRef } from "react";
import { SkeletonHelper } from "three";

export function Character() {
  const char = useFBX("/assets/biped.fbx");
  const ref = useRef(null!);

  const _a = useHelper(ref, SkeletonHelper);

  return <primitive ref={ref} object={char} scale={SKIN_SCALE} />;
}
