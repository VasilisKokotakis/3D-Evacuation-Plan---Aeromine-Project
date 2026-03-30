import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';
import FireEffect from './FireEffect';
import { LOCATIONS, ROUTES } from '../data/evacuationRoutes';

interface CitySceneProps {
  gltfPath: string;
  showFire: boolean;
  selectedLocation: string;
  resetCamera: number;
}

interface ArrowProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

const Arrow: React.FC<ArrowProps> = ({ start, end, color = 'blue' }) => {
  const arrowHelper = useMemo(() => {
    const startVec = new Vector3(...start);
    const endVec = new Vector3(...end);
    const direction = new Vector3().subVectors(endVec, startVec).normalize();
    const length = startVec.distanceTo(endVec);
    return new THREE.ArrowHelper(direction, startVec, length, new THREE.Color(color), 5, 2);
  }, [start, end, color]);

  useEffect(() => {
    return () => { arrowHelper.dispose(); };
  }, [arrowHelper]);

  return <primitive object={arrowHelper} />;
};

const CityScene: React.FC<CitySceneProps> = ({ gltfPath, showFire, selectedLocation, resetCamera }) => {
  const { scene } = useGLTF(gltfPath);
  const sceneRef = useRef<Group>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (resetCamera && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetCamera]);

  const firePosition = selectedLocation ? LOCATIONS[selectedLocation] : null;
  const activeRoutes = ROUTES.filter(r => r.start === selectedLocation);

  return (
    <Canvas
      camera={{ position: [100, 50, 100], fov: 60 }}
      style={{ width: '100vw', height: '100vh', background: '#aaaaaa' }}
    >
      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 10, 0]}
        maxDistance={500}
        minDistance={10}
      />

      <ambientLight intensity={0.8} />
      <pointLight position={[-100, 100, -100]} intensity={0.7} />
      <pointLight position={[100, 100, 100]} intensity={0.7} />

      <Center>
        <primitive
          object={scene}
          ref={sceneRef}
          rotation={[0, Math.PI, 0]}
        />
      </Center>

      {showFire && firePosition && (
        <>
          <group position={firePosition}>
            <FireEffect />
          </group>
          <Html
            position={[firePosition[0], firePosition[1] + 10, firePosition[2]]}
            center
            sprite
            occlude
          >
            <div style={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: '20px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span>Fire at {selectedLocation}! Follow the arrows to reach a safe spot.</span>
            </div>
          </Html>
        </>
      )}

      {showFire && activeRoutes.map(route =>
        route.waypoints.map((name, index) => {
          if (index === route.waypoints.length - 1) return null;
          const point = LOCATIONS[name];
          const next = LOCATIONS[route.waypoints[index + 1]];
          const start: [number, number, number] = [point[0], point[1] + 2, point[2]];
          const end: [number, number, number] = [next[0], next[1] + 2, next[2]];
          return (
            <Arrow key={`${route.id}-${index}`} start={start} end={end} color={route.color} />
          );
        })
      )}

    </Canvas>
  );
};

export default CityScene;
