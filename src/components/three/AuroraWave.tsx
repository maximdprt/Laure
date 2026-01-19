import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uWaveHeight;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Simplified noise function
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }
  
  void main() {
    vPosition = position;
    vNormal = normal;
    
    // Create wave effect using noise
    vec3 pos = position;
    float wave = sin(pos.x * 0.1 + uTime * 0.5) * cos(pos.z * 0.1 + uTime * 0.3) * uWaveHeight;
    wave += sin(pos.x * 0.2 + uTime * 0.7) * cos(pos.z * 0.2 + uTime * 0.5) * uWaveHeight * 0.5;
    
    // Mouse interaction - subtle effect
    float mouseInfluence = 0.0;
    if (length(uMouse) > 0.0) {
      vec2 mousePos = uMouse * 10.0;
      float dist = distance(pos.xz, mousePos);
      mouseInfluence = exp(-dist * 0.1) * 2.0;
    }
    
    pos.y += wave + mouseInfluence;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    // Ocean colors - deep blue to cyan
    vec3 oceanDeep = vec3(0.04, 0.10, 0.18); // #0a1a2e
    vec3 oceanDark = vec3(0.09, 0.13, 0.24); // #16213e
    vec3 cyanBright = vec3(0.0, 0.85, 1.0);  // #00d9ff
    vec3 cyanSky = vec3(0.05, 0.65, 0.91);   // #0ea5e9
    
    // Aura colors
    vec3 auraGold = vec3(0.98, 0.75, 0.14);  // #fbbf24
    vec3 auraPurple = vec3(0.65, 0.55, 0.98); // #a78bfa
    
    // Base color gradient based on position
    float waveHeight = (vPosition.y + 5.0) / 10.0;
    vec3 baseColor = mix(oceanDeep, oceanDark, waveHeight);
    
    // Add cyan glow at wave peaks
    float peakGlow = max(0.0, vNormal.y);
    vec3 color = mix(baseColor, cyanBright, peakGlow * 0.6);
    
    // Add aura effect - golden/purple highlights
    float auraWave = sin(vPosition.x * 0.3 + uTime * 0.8) * cos(vPosition.z * 0.3 + uTime * 0.6);
    if (auraWave > 0.7) {
      color = mix(color, auraGold, 0.3);
    } else if (auraWave > 0.5) {
      color = mix(color, auraPurple, 0.2);
    }
    
    // Emissive glow
    float emissive = peakGlow * 0.5 + 0.1;
    color += cyanSky * emissive * 0.3;
    
    gl_FragColor = vec4(color, 0.8);
  }
`

export default function AuroraWave() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const { size, viewport } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Create plane geometry
  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(40, 40, 100, 100)
    return plane
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / size.width) * 2 - 1
      const y = -(e.clientY / size.height) * 2 + 1
      mouseRef.current = { x: x * viewport.width * 0.5, y: y * viewport.height * 0.5 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [size.width, size.height, viewport.width, viewport.height])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value = [
        mouseRef.current.x,
        mouseRef.current.y,
      ]
    }
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: [0, 0] },
      uWaveHeight: { value: 2.0 },
    }),
    []
  )

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, 0]}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
