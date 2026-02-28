import { AdaptiveDpr, AdaptiveEvents, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { useRef } from "react";
import Mac from "./Mac";
import CameraController from "./CameraController";
import RoomEnvironment from "./RoomEnvironment";

export default function Scene({
  activeSection,
  hoveredSection,
  setActiveSection,
  setHoveredSection,
  setDpr,
}) {
  const controlsRef = useRef(null);
  const modelRef = useRef(null);

  return (
    <>
      <color attach="background" args={["#1e1e2f"]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3.5, 4.2, 2.5]} intensity={1.1} color="#ffb266" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#7aa8ff" />
      <RoomEnvironment
        hoveredSection={hoveredSection}
        setActiveSection={setActiveSection}
        setHoveredSection={setHoveredSection}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <PerformanceMonitor
        bounds={{ min: 0.45, max: 0.92 }}
        onChange={({ factor }) => {
          const nextDpr = 1 + factor * 0.5;
          setDpr(nextDpr);
        }}
      />

      {hoveredSection === "resume" && (
        <pointLight position={[0.2, 1.4, 1.4]} intensity={0.75} color="#7ea8ff" distance={5} />
      )}

      <group ref={modelRef} position={[0.50, 0.26, 4.5]} rotation={[0, 0, 0]}>
        <Mac
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setHoveredSection={setHoveredSection}
        />
      </group>

      <CameraController
        activeSection={activeSection}
        controlsRef={controlsRef}
        modelRef={modelRef}
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0.95}
        maxPolarAngle={1.2}
      />
    </>
  );
}
