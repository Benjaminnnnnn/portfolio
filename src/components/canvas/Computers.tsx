import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

// @ts-ignore
import CanvasLoader from "../Loader";

const Computers = ({
  isMobile,
  isPortrait,
}: {
  isMobile: boolean;
  isPortrait: boolean;
}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight
        position={isPortrait ? [0.25, 0.75, 0] : [0.25, 0, 0]}
        intensity={1}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : isPortrait ? 0.4 : 0.75}
        position={
          isMobile
            ? [0, -3, -2.2]
            : isPortrait
            ? [0, -1, -0.85]
            : [0, -3.25, -1.5]
        }
        rotation={[-0.01, -0.2, -0.1]}
      ></primitive>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    // account for iphone pro max
    const mediaQuery = window.matchMedia("(max-width: 930px)");
    setIsMobile(mediaQuery.matches);
    setIsPortrait(
      !mediaQuery.matches && window.innerHeight > window.innerWidth
    );
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
      setIsPortrait(!event.matches && window.innerHeight > window.innerWidth);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      className="h-full w-full"
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader></CanvasLoader>}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        ></OrbitControls>
        <Computers isMobile={isMobile} isPortrait={isPortrait}></Computers>
      </Suspense>

      <Preload all></Preload>
    </Canvas>
  );
};

export default ComputersCanvas;
