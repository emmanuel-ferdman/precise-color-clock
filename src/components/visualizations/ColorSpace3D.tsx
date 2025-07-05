import { useRef, useEffect } from "react";

import * as THREE from "three";

import { COLOR_MODES } from "@/config/color-modes";
import { ColorMode } from "@/types/color";
import { getTimeColorsAsRgbArray } from "@/utils/color-utils";

export interface ColorSpace3DProps {
  colorMode: ColorMode;
}

export function ColorSpace3D({ colorMode }: ColorSpace3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const containerWidth = mountRef.current.offsetWidth * 0.75;
    const containerHeight = containerWidth * 0.75;

    const pointColors = getTimeColorsAsRgbArray(colorMode);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 1000);
    camera.position.set(0, 0, 110);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0xffffff, 0);
    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.margin = "0 auto";
    }

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m++) {
        for (let s = 0; s < 60; s++) {
          const scale = 1.2;
          const x = (h - 11.5) * scale;
          const y = (m - 29.5) * scale;
          const z = (s - 29.5) * scale;
          positions.push(x, y, z);
        }
      }
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(pointColors, 3));
    const material = new THREE.PointsMaterial({ size: 3.0, vertexColors: true });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let tooltip: HTMLDivElement | null = null;
    let isHovering = false;

    function createTooltip() {
      tooltip = document.createElement("div");
      tooltip.style.position = "absolute";
      tooltip.style.padding = "8px 12px";
      tooltip.style.background = "rgba(0, 0, 0, 0.8)";
      tooltip.style.color = "white";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.fontFamily = "monospace";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "1000";
      tooltip.style.display = "none";
      document.body.appendChild(tooltip);
    }

    function onMouseMove(event: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(points);

      if (intersects.length > 0 && tooltip) {
        isHovering = true;
        const pointIndex = intersects[0].index!;
        const s = pointIndex % 60;
        const m = Math.floor((pointIndex % 3600) / 60);
        const h = Math.floor(pointIndex / 3600);

        const timeString = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        tooltip.textContent = timeString;
        tooltip.style.display = "block";
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY - 30}px`;
      } else if (tooltip) {
        isHovering = false;
        tooltip.style.display = "none";
      }
    }

    function onMouseLeave() {
      isHovering = false;
      if (tooltip) {
        tooltip.style.display = "none";
      }
    }

    createTooltip();
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);

    let frame = 0;
    function animate() {
      if (!isHovering) {
        frame++;
        points.rotation.y = frame * -0.003;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseleave", onMouseLeave);
      if (tooltip) {
        document.body.removeChild(tooltip);
      }
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
