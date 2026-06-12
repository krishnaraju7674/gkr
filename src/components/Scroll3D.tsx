import { useRef, useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TorusKnotGeometry,
  MeshPhysicalMaterial,
  Mesh,
  MeshBasicMaterial,
} from "three";

export default function Scroll3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer | null = null;
    let onScroll: () => void = () => {};
    let animationFrameId: number;

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(280, 280);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported by browser:", err);
      // Fallback: render nothing or keep container background without crashing
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4;

    const geo = new TorusKnotGeometry(1.2, 0.4, 128, 16);
    const mat = new MeshPhysicalMaterial({
      color: 0xb600a8,
      metalness: 0.3,
      roughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
      emissive: 0x7621b0,
      emissiveIntensity: 0.2,
    });
    const mesh = new Mesh(geo, mat);
    scene.add(mesh);

    const wireGeo = new TorusKnotGeometry(1.25, 0.45, 32, 8);
    const wireMat = new MeshBasicMaterial({
      color: 0xbe4c00,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    onScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      mesh.rotation.x = progress * Math.PI * 2;
      mesh.rotation.y = progress * Math.PI * 1.5;
      wireMesh.rotation.x = -progress * Math.PI * 1.5;
      wireMesh.rotation.y = -progress * Math.PI;
    };

    const animate = () => {
      if (!container.isConnected) return;
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.008;
      wireMesh.rotation.x -= 0.003;
      wireMesh.rotation.y -= 0.005;
      if (renderer) renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[280px] h-[280px] mx-auto rounded-2xl border border-[var(--border)] overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 50%, rgba(182,0,168,0.05), transparent 70%)" }}
    />
  );
}
