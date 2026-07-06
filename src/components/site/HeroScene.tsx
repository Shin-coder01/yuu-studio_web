import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function Knot({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<Mesh>(null);

  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;

    m.rotation.y += dt * 0.15;
    const tx = mouse.y * 0.6;
    const ty = mouse.x * 0.8;
    m.rotation.x += (tx - m.rotation.x) * 0.05;
    m.rotation.z += (ty * 0.3 - m.rotation.z) * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref} scale={1.4}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#e4e4e7"
          roughness={0.15}
          metalness={0.85}
          distort={0.28}
          speed={1.3}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted || reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#a0a0aa" />
        <Suspense fallback={null}>
          <Knot mouse={mouse.current} />
        </Suspense>
      </Canvas>
    </div>
  );
}
