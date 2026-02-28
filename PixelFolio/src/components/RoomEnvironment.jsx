import { Sparkles, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import paintingUrl from "../model/assets/painting.png?url";

const IGNORE_RAYCAST = () => null;

export default function RoomEnvironment({ hoveredSection, setActiveSection, setHoveredSection }) {
  const paintingTexture = useTexture(paintingUrl);
  const paintingMap = useMemo(() => {
    const nextTexture = paintingTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [paintingTexture]);

  const sparkleCount = useMemo(() => {
    if (typeof navigator === "undefined") return 65;
    return navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 ? 45 : 85;
  }, []);

  const handlePaintingHover = (e) => {
    e.stopPropagation();
    setHoveredSection?.("hobbies");
  };

  const handlePaintingOut = (e) => {
    e.stopPropagation();
    setHoveredSection?.(null);
  };

  const handlePaintingClick = (e) => {
    e.stopPropagation();
    setActiveSection?.("hobbies");
  };

  const handleCoffeeHover = (e) => {
    e.stopPropagation();
    setHoveredSection?.("food");
  };

  const handleCoffeeOut = (e) => {
    e.stopPropagation();
    setHoveredSection?.(null);
  };

  const handleCoffeeClick = (e) => {
    e.stopPropagation();
    setActiveSection?.("food");
  };
  const paintingHovered = hoveredSection === "hobbies";
  const coffeeHovered = hoveredSection === "food";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} raycast={IGNORE_RAYCAST}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#5c4639" roughness={0.92} metalness={0.05} />
      </mesh>

      <mesh position={[0, 2.7, -3.7]} raycast={IGNORE_RAYCAST}>
        <planeGeometry args={[18, 9]} />
        <meshStandardMaterial color="#3b3452" roughness={0.9} />
      </mesh>

      <mesh position={[-4.8, 2.2, -1.8]} rotation={[0, Math.PI / 2.8, 0]} raycast={IGNORE_RAYCAST}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#332d47" roughness={0.92} />
      </mesh>

      <mesh position={[0, -0.02, 1.65]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[9.2, 0.28, 5.6]} />
        <meshStandardMaterial color="#7a563d" roughness={0.78} />
      </mesh>

      <mesh position={[3.7, -0.9, 3.9]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color="#5d3f2f" roughness={0.82} />
      </mesh>
      <mesh position={[-3.7, -0.9, 3.9]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color="#5d3f2f" roughness={0.82} />
      </mesh>
      <mesh position={[3.7, -0.9, -0.55]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color="#5d3f2f" roughness={0.82} />
      </mesh>
      <mesh position={[-3.7, -0.9, -0.55]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color="#5d3f2f" roughness={0.82} />
      </mesh>

      <mesh
        name="PaintingFrame"
        position={[2.65, 4, -2.25]}
        onPointerMove={handlePaintingHover}
        onPointerOut={handlePaintingOut}
        onClick={handlePaintingClick}
      >
        <boxGeometry args={[2.4, 1.65, 0.1]} />
        <meshStandardMaterial
          color="#ad8458"
          roughness={0.65}
          emissive="#ffbb77"
          emissiveIntensity={paintingHovered ? 0.62 : 0.18}
        />
      </mesh>
      <mesh
        name="PaintingCanvas"
        position={[2.65, 4, -2.16]}
        onPointerMove={handlePaintingHover}
        onPointerOut={handlePaintingOut}
        onClick={handlePaintingClick}
      >
        <planeGeometry args={[1.95, 1.24]} />
        <meshStandardMaterial
          map={paintingMap}
          roughness={0.5}
          metalness={0.06}
          emissive="#f0c88a"
          emissiveIntensity={paintingHovered ? 0.4 : 0.12}
        />
      </mesh>
      <pointLight
        position={[2.7, 4, -1.8]}
        intensity={paintingHovered ? 0.85 : 0.3}
        distance={3.4}
        color="#ffd29c"
      />

      <mesh position={[2.95, 1.28, 0.92]} raycast={IGNORE_RAYCAST}>
        <cylinderGeometry args={[0.13, 0.18, 0.86, 18]} />
        <meshStandardMaterial color="#9d7b48" roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[2.95, 1.9, 0.92]} raycast={IGNORE_RAYCAST}>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshStandardMaterial color="#ffd389" emissive="#ffbf6b" emissiveIntensity={0.55} />
      </mesh>
      <pointLight position={[2.95, 2.02, 0.92]} intensity={1.05} distance={8} color="#ffbf7a" />

      <group
        position={[2.1, 0.2, 2.05]}
        onPointerMove={handleCoffeeHover}
        onPointerOut={handleCoffeeOut}
        onClick={handleCoffeeClick}
      >
        <mesh>
          <cylinderGeometry args={[0.13, 0.11, 0.2, 24]} />
          <meshStandardMaterial
            color="#d3d7de"
            roughness={0.28}
            metalness={0.06}
            emissive="#8fc7ff"
            emissiveIntensity={coffeeHovered ? 0.55 : 0.12}
          />
        </mesh>
        <mesh position={[0.12, 0.04, 0]}>
          <torusGeometry args={[0.07, 0.02, 12, 24]} />
          <meshStandardMaterial
            color="#d3d7de"
            roughness={0.28}
            metalness={0.06}
            emissive="#8fc7ff"
            emissiveIntensity={coffeeHovered ? 0.55 : 0.12}
          />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <circleGeometry args={[0.1, 24]} />
          <meshStandardMaterial
            color="#8f5a34"
            roughness={0.9}
            emissive="#ffc075"
            emissiveIntensity={coffeeHovered ? 0.5 : 0.1}
          />
        </mesh>
      </group>
      <pointLight
        position={[2.1, 0.6, 2.05]}
        intensity={coffeeHovered ? 0.72 : 0.22}
        distance={2.1}
        color="#8bc1ff"
      />

      <Sparkles
        size={1.6}
        scale={[10, 5, 7]}
        position={[0, 1.8, -0.5]}
        speed={0.14}
        count={sparkleCount}
        opacity={0.28}
        color="#ffe8cc"
      />
    </group>
  );
}
