import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Plane,
  SpotLight,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import { useRef, useEffect, useState, Suspense } from "react";

function ShoeModel() {
  const group = useRef();

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

  // useFrame(() => {
  //   let time = Date.now() / 1000;
  //   group.current.rotation.y += Math.sin(time) * 0.002;
  //   group.current.rotation.x += Math.cos(time) * 0.0005;
  //   group.current.rotation.z += Math.cos(time) * 0.0005;
  //   group.current.position.y = Math.sin(time) * 0.05;
  // })

  const { nodes, materials } = useGLTF(
    "http://localhost:3000/shoe_compressed.glb"
  );
  return (
    <group
      receiveShadow
      castShadow
      ref={group}
      dispose={null}
      rotation={[0, 3.5, 0]}

      onPointerOver={(e) => {
        e.stopPropagation();
        // e.target.setPointerCapture(e.pointer);
        console.log(e.object);
      }}
    >
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.laces}
        material-color={colors.laces}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.mesh}
        material-color={colors.mesh}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.caps}
        material-color={colors.caps}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.inner}
        material-color={colors.inner}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.sole}
        material-color={colors.sole}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.stripes}
        material-color={colors.stripes}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.band}
        material-color={colors.band}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.patch}
        material-color={colors.patch}
      />
    </group>
  );
}

export default function Configurator() {
  return (
    <div
      className="wrapper"
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <Canvas
        shadows
        
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 60 }}
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

        <Suspense fallback={null}>
          <ShoeModel />
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
    </div>
  );
}
