import { useRef, useEffect } from "react";

import * as THREE from "three";

import { COLOR_MODES } from "@/config/color-modes";
import type { ColorMode } from "@/types/color";
import { forEachTimePoint, getTimeColorsAsRgbArray } from "@/utils/color-utils";

const SCALE = 1.2;

const TIME_POSITIONS = (() => {
  const positions: number[] = [];
  forEachTimePoint((h, m, s) => {
    positions.push((h - 11.5) * SCALE, (m - 29.5) * SCALE, (s - 29.5) * SCALE);
  });
  return positions;
})();

function createScene(width: number, height: number, colorMode: ColorMode) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 0, 110);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 0);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.margin = "0 auto";

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(TIME_POSITIONS, 3));
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(getTimeColorsAsRgbArray(colorMode), 3)
  );
  const material = new THREE.PointsMaterial({ size: 3.0, vertexColors: true });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  return { scene, camera, renderer, geometry, material, points };
}

function createTooltipElement(): HTMLDivElement {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "absolute",
    padding: "8px 12px",
    background: "rgba(0, 0, 0, 0.8)",
    color: "white",
    borderRadius: "4px",
    fontSize: "12px",
    fontFamily: "monospace",
    pointerEvents: "none",
    zIndex: "1000",
    display: "none",
  });
  return el;
}

function pointIndexToTimeString(index: number): string {
  const s = index % 60;
  const m = Math.floor((index % 3600) / 60);
  const h = Math.floor(index / 3600);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface ColorSpace3DProps {
  colorMode: ColorMode;
}

export function ColorSpace3D({ colorMode }: ColorSpace3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const containerWidth = mountRef.current.offsetWidth * 0.75;
    const containerHeight = containerWidth * 0.75;

    const { scene, camera, renderer, geometry, material, points } = createScene(
      containerWidth,
      containerHeight,
      colorMode
    );
    mountRef.current.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovering = false;

    const tooltip = createTooltipElement();
    document.body.appendChild(tooltip);

    function onMouseMove(event: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(points);

      if (intersects.length > 0) {
        isHovering = true;
        tooltip.textContent = pointIndexToTimeString(intersects[0].index ?? 0);
        tooltip.style.display = "block";
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY - 30}px`;
      } else {
        isHovering = false;
        tooltip.style.display = "none";
      }
    }

    function onMouseLeave() {
      isHovering = false;
      tooltip.style.display = "none";
    }

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);

    let frame = 0;
    let animationId = 0;
    function animate() {
      if (!isHovering) {
        frame++;
        points.rotation.y = frame * -0.003;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeChild(tooltip);
      renderer.domElement.remove();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [colorMode]);

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <div ref={mountRef} className="w-full rounded-xl overflow-hidden bg-white" />
      <p className="text-xs text-center text-muted-foreground mt-2">3D Color Space Visualization</p>
      <p className="text-xs text-center text-muted-foreground">
        Each point is a time-based color in{" "}
        <a
          href={COLOR_MODES[colorMode].docs}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-blue-600 hover:text-blue-800 underline"
          aria-label={`Learn more about ${COLOR_MODES[colorMode].label} color format`}
          title={`View ${COLOR_MODES[colorMode].label} documentation of the color format`}
        >
          {COLOR_MODES[colorMode].label}
        </a>{" "}
        space
      </p>
    </div>
  );
}
