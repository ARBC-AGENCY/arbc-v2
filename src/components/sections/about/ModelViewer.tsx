"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { BG } from "./_constants";

/**
 * Renders the ARBC 3D mascot using Three.js (dynamic import).
 * Colour system and wave-loop animation are ported from ARBCModel.jsx
 * and ARBCAnimations.js respectively.  No hover / master timeline.
 */
export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let cleanupFn: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      // @ts-ignore — path varies across three minor versions
      const { GLTFLoader } =
        await import("three/examples/jsm/loaders/GLTFLoader.js");
      // @ts-ignore
      const { OrbitControls } =
        await import("three/examples/jsm/controls/OrbitControls.js");

      // Clear any stale canvas left by HMR
      while (mount.firstChild) mount.removeChild(mount.firstChild);

      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(
        45,
        mount.clientWidth / mount.clientHeight,
        0.1,
        1000,
      );

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      mount.appendChild(renderer.domElement);

      // ── Lights ──────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 2));
      const dir = new THREE.DirectionalLight(0xffffff, 5);
      dir.position.set(1, 1, 1);
      dir.castShadow = true;
      scene.add(dir);

      // ── Controls ─────────────────────────────────────────────────────────────
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableRotate = false;

      // ── Material system (ARBCModel.jsx) ──────────────────────────────────────
      const MATS: Record<string, any> = {
        primary: new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          metalness: 0.1,
          roughness: 0.2,
        }),
        secondary: new THREE.MeshLambertMaterial({ color: 0xbf330d }),
        tertiary: new THREE.MeshStandardMaterial({
          color: 0x54545b,
          metalness: 0.1,
          roughness: 0.7,
        }),
        darkgray: new THREE.MeshStandardMaterial({
          color: 0x3d3d3d,
          metalness: 0.1,
          roughness: 0.7,
        }),
        white: new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.1,
          roughness: 0.7,
        }),
        transparent: new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          transparent: true,
          opacity: 0,
        }),
      };

      function applyARBCColors(model: any) {
        [
          { name: "Text_5", m: "primary" },
          { name: "Text_4", m: "primary" },
          { name: "Text_3", m: "primary" },
          { name: "Text_2", m: "primary" },
          { name: "Text", m: "primary" },
          { name: "Sgnal_d", m: "primary" },
          { name: "Sgnal_g", m: "primary" },
          { name: "A01", m: "primary" },
          { name: "B01", m: "primary" },
          { name: "C01", m: "primary" },
          { name: "R01", m: "secondary" },
        ].forEach(({ name, m }) => {
          const el = model.getObjectByName(name);
          if (el)
            el.traverse((c: any) => {
              if (c.isMesh) c.material = MATS[m].clone();
            });
        });
      }

      function customizeInnerElements(model: any) {
        const inner: Record<string, string> = {
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
        const groups: Record<string, string> = {
          LUNETTE: "tertiary",
          ASourire: "tertiary",
          A_ZoneSmile: "primary",
        };
        Object.entries(groups).forEach(([gName, def]) => {
          const g = model.getObjectByName(gName);
          if (g?.type === "Object3D") {
            g.traverse((c: any) => {
              if (c.isMesh && c.name)
                c.material = MATS[inner[c.name] ?? def].clone();
            });
          }
        });
        Object.entries(inner).forEach(([n, m]) => {
          const el = model.getObjectByName(n);
          if (el && (el as any).isMesh) (el as any).material = MATS[m].clone();
        });
      }

      // ── Wave-loop animation (ARBCAnimations.js — wave only, no hover) ─────────
      function buildWaveTimeline(model: any): any {
        const root = model.getObjectByName("ARBC_FUNmodel_Web");
        if (!root) return null;

        const A01 = root.getObjectByName("A01");
        const B01 = root.getObjectByName("B01");
        const C01 = root.getObjectByName("C01");
        const R01 = root.getObjectByName("R01");
        const IC01 = model.getObjectByName("IC01");

        const r01Base = R01
          ? { pos: R01.position.clone(), rot: R01.rotation.clone() }
          : null;

        const wd = 0.3; // waveDelay
        const sd = 0.3; // scaleDuration
        const sa = 1.1; // scaleAmount

        const tl = gsap.timeline({
          repeat: -1,
          paused: true,
          defaults: { ease: "power1.inOut", duration: 0.6 },
        });

        if (A01) {
          tl.set(A01.scale, { x: 1, y: 1, z: 1 }, 0)
            .to(A01.scale, { x: sa, y: sa, z: sa, duration: sd }, 0)
            .to(A01.position, { x: "-=25", y: "+=20", duration: sd }, 0)
            .to(A01.rotation, { z: "-=0.2", duration: sd }, 0)
            .to(A01.scale, { x: 1, y: 1, z: 1, duration: sd }, sd)
            .to(A01.position, { x: "+=25", y: "-=20", duration: sd }, sd)
            .to(A01.rotation, { z: "+=0.2", duration: sd }, sd);
        }
        if (R01) {
          tl.to(
            R01.scale,
            { x: sa - 0.05, y: sa - 0.05, z: sa - 0.05, duration: sd },
            wd,
          )
            .to(R01.position, { x: "+=7", y: "+=30", duration: sd }, wd)
            .to(R01.rotation, { z: "+=0.1", duration: sd }, wd)
            .to(R01.scale, { x: 1, y: 1, z: 1, duration: sd }, wd + sd)
            .to(
              R01.position,
              { x: r01Base?.pos.x ?? 0, y: r01Base?.pos.y ?? 0, duration: sd },
              wd + sd,
            )
            .to(
              R01.rotation,
              { z: r01Base?.rot.z ?? 0, duration: sd },
              wd + sd,
            );
        }
        if (IC01) {
          const t0 = wd * 2.5 + sd;
          tl.to(IC01.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, t0).to(
            IC01.position,
            { x: "+=100", y: "+=130", z: "+=120", duration: 0.3 },
            t0,
          );
        }
        if (B01) {
          const t0 = wd * 5.5;
          tl.to(
            B01.scale,
            { x: sa - 0.02, y: sa - 0.02, z: sa - 0.02, duration: sd },
            t0,
          )
            .to(B01.position, { x: "-=6", y: "-=5", duration: sd }, t0)
            .to(B01.rotation, { x: "+=0.13", z: "+=0.1", duration: sd }, t0)
            .to(B01.scale, { x: 1, y: 1, z: 1, duration: sd }, t0 + sd)
            .to(B01.position, { x: "+=6", y: "+=5", duration: sd }, t0 + sd)
            .to(
              B01.rotation,
              { x: "-=0.13", z: "-=0.1", duration: sd },
              t0 + sd,
            );
        }
        if (C01) {
          const t0 = wd * 6.5;
          tl.to(C01.scale, { x: sa, y: sa, z: sa, duration: sd }, t0)
            .to(C01.position, { x: "+=25", y: "-=25", duration: sd }, t0)
            .to(
              C01.rotation,
              { x: "-=0.2", y: "-=0.4", z: "-=0.1", duration: sd },
              t0,
            )
            .to(C01.scale, { x: 1, y: 1, z: 1, duration: sd }, t0 + sd)
            .to(C01.position, { x: "-=25", y: "+=25", duration: sd }, t0 + sd)
            .to(
              C01.rotation,
              { x: "+=0.2", y: "+=0.4", z: "+=0.1", duration: sd },
              t0 + sd,
            );
        }
        if (IC01) {
          const t0 = wd * 7 + sd * 2;
          tl.to(IC01.scale, { x: 0, y: 0, z: 0, duration: 0.3 }, t0).to(
            IC01.position,
            { x: "-=20", y: "-=60", z: "-=120", duration: 0.3 },
            t0,
          );
        }

        tl.set({}, {}, wd * 3 + sd * 2 + 0.5 + 2); // pause before loop
        return tl;
      }

      // ── Load GLB ─────────────────────────────────────────────────────────────
      let waveTl: any = null;
      const loader = new GLTFLoader();
      loader.load(
        "/models/home_arbc_copy.glb",
        (gltf: any) => {
          const model = gltf.scene;

          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.x += model.position.x - center.x;
          model.position.y += model.position.y - center.y;
          model.position.z += model.position.z - center.z;

          scene.add(model);
          applyARBCColors(model);
          customizeInnerElements(model);

          const root = model.getObjectByName("ARBC_FUNmodel_Web");
          if (root) root.scale.set(1.3, 1.3, 1.3);

          const size = box.getSize(new THREE.Vector3()).length();
          camera.position.z = size * 1.5;
          controls.update();

          waveTl = buildWaveTimeline(model);
          waveTl?.play();

          setLoading(false);
        },
        undefined,
        (err: any) => {
          console.error("Model load error", err);
          setLoading(false);
        },
      );

      // ── Resize ───────────────────────────────────────────────────────────────
      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Render loop ──────────────────────────────────────────────────────────
      let animId: number;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      cleanupFn = () => {
        waveTl?.kill();
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        scene.traverse((o: any) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material))
              o.material.forEach((m: any) => m.dispose());
            else o.material.dispose();
          }
        });
        renderer.dispose();
        if (mount.contains(renderer.domElement))
          mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      cleanupFn?.();
    };
  }, []);

  return (
    <div
      style={{
        width: "clamp(360px, 36vw, 480px)",
        height: "clamp(260px, 36vw, 480px)",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* mountRef is always empty from React's perspective — Three.js owns it */}
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              opacity: 0.4,
              color: "#e5e2e1",
            }}
          >
            Initializing…
          </span>
        </div>
      )}
    </div>
  );
}
