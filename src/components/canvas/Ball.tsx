import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// @ts-ignore
import CanvasLoader from "../Loader";

const Ball = (props: any) => {
  const [decal] = useTexture([props.imgUrl]);
  return (
    // @ts-ignore
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25}></ambientLight>
      <directionalLight position={[0, 0, 0.05]}></directionalLight>
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]}></icosahedronGeometry>
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        ></meshStandardMaterial>

        <Decal
          map={decal}
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
        ></Decal>
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }: { icon: string }) => {
  return (
    <Canvas frameloop="demand">
      <Suspense fallback={<CanvasLoader></CanvasLoader>}>
        <OrbitControls enableZoom={false}></OrbitControls>
        <Ball imgUrl={icon}></Ball>
      </Suspense>

      <Preload all></Preload>
    </Canvas>
  );
};

export default BallCanvas;
