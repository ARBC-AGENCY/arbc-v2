"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ARBCModel = ({
  className = "",
  modelPath = "/models/home_arbc_copy.glb",
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationManagerRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const cleanupRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Store cleanup function
    cleanupRef.current = () => {
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };

    camera.userData = { canvas: renderer.domElement };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);
    scene.add(ambientLight);

    // Controls
    let controls;
    if (typeof window !== "undefined") {
      import("three/examples/jsm/controls/OrbitControls").then(
        ({ OrbitControls }) => {
          controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.enablePan = false;
          controls.enableZoom = false;
          controls.enableRotate = false;
        }
      );
    }

    // Color system
    const COLORS = {
      primary: 0xcccccc,
      secondary: 0xbf330d,
      tertiary: 0x54545b,
      darkgray: 0x3d3d3d,
      white: 0xffffff,
      black: 0x000000,
      transparent: 0xcccccc,
    };

    const MATERIALS = {
      primary: new THREE.MeshStandardMaterial({
        color: COLORS.primary,
        metalness: 0.1,
        roughness: 0.2,
      }),
      secondary: new THREE.MeshLambertMaterial({
        color: COLORS.secondary,
      }),
      tertiary: new THREE.MeshStandardMaterial({
        color: COLORS.tertiary,
        metalness: 0.1,
        roughness: 0.7,
      }),
      darkgray: new THREE.MeshStandardMaterial({
        color: COLORS.darkgray,
        metalness: 0.1,
        roughness: 0.7,
      }),
      white: new THREE.MeshStandardMaterial({
        color: COLORS.white,
        metalness: 0.1,
        roughness: 0.7,
      }),
      transparent: new THREE.MeshStandardMaterial({
        color: COLORS.transparent,
        transparent: true,
        opacity: 0.0,
        metalness: 0.1,
        roughness: 0.7,
      }),
    };

    function applyARBCColors(scene) {
      const elementsToColor = [
        { name: "Text_5", material: "primary" },
        { name: "Text_4", material: "primary" },
        { name: "Text_3", material: "primary" },
        { name: "Text_2", material: "primary" },
        { name: "Text", material: "primary" },
        { name: "Sgnal_d", material: "primary" },
        { name: "Sgnal_g", material: "primary" },
        { name: "A01", material: "primary" },
        { name: "B01", material: "primary" },
        { name: "C01", material: "primary" },
        { name: "R01", material: "secondary" },
      ];

      elementsToColor.forEach(({ name, material }) => {
        const element = scene.getObjectByName(name);
        if (element) {
          element.traverse((child) => {
            if (child.isMesh) {
              child.material = MATERIALS[material].clone();
            }
          });
        }
      });
    }

    function customizeInnerElements(scene) {
      const innerElementColors = {
        eye: "tertiary",
        eye_2: "tertiary",
        A: "primary",
        aCIL: "white",
        aCIL2: "white",
        B4: "tertiary",
        carre: "transparent",
        clin: "tertiary",
        clin02: "tertiary",
        B: "primary",
        gl_Ligne001: "darkgray",
        C: "primary",
        gl_Ligne002: "tertiary",
        R: "secondary",
        RCil02: "darkgray",
        RCil01: "darkgray",
        Shape_10: "darkgray",
        Shape_9: "darkgray",
        Path_11: "darkgray",
        RB01: "darkgray",
        RB02: "darkgray",
        B3: "tertiary",
        Bs: "tertiary",
        B2: "tertiary",
        B1: "tertiary",
        X006: "primary",
        X005: "primary",
        X004: "primary",
        X003: "primary",
        X002: "primary",
        X001: "primary",
        Path_6: "primary",
        Path_5: "primary",
        Path_4: "primary",
        Path_3: "primary",
        Path_2: "primary",
        Path_1: "primary",
        IC01: "primary",
        Shape_4: "primary",
        Shape_3: "primary",
        Shape_2: "tertiary",
        Shape: "primary",
        Path: "tertiary",
      };

      const groupColorMappings = {
        LUNETTE: "tertiary",
        ASourire: "tertiary",
        A_ZoneSmile: "primary",
      };

      Object.entries(groupColorMappings).forEach(
        ([groupName, defaultColor]) => {
          const group = scene.getObjectByName(groupName);
          if (group && group.type === "Object3D") {
            group.traverse((child) => {
              if (child.isMesh && child.name) {
                const customMaterial = innerElementColors[child.name];
                const materialToUse = customMaterial || defaultColor;
                child.material = MATERIALS[materialToUse].clone();
              }
            });
          }
        }
      );

      Object.entries(innerElementColors).forEach(
        ([elementName, materialType]) => {
          const element = scene.getObjectByName(elementName);
          if (element && element.isMesh) {
            element.material = MATERIALS[materialType].clone();
          }
        }
      );
    }

    function scaleARBCModel(scene, scaleValue = 1.3) {
      const arbcModel = scene.getObjectByName("ARBC_FUNmodel_Web");
      if (arbcModel) {
        arbcModel.scale.set(scaleValue, scaleValue, scaleValue);
      }
    }

    const setupMouseTracking = () => {
      const canvas = renderer.domElement;

      const handleMouseMove = (event) => {
        if (animationManagerRef.current) {
          const rect = canvas.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;
          animationManagerRef.current.checkHover(mouseX, mouseY, camera);
        }
      };

      const handleMouseLeave = () => {
        if (
          animationManagerRef.current &&
          animationManagerRef.current.isHovered
        ) {
          animationManagerRef.current.playHoverOut();
        }
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    // ⚡ CRITICAL: Load the GLB model - CHECK CACHE FIRST!
    const loadModel = async () => {
      try {
        // 🚀 CHECK IF MODEL IS ALREADY IN CACHE
        if (window.__modelCache && window.__modelCache[modelPath]) {
          const cachedGltf = window.__modelCache[modelPath];

          // Clone the cached scene to avoid issues with multiple instances
          const model = cachedGltf.scene.clone();

          // Center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.x += model.position.x - center.x;
          model.position.y += model.position.y - center.y;
          model.position.z += model.position.z - center.z;

          // Add to scene
          scene.add(model);

          // Apply styling
          applyARBCColors(model);
          customizeInnerElements(model);
          scaleARBCModel(model, 1.3);

          // Initialize animations
          setTimeout(async () => {
            if (typeof window !== "undefined" && window.gsap) {
              const ARBCAnimations = await import("@/utils/ARBCAnimations");
              animationManagerRef.current = new ARBCAnimations.default(model);
              setupMouseTracking();
            }
          }, 100);

          // Adjust camera
          const size = box.getSize(new THREE.Vector3()).length();
          camera.position.z = size * 1.5;
          if (controls) controls.update();

          // ✅ Set loading to false IMMEDIATELY
          setIsLoading(false);
          return; // EXIT - Don't load from network
        }

        // If not in cache, load from network (shouldn't happen after preloader)
        console.warn("⚠️ Model not in cache, loading from network...");
        const [{ GLTFLoader }, ARBCAnimations] = await Promise.all([
          import("three/examples/jsm/loaders/GLTFLoader"),
          import("@/utils/ARBCAnimations"),
        ]);

        const loader = new GLTFLoader();

        loader.load(
          modelPath,
          function (glb) {
            const model = glb.scene;

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.x += model.position.x - center.x;
            model.position.y += model.position.y - center.y;
            model.position.z += model.position.z - center.z;

            scene.add(model);

            applyARBCColors(model);
            customizeInnerElements(model);
            scaleARBCModel(model, 1.3);

            setTimeout(() => {
              if (typeof window !== "undefined" && window.gsap) {
                animationManagerRef.current = new ARBCAnimations.default(model);
                setupMouseTracking();
              }
            }, 500);

            const size = box.getSize(new THREE.Vector3()).length();
            camera.position.z = size * 1.5;
            if (controls) controls.update();

            setIsLoading(false);
          },
          function (progress) {
            if (progress.total > 0) {
              const percentComplete = (progress.loaded / progress.total) * 100;
            }
          },
          function (error) {
            console.error("❌ Error loading model:", error);
            setError("Failed to load 3D model");
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.error("Error initializing loader:", err);
        setError("Failed to initialize 3D loader");
        setIsLoading(false);
      }
    };

    loadModel();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    function animate() {
      requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [modelPath]);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mountRef} className="w-full h-full" />

      {/* Only show minimal loading if model not in cache */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-sm opacity-70">Initializing...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-50">
          <div className="text-white text-center">
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARBCModel;
