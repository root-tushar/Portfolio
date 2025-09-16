'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ShaderHero() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create gradient plane
    const geometry = new THREE.PlaneGeometry(20, 20)
    
    // Custom shader material for gradient effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Create animated gradient
          vec3 color1 = vec3(0.898, 0.224, 0.208); // #E53935
          vec3 color2 = vec3(0.176, 0.463, 0.824); // #1976D2
          vec3 color3 = vec3(0.180, 0.800, 0.443); // #2ECC71
          
          float t = time * 0.5;
          float wave1 = sin(uv.x * 3.0 + t) * 0.5 + 0.5;
          float wave2 = sin(uv.y * 2.0 + t * 1.5) * 0.5 + 0.5;
          
          vec3 color = mix(color1, color2, wave1);
          color = mix(color, color3, wave2);
          
          // Add some noise
          float noise = sin(uv.x * 50.0 + t * 2.0) * sin(uv.y * 50.0 + t * 2.0) * 0.1;
          color += noise;
          
          // Fade edges
          float edge = 1.0 - smoothstep(0.0, 0.1, uv.x) - smoothstep(0.9, 1.0, uv.x);
          edge *= 1.0 - smoothstep(0.0, 0.1, uv.y) - smoothstep(0.9, 1.0, uv.y);
          
          gl_FragColor = vec4(color * edge, edge * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    // Animation loop
    const animate = (time: number) => {
      if (material.uniforms) {
        material.uniforms.time.value = time * 0.001
      }
      
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        if (material.uniforms && material.uniforms.resolution) {
          material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
        renderer.dispose()
      }
      if (geometry) geometry.dispose()
      if (material) material.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
