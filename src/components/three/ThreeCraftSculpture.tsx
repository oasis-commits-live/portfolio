import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Cpu, Dumbbell, Palette, Layers } from 'lucide-react';

interface ThreeCraftSculptureProps {
  className?: string;
}

const DOMAINS = [
  {
    id: 'ai-saas',
    label: 'AI & Enterprise SaaS',
    icon: Cpu,
    color: '#38bdf8',
    hex: 0x38bdf8,
    speed: 1.0,
    caption: 'HyperLM Vera, Invoice & Payments Co-Pilots ($3M ARR)',
  },
  {
    id: '3d-blender',
    label: '3D & Blender',
    icon: Layers,
    color: '#f59e0b',
    hex: 0xf59e0b,
    speed: 1.35,
    caption: 'Hypo Mascot 3D Library & Physical Toy Prototyping',
  },
  {
    id: 'motion-craft',
    label: 'Motion & Prototyping',
    icon: Palette,
    color: '#a855f7',
    hex: 0xa855f7,
    speed: 1.6,
    caption: '24-Hr Figma Make Sprints, Jitter Motion & Oasis Arcade',
  },
  {
    id: 'hybrid-athlete',
    label: 'Hybrid Athlete',
    icon: Dumbbell,
    color: '#10b981',
    hex: 0x10b981,
    speed: 1.9,
    caption: 'Endurance + Strength Discipline Applied to Product Craft',
  },
];

export const ThreeCraftSculpture: React.FC<ThreeCraftSculptureProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<string>('ai-saas');
  const activeDomainRef = useRef<string>('ai-saas');

  const stateRef = useRef({
    pointerX: 0,
    pointerY: 0,
    currentRotationX: 0,
    currentRotationY: 0,
  });

  useEffect(() => {
    activeDomainRef.current = activeDomain;
  }, [activeDomain]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 2.0);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0xe0f2fe, 0x111827, 1.2);
    scene.add(fillLight);

    // 4. Kinetic Sculpture Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Core Procedural Torus Knot (Sculptural Ribbon)
    const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.22, 128, 32, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    rootGroup.add(knotMesh);

    // Inner Translucent Glass Sphere
    const glassSphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const glassSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.0,
      clearcoat: 1.0,
    });
    const glassSphere = new THREE.Mesh(glassSphereGeo, glassSphereMat);
    rootGroup.add(glassSphere);

    // Outer Gyro Orbiting Wireframe Rings
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.65, 0.015, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.x = 0.8;
    rootGroup.add(ring2);

    // Dynamic Orbital Nodes
    const orbitalNodes: THREE.Mesh[] = [];
    const nodeColors = [0x38bdf8, 0xf59e0b, 0xa855f7, 0x10b981];
    for (let i = 0; i < 4; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: nodeColors[i],
        metalness: 0.8,
        roughness: 0.15,
        clearcoat: 1.0,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      rootGroup.add(node);
      orbitalNodes.push(node);
    }

    // 5. Pointer Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      stateRef.current.pointerX = nx * 1.2;
      stateRef.current.pointerY = ny * 1.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Animation Loop with Domain-Reactive Color & Cadence
    let animId: number;
    const clock = new THREE.Clock();
    let accumulatedTime = 0;
    const targetColor = new THREE.Color(0x38bdf8);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      const currentDomainObj =
        DOMAINS.find((d) => d.id === activeDomainRef.current) || DOMAINS[0];
      targetColor.setHex(currentDomainObj.hex);

      // Smoothly lerp inner sphere and outer ring colors to match selected domain
      glassSphereMat.color.lerp(targetColor, delta * 5);
      ringMat2.color.lerp(targetColor, delta * 5);

      accumulatedTime += delta * currentDomainObj.speed;

      // Kinetic internal rotation
      knotMesh.rotation.x = accumulatedTime * 0.35;
      knotMesh.rotation.y = accumulatedTime * 0.45;
      ring1.rotation.z = accumulatedTime * 0.25;
      ring1.rotation.y = -accumulatedTime * 0.15;
      ring2.rotation.z = -accumulatedTime * 0.3;

      // Orbiting skill nodes
      orbitalNodes.forEach((node, i) => {
        const offset = (i / 4) * Math.PI * 2;
        const angle = accumulatedTime * 0.7 + offset;
        node.position.set(
          Math.cos(angle) * 1.4,
          Math.sin(angle * 1.5) * 0.6,
          Math.sin(angle) * 1.4
        );
      });

      // Pointer reactive tilt with exponential damping
      stateRef.current.currentRotationX = THREE.MathUtils.damp(
        stateRef.current.currentRotationX,
        stateRef.current.pointerY,
        4.0,
        delta
      );
      stateRef.current.currentRotationY = THREE.MathUtils.damp(
        stateRef.current.currentRotationY,
        stateRef.current.pointerX,
        4.0,
        delta
      );

      rootGroup.rotation.x = stateRef.current.currentRotationX;
      rootGroup.rotation.y = stateRef.current.currentRotationY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const currentDomain = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  return (
    <div
      className={`relative rounded-3xl border border-white/15 bg-gradient-to-b from-neutral-900/80 via-neutral-950/80 to-black overflow-hidden p-6 sm:p-8 flex flex-col justify-between ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[260px] sm:h-[300px] cursor-grab active:cursor-grabbing select-none"
        title="Interactive 3D Kinetic Sculpture - Hover to tilt, click modes below"
      />

      {/* Domain Mode Controls & Live Caption */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
          <span className="uppercase tracking-widest text-[11px]">The Creative Matrix</span>
          <span className="text-neutral-500">Interactive WebGL</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {DOMAINS.map((domain) => {
            const isSelected = activeDomain === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setActiveDomain(domain.id)}
                className={`h-10 px-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-md font-semibold'
                    : 'bg-white/[0.03] text-neutral-300 border-white/10 hover:bg-white/[0.08] hover:text-white font-medium'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: domain.color }}
                />
                <span className="text-xs truncate">{domain.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-neutral-400 truncate">
          <span className="text-white">Focus:</span> {currentDomain.caption}
        </div>
      </div>
    </div>
  );
};
