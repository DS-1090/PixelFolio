import { Sparkles, Text, useTexture } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import paintingUrl from "../model/assets/painting.png?url";

const IGNORE_RAYCAST = () => null;
const ROOM_THEME = {
  studio: {
    floor: "#5c4639",
    backWall: "#3b3452",
    sideWall: "#332d47",
    desk: "#7a563d",
    deskLeg: "#5d3f2f",
    lampStand: "#9d7b48",
    lampBulb: "#ffd389",
    lampGlow: "#ffbf7a",
    engrave: "#2d2119",
  },
  terminal: {
    floor: "#2f3a31",
    backWall: "#1f3329",
    sideWall: "#182a21",
    desk: "#3e4b3f",
    deskLeg: "#2a332b",
    lampStand: "#7ea882",
    lampBulb: "#bfffd4",
    lampGlow: "#8bffc7",
    engrave: "#1b2a21",
  },
  paper: {
    floor: "#6a543f",
    backWall: "#5a4b3e",
    sideWall: "#4c4035",
    desk: "#8b6a4f",
    deskLeg: "#6d4f39",
    lampStand: "#b99665",
    lampBulb: "#ffe1af",
    lampGlow: "#ffd29a",
    engrave: "#3b2e22",
  },
};

export default function RoomEnvironment({
  theme,
  hoveredSection,
  setActiveSection,
  setHoveredSection,
}) {
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
  const [lampHovered, setLampHovered] = useState(false);
  const roomTheme = ROOM_THEME[theme] || ROOM_THEME.studio;

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
  const handleLampHover = (e) => {
    e.stopPropagation();
    setLampHovered(true);
  };

  const handleLampOut = (e) => {
    e.stopPropagation();
    setLampHovered(false);
  };
  const paintingHovered = hoveredSection === "hobbies";
  const coffeeHovered = hoveredSection === "food";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} raycast={IGNORE_RAYCAST}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color={roomTheme.floor} roughness={0.92} metalness={0.05} />
      </mesh>

      <mesh position={[0, 2.7, -3.7]} raycast={IGNORE_RAYCAST}>
        <planeGeometry args={[18, 9]} />
        <meshStandardMaterial color={roomTheme.backWall} roughness={0.9} />
      </mesh>

      <mesh position={[-4.8, 2.2, -1.8]} rotation={[0, Math.PI / 2.8, 0]} raycast={IGNORE_RAYCAST}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color={roomTheme.sideWall} roughness={0.92} />
      </mesh>

      <mesh position={[0, -0.02, 1.65]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[9.2, 0.28, 5.6]} />
        <meshStandardMaterial color={roomTheme.desk} roughness={0.78} />
      </mesh>
      <mesh position={[3.7, -0.9, 3.9]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color={roomTheme.deskLeg} roughness={0.82} />
      </mesh>
      <mesh position={[-3.7, -0.9, 3.9]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color={roomTheme.deskLeg} roughness={0.82} />
      </mesh>
      <mesh position={[3.7, -0.9, -0.55]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color={roomTheme.deskLeg} roughness={0.82} />
      </mesh>
      <mesh position={[-3.7, -0.9, -0.55]} raycast={IGNORE_RAYCAST}>
        <boxGeometry args={[0.48, 1.7, 0.48]} />
        <meshStandardMaterial color={roomTheme.deskLeg} roughness={0.82} />
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

      <mesh
        position={[2.95, 1.28, 0.92]}
        onPointerMove={handleLampHover}
        onPointerOut={handleLampOut}
      >
        <cylinderGeometry args={[0.13, 0.18, 0.86, 18]} />
        <meshStandardMaterial color={roomTheme.lampStand} roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh
        position={[2.95, 1.9, 0.92]}
        onPointerMove={handleLampHover}
        onPointerOut={handleLampOut}
      >
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshStandardMaterial
          color={roomTheme.lampBulb}
          emissive={roomTheme.lampGlow}
          emissiveIntensity={lampHovered ? 0.95 : 0.55}
        />
      </mesh>
      <pointLight
        position={[2.95, 2.02, 0.92]}
        intensity={lampHovered ? 1.6 : 1.05}
        distance={8}
        color={roomTheme.lampGlow}
      />

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
