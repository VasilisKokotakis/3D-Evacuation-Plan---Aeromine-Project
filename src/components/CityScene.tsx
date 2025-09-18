import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';
import FireEffect from './FireEffect';

interface CitySceneProps {
  gltfPath: string;
  showFire: boolean;
  selectedLocation: string;
  resetCamera: boolean;
}

interface ArrowProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

const Arrow: React.FC<ArrowProps> = ({ start, end, color = 'blue' }) => {
  const startVec = new Vector3(...start);
  const endVec = new Vector3(...end);
  const direction = new Vector3().subVectors(endVec, startVec).normalize();
  const length = startVec.distanceTo(endVec);

  const arrowHelper = new THREE.ArrowHelper(
    direction,
    startVec,
    length,
    new THREE.Color(color),
    5, // Head Length
    2  // Head Width
  );

  return <primitive object={arrowHelper} />;
};


const CityScene: React.FC<CitySceneProps> = ({ gltfPath, showFire, selectedLocation, resetCamera }) => {
  const { scene } = useGLTF(gltfPath);
  const sceneRef = useRef<Group>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (resetCamera && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetCamera]);

  const cityLocations: { [key: string]: [number, number, number] } = {
    'OTE Building': [-40, 1, 25],
    'Road Point 1': [-43, 1, 18],
    'Road Point 2': [-7, 1, -30],
    'OAKA': [15, 1, -15],
    // --- ADDED NEW LOCATIONS ---
    'two': [-29.8, 1, 14],
    'three': [-15, 1, 20],
    'four': [0, 1, 25],
    'five': [18.5, 1, 12],
    'six': [1, 1, 2],
    'seven': [15, 1, -15],
    // ---------------------------
  };

  const firePosition = selectedLocation ? cityLocations[selectedLocation] : null;

  const navigationPaths: { [key: string]: { path: [number, number, number][], safeSpot: string } } = {
    'OTE Building': { // Original path to OAKA
      path: [
        cityLocations['OTE Building'],
        cityLocations['Road Point 1'],
        cityLocations['Road Point 2'],
        cityLocations['OAKA']
      ],
      safeSpot: 'OAKA'
    },
    // --- ADDED NEW PATH ---
    'OTE Building - Path 2': {
      path: [
        cityLocations['OTE Building'],
        cityLocations['two'],
        cityLocations['three'],
        cityLocations['four'],
        cityLocations['five'],
        cityLocations['six'],
        cityLocations['seven']
      ],
      safeSpot: 'Some New Safe Spot' // You can set an appropriate safe spot name here
    }
    // ----------------------
  };

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
          // scale={0.1} // Uncomment and adjust if your city model is too big/small
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
              <span>Fire in OTE's building, please use arrows to go to OAKA!</span>
            </div>
          </Html>
        </>
      )}

      {/* --- NEW: Render Navigation Arrows for all relevant paths --- */}
      {showFire && selectedLocation && (
        Object.keys(navigationPaths).map(pathKey => {
          const pathData = navigationPaths[pathKey];
          // Check if this path's starting point matches the selected fire location
          // And if the selected location is 'OTE Building'
          if (selectedLocation === 'OTE Building' && pathData.path[0] === cityLocations['OTE Building']) {
            return (
              <React.Fragment key={pathKey}> {/* Use React Fragment to group arrows of each path */}
                {pathData.path.map((point, index) => {
                  // Only draw an arrow if there's a next point in the path
                  if (index < pathData.path.length - 1) {
                    const nextPoint = pathData.path[index + 1];
                    // Raise the arrow slightly above the ground (Y-coordinate)
                    const adjustedStart = [point[0], point[1] + 2, point[2]] as [number, number, number];
                    const adjustedEnd = [nextPoint[0], nextPoint[1] + 2, nextPoint[2]] as [number, number, number];

                    return (
                      <Arrow
                        key={`${pathKey}-${index}`} // Unique key for each arrow across paths
                        start={adjustedStart}
                        end={adjustedEnd}
                        color={pathKey === 'OTE Building' ? "yellow" : "lime"} // Yellow for original, Lime for new path
                        // You can still adjust headLength and headWidth inside the Arrow component definition
                      />
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            );
          }
          return null;
        })
      )}
      {/* --- END NEW --- */}

    </Canvas>
  );
};

export default CityScene;