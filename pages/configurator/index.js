import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  ContactShadows,
  OrbitControls,
  useProgress,
} from "@react-three/drei";

import { useState, Suspense } from "react";

import ShoeModel from "./ShoeModel";
import ConfigurationElements from "./ConfigurationElements";

function LoadingScreen() {
  const prog = useProgress();
  console.log(prog);
  return <Html center>{prog.progress} %</Html>;
}

export default function Configurator() {
  const [colors, setColors] = useState({
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  });
  return (
    <div
      className="wrapper"
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight
          intensity={0.8}
          angle={0.2}
          penumbra={0.8}
          position={[10, 265, 10]}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-top={10}
          shadow-darkness={1}
          shadow-bias={-0.0006}
          castShadow
        />

        <Suspense fallback={<LoadingScreen />}>
          <ShoeModel colors={colors} />
          <Environment preset="city" />
          <ContactShadows />
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <ConfigurationElements colors={colors} setColors={setColors} />
    </div>
  );
}
