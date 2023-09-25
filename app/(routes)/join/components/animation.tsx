"use client";

import { useEffect } from "react";
import * as THREE from "three";

const StarryBackground = () => {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //set position absolute
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    renderer.domElement.style.height = "100vh";
    renderer.domElement.style.zIndex = "-10";

    // change background color to background-color: #010409;

    renderer.setClearColor(
      new THREE.Color(
        "hsl(277.1428571428571, 91.30434782608695%, 4.509803921568627%)"
      ),
      1
    );

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      opacity: 0.6,
      // make shape to circle
      map: new THREE.TextureLoader().load(
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png"
      ),
    });

    const starsVertices = [];
    const starsSizes = [];

    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = -Math.random() * 2000;

      starsVertices.push(x, y, z);

      // Randomize star sizes
      const size = Math.random() * 0.2;
      starsSizes.push(size);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    starsGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(starsSizes, 1)
    );

    starsMaterial.sizeAttenuation = false; // Prevent size attenuation based on depth

    const stars = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(stars);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
};

export default StarryBackground;
