import React, { useRef, useMemo } from 'react'; // Removed useEffect as it's no longer strictly needed for geometry setup
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FireEffect: React.FC = () => {
  const particlesRef = useRef<THREE.Points | null>(null);

  // useMemo to create and manage the BufferGeometry
  // This ensures the geometry is created only once and available from the start
  const particlesGeometry = useMemo(() => {
    const count = 500; // Number of particles. Adjust for density.
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorStart = new THREE.Color(0xFF8C00); // Dark Orange
    const colorEnd = new THREE.Color(0xFF4500); // Orange Red

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.2; // Small random X offset
      positions[i * 3 + 1] = Math.random() * 0.1; // Small random Y offset (start near base)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Small random Z offset

      const lerpedColor = colorStart.clone().lerp(colorEnd, Math.random());
      colors[i * 3] = lerpedColor.r;
      colors[i * 3 + 1] = lerpedColor.g;
      colors[i * 3 + 2] = lerpedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, []); // Empty dependency array means it runs only once

  // useFrame runs on every frame, allowing us to animate the particles
  useFrame(() => {
    if (!particlesGeometry.attributes.position) return; // Ensure attribute exists

    const posAttribute = particlesGeometry.attributes.position;
    const currentPositions = posAttribute.array;

    // Loop through each particle
    for (let i = 0; i < currentPositions.length; i += 3) {
      // Simple upward movement, reset if too high
      currentPositions[i + 1] += 0.05 + Math.random() * 0.02; // Move upwards with some randomness
      if (currentPositions[i + 1] > 2) { // If particle goes too high, reset it to the bottom
        currentPositions[i + 1] = 0;
        currentPositions[i] = (Math.random() - 0.5) * 0.2; // Reset X
        currentPositions[i + 2] = (Math.random() - 0.5) * 0.2; // Reset Z
      }
    }
    // Tell Three.js that the positions have changed and need to be re-rendered
    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}> {/* Directly use particlesGeometry */}
      <pointsMaterial
        size={0.2} // Adjust particle size
        vertexColors={true}
        transparent={true}
        // alphaMap={new THREE.TextureLoader().load('/fire_particle.png')} // Uncomment if you have the image in public/
        depthWrite={false} // Prevents particles from rendering over transparent objects behind them
        blending={THREE.AdditiveBlending} // Makes particles glow when overlapping
      />
    </points>
  );
};

export default FireEffect;