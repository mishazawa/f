import { SKIN_SCALE } from "@/app/constants";
import { Wireframe, useFBX, useHelper } from "@react-three/drei";
import { useRef } from "react";
import { Object3D, SkeletonHelper } from "three";

export function Character() {
  // const char = useFBX("/assets/biped.fbx");
  const char = useFBX("/api/files/temp/out.fbx");
  const ref = useRef(null!);

  const _a = useHelper(ref, SkeletonHelper);

  const o: any = char.children[0];
  // eslint-disable-next-line functional/no-expression-statements
  console.log(o);
  return (
    o && (
      <mesh ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={o.geometry.attributes.position.count}
            array={o.geometry.attributes.position.array}
            itemSize={o.geometry.attributes.position.itemSize}
          />
        </bufferGeometry>

        <meshPhongMaterial color="#f3f3f3" wireframe />
      </mesh>
    )
  );
}
