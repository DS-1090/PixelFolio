import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getSectionFromMeshName } from "./meshRouting";

const SECTION_OFFSETS = {
  default: [0, 1.25, 5.2],
  resume: [0, 0.32, 1.7],
  blogs: [0.35, 0.35, 1.95],
  projects: [-0.42, 0.4, 2.0],
  about: [0.82, 0.5, 2.25],
  hobbies: [-0.95, 0.82, 2.3],
  coding: [0.95, 0.35, 2.25],
  food: [0.62, 0.6, 1.6],
};

function collectAnchors(root) {
  if (!root) return null;
  root.updateWorldMatrix(true, true);

  const modelBox = new THREE.Box3().setFromObject(root);
  const center = modelBox.getCenter(new THREE.Vector3());
  const size = modelBox.getSize(new THREE.Vector3());
  const radius = Math.max(size.x, size.y, size.z) * 0.5;

  const sums = {};
  const counts = {};
  const meshBox = new THREE.Box3();
  const meshCenter = new THREE.Vector3();

  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const section = getSectionFromMeshName(obj.name);
    if (!section) return;

    meshBox.setFromObject(obj);
    meshBox.getCenter(meshCenter);

    if (!sums[section]) sums[section] = new THREE.Vector3();
    sums[section].add(meshCenter);
    counts[section] = (counts[section] || 0) + 1;
  });

  const anchors = { default: center.clone(), radius };
  Object.keys(sums).forEach((section) => {
    anchors[section] = sums[section].multiplyScalar(1 / counts[section]);
  });

  return anchors;
}

export default function CameraController({ activeSection, controlsRef, modelRef }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 4, 11));
  const lookAtTarget = useRef(new THREE.Vector3(0, 2, 0));
  const anchorsRef = useRef(null);

  const section = useMemo(() => activeSection || "default", [activeSection]);

  useEffect(() => {
    anchorsRef.current = collectAnchors(modelRef?.current);
  }, [modelRef]);

  useEffect(() => {
    const anchors = collectAnchors(modelRef?.current) || anchorsRef.current;
    if (!anchors) return;
    anchorsRef.current = anchors;

    const anchor = anchors[section] || anchors.default;
    const factor = anchors.radius || 1;
    if (section === "default") {
      targetPosition.current.set(0, 2, 12);
      lookAtTarget.current.set(0, 0.85, 0.4);
      return;
    }

    const baseOffset = SECTION_OFFSETS[section] || SECTION_OFFSETS.default;
    const scaledOffset = new THREE.Vector3(
      baseOffset[0] * factor,
      baseOffset[1] * factor,
      baseOffset[2] * factor
    );

    targetPosition.current.copy(anchor).add(scaledOffset);
    if (section === "resume") {
      lookAtTarget.current.copy(anchor).add(new THREE.Vector3(0, 0.02, 0));
    } else {
      lookAtTarget.current.copy(anchor);
    }
  }, [section, modelRef]);

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.085);

    if (controlsRef?.current) {
      controlsRef.current.target.lerp(lookAtTarget.current, 0.1);
      controlsRef.current.update();
    } else {
      camera.lookAt(lookAtTarget.current);
    }
  });

  return null;
}
