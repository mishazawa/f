"use client";

import { Canvas } from "@react-three/fiber";

import { Sidebar } from "./components/Sidebar";
import { Character } from "./components/Character";
import { Suspense } from "react";
import { Camera } from "./components/Camera";
import { Environment } from "./components/Environment";

export default function Canv() {
  return (
    <div className="flex w-full">
      <div className="w-9/12 h-screen">
        <Canvas>
          <Camera />
          <Environment />
          <Suspense fallback={null}>
            <Character />
          </Suspense>
        </Canvas>
      </div>
      <div className="w-3/12">
        <Sidebar />
      </div>
    </div>
  );
}
