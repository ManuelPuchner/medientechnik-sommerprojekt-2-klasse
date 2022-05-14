import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function ShoeModel({ colors }) {
  const group = useRef();
  // useFrame(() => {
  //   let time = Date.now() / 1000;
  //   group.current.rotation.y += Math.sin(time) * 0.002;
  //   group.current.rotation.x += Math.cos(time) * 0.0005;
  //   group.current.rotation.z += Math.cos(time) * 0.0005;
  //   group.current.position.y = Math.sin(time) * 0.05;
  // })

  const hostname =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://172.17.221.108:3000";
  const { nodes, materials } = useGLTF(
    `${hostname}/shoe_compressed.glb`
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
