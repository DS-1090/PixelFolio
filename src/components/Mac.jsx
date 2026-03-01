import { useEffect, useMemo, useRef, useState } from "react";
import { Text, useCursor, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import modelUrl from "../model/mac3.glb?url";
import MonitorContent from "./MonitorContent";
import { getSectionFromMeshName } from "./meshRouting";

const MONITOR_CONTENT_SCALE = 12.5;
const IGNORE_RAYCAST = () => null;

function getMonitorAnchor(scene) {
  let monitorMesh = null;

  scene.traverse((child) => {
    if (monitorMesh || !child.isMesh) return;
    const name = (child.name || "").toLowerCase();
    if (
      name.includes("screen") ||
      name.includes("monitor") ||
      name.includes("display")
    ) {
      monitorMesh = child;
    }
  });

  if (!monitorMesh) return null;

  const box = new THREE.Box3().setFromObject(monitorMesh);
  const centerWorld = box.getCenter(new THREE.Vector3());
  const sizeWorld = box.getSize(new THREE.Vector3());
  const normalWorld = new THREE.Vector3(0, 0, 1)
    .applyQuaternion(monitorMesh.getWorldQuaternion(new THREE.Quaternion()))
    .normalize();
  const offset = Math.max(sizeWorld.z * 0.1, 0.045);
  const anchorWorld = centerWorld.addScaledVector(normalWorld, offset);
  const anchorLocal = scene.worldToLocal(anchorWorld.clone());

  const sceneWorldQuat = scene.getWorldQuaternion(new THREE.Quaternion());
  const meshWorldQuat = monitorMesh.getWorldQuaternion(new THREE.Quaternion());
  const localQuat = sceneWorldQuat.invert().multiply(meshWorldQuat);
  const rotation = new THREE.Euler().setFromQuaternion(localQuat);

  return {
    position: anchorLocal.toArray(),
    rotation: [rotation.x, rotation.y, rotation.z],
  };
}

function setMeshHighlight(mesh, section, enabled) {
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];
  const tint = section === "resume" ? "#89afff" : "#ffb96e";
  const intensity = section === "resume" ? 0.75 : 0.35;

  materials.forEach((material) => {
    if (!material || !material.emissive) return;

    if (enabled) {
      if (!material.userData.prevEmissive) {
        material.userData.prevEmissive = material.emissive.clone();
        material.userData.prevEmissiveIntensity = material.emissiveIntensity;
      }

      material.emissive.set(tint);
      material.emissiveIntensity = intensity;
      return;
    }

    if (material.userData.prevEmissive) {
      material.emissive.copy(material.userData.prevEmissive);
      material.emissiveIntensity = material.userData.prevEmissiveIntensity;
      delete material.userData.prevEmissive;
      delete material.userData.prevEmissiveIntensity;
    }
  });
}

export default function Mac({
  activeSection,
  setActiveSection,
  setHoveredSection,
}) {
  const { scene } = useGLTF(modelUrl);
  const [hovered, setHovered] = useState(false);
  const highlightedMeshRef = useRef(null);
  const hoveredSectionRef = useRef(null);
  useCursor(hovered);

  const interactiveMeshCount = useMemo(() => {
    let count = 0;
    scene.traverse((child) => {
      if (child.isMesh) count += 1;
    });
    return count;
  }, [scene]);

  const monitorAnchor = useMemo(() => getMonitorAnchor(scene), [scene]);
  const monitorBadgePosition = useMemo(() => {
    if (!monitorAnchor) return null;
    return [
      monitorAnchor.position[0],
      monitorAnchor.position[1] - 0.72,
      monitorAnchor.position[2] + 0.06,
    ];
  }, [monitorAnchor]);

  const handleClick = (e) => {
    e.stopPropagation();
    const section = getSectionFromMeshName(e.object.name || "");
    if (section) setActiveSection(section);
  };

  const clearHoverState = () => {
    if (hoveredSectionRef.current !== null) {
      hoveredSectionRef.current = null;
      setHovered(false);
      setHoveredSection(null);
    }

    if (highlightedMeshRef.current) {
      setMeshHighlight(highlightedMeshRef.current, null, false);
      highlightedMeshRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (highlightedMeshRef.current) {
        setMeshHighlight(highlightedMeshRef.current, null, false);
      }
    };
  }, []);

  return (
    <group>
      <primitive
        object={scene}
        scale={0.1}
        onClick={handleClick}
        onPointerMove={(e) => {
          e.stopPropagation();
          const mesh = e.object;
          const section = getSectionFromMeshName(mesh.name || "") || null;
          if (hoveredSectionRef.current !== section) {
            hoveredSectionRef.current = section;
            setHovered(Boolean(section));
            setHoveredSection(section);
          }

          if (highlightedMeshRef.current !== mesh) {
            if (highlightedMeshRef.current) {
              setMeshHighlight(highlightedMeshRef.current, null, false);
            }

            if (mesh.isMesh && section) {
              setMeshHighlight(mesh, section, true);
              highlightedMeshRef.current = mesh;
            } else {
              highlightedMeshRef.current = null;
            }
          }
        }}
        onPointerLeave={clearHoverState}
        userData={{ interactiveMeshCount }}
      />

      {activeSection === "resume" && monitorAnchor && (
        <group scale={0.1}>
          <MonitorContent
            position={monitorAnchor.position}
            rotation={monitorAnchor.rotation}
            scale={MONITOR_CONTENT_SCALE}
          />
        </group>
      )}

      {monitorAnchor && monitorBadgePosition && (
        <group scale={0.1}>
          <Text
            position={monitorBadgePosition}
            rotation={monitorAnchor.rotation}
            fontSize={0.9}
            color="#f0e8d7"
            outlineWidth={0.02}
            outlineColor="#3e3e3e"
            anchorX="center"
            anchorY="middle"
            raycast={IGNORE_RAYCAST}
          >
            DS
          </Text>
        </group>
      )}
    </group>
  );
}

useGLTF.preload(modelUrl);
