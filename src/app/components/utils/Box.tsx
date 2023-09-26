import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

export function Box() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // eslint-disable-next-line functional/no-expression-statements, functional/immutable-data
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      scale={clicked ? 1.5 : 1}
      // eslint-disable-next-line functional/no-return-void
      onClick={() => click(!clicked)}
      // eslint-disable-next-line functional/no-return-void
      onPointerOver={() => hover(true)}
      // eslint-disable-next-line functional/no-return-void
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
