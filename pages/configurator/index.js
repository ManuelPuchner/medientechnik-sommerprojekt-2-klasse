import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  ContactShadows,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import styled from "styled-components";
import base64 from "base-64";

import { useState, Suspense, useEffect } from "react";

import ShoeModel from "components/configurator_additions/ShoeModel";
import ConfigurationElements from "components/configurator_additions/ConfigurationElements";
import Walkthrough from "components/configurator_additions/Walkthrough";
import { useRouter } from "next/router";

function LoadingScreen() {
  const prog = useProgress();
  console.log(prog);
  return <Html center>{prog.progress} %</Html>;
}

function Configurator() {
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

  const [configId, setConfigId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (router.query.config) {
      let config;
      try {
        config = JSON.parse(base64.decode(router.query.config));
      } catch (e) {
        console.log(e);
      }
      if (config) {
        setColors(config.colors);
        setConfigId(config._id);
      }
    }
  }, []);

  return (
    <div
      className="wrapper"
      style={{
        position: "relative",
        width: "100vw",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      <Walkthrough colors={colors} setColors={setColors} configId={configId} />
      <Canvas
        style={{
          height: "60%",
          position: "relative",
          top: "70%",
          transform: "translateY(-50%)",
          // userSelect: "none",
        }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 33 }}
      >
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
      {/* {true && <ConfigurationElements colors={colors} setColors={setColors} />} */}
    </div>
  );
}

export default Configurator;
