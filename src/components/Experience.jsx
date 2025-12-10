import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { Environment, Float, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

// Geometri acak untuk objek yang melayang
const Geometries = [
  { type: 'box', args: [1, 1, 1], color: '#4285F4' }, // Google Blue
  { type: 'sphere', args: [0.7], color: '#DB4437' },  // Google Red
  { type: 'cone', args: [0.7, 1.5, 32], color: '#F4B400' }, // Google Yellow
  { type: 'torus', args: [0.6, 0.2, 16, 32], color: '#0F9D58' }, // Google Green
  { type: 'box', args: [0.5, 2, 0.5], color: '#ffffff' }, // White Bar
]

function FloatingObject({ position, geometryData }) {
  const api = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Memberikan sedikit dorongan acak saat di-load
  useEffect(() => {
    if (api.current) {
        api.current.applyImpulse({ 
            x: (Math.random() - 0.5) * 2, 
            y: (Math.random() - 0.5) * 2, 
            z: (Math.random() - 0.5) * 2 
        }, true)
        api.current.addTorque({ 
            x: Math.random(), 
            y: Math.random(), 
            z: Math.random() 
        }, true)
    }
  }, [])

  return (
    <RigidBody 
      ref={api} 
      position={position} 
      restitution={0.9} // Memantul
      friction={0.1} 
      linearDamping={0.5} // Perlambat gerakan (efek zero gravity)
      angularDamping={0.5}
      colliders={geometryData.type === 'box' ? 'cuboid' : 'hull'}
    >
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
            // Dorong objek saat diklik
            api.current.applyImpulse({ 
                x: (Math.random() - 0.5) * 5, 
                y: (Math.random() - 0.5) * 5, 
                z: (Math.random() - 0.5) * 5 
            }, true)
        }}
      >
        {geometryData.type === 'box' && <boxGeometry args={geometryData.args} />}
        {geometryData.type === 'sphere' && <sphereGeometry args={geometryData.args} />}
        {geometryData.type === 'cone' && <coneGeometry args={geometryData.args} />}
        {geometryData.type === 'torus' && <torusGeometry args={geometryData.args} />}
        
        <meshStandardMaterial 
            color={hovered ? '#ff00ff' : geometryData.color} 
            roughness={0.2} 
            metalness={0.1} 
            emissive={hovered ? '#ff00ff' : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
    </RigidBody>
  )
}

function Walls() {
  const { viewport } = useThree()
  // Membuat dinding tak terlihat agar objek tetap di layar
  return (
    <>
      <CuboidCollider position={[0, -viewport.height / 2 - 2, 0]} args={[50, 2, 50]} /> {/* Floor */}
      <CuboidCollider position={[0, viewport.height / 2 + 2, 0]} args={[50, 2, 50]} /> {/* Ceiling */}
      <CuboidCollider position={[viewport.width / 2 + 2, 0, 0]} args={[2, 50, 50]} /> {/* Right */}
      <CuboidCollider position={[-viewport.width / 2 - 2, 0, 0]} args={[2, 50, 50]} /> {/* Left */}
      <CuboidCollider position={[0, 0, -10]} args={[50, 50, 2]} /> {/* Back */}
      <CuboidCollider position={[0, 0, 10]} args={[50, 50, 2]} /> {/* Front (Invisible glass) */}
    </>
  )
}

export default function Experience() {
  // Generate posisi acak untuk objek
  const objects = useMemo(() => {
    const items = []
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, 0],
        geometry: Geometries[Math.floor(Math.random() * Geometries.length)]
      })
    }
    return items
  }, [])

  return (
    <Canvas 
        shadows 
        camera={{ position: [0, 0, 15], fov: 45 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#171717' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4285F4" />
      
      {/* Physics World dengan Gravitasi 0 */}
      <Physics gravity={[0, 0, 0]}>
        {objects.map((obj) => (
          <FloatingObject key={obj.id} position={obj.position} geometryData={obj.geometry} />
        ))}
        <Walls />
      </Physics>

      <Environment preset="city" />
    </Canvas>
  )
}
