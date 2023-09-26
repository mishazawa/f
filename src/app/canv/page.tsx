"use client";

import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box } from "../components/utils/Box";
import { Sidebar } from "./components/Sidebar";

export default function Canv() {
  return (
    <div className="flex w-full">
      <div className="w-9/12 h-screen">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <CameraControls />
          <Box />
        </Canvas>
      </div>
      <div className="w-3/12">
        <Sidebar />
      </div>
    </div>
  );
}
