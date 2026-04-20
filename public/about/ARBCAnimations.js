// utils/ARBCAnimations.js
import * as THREE from "three";

class ARBCAnimations {
  constructor(scene) {
    this.scene = scene;
    this.arbcModel = null;
    this.isHovered = false;
    this.masterTimeline = null;
    this.waveLoopTimeline = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.baseStates = new Map();
    this.init();
  }

  init() {
    // Check if GSAP is available
    if (typeof window === "undefined" || !window.gsap) {
      console.warn("GSAP not available, animations disabled");
      return;
    }

    // Find the main ARBC model group
    this.arbcModel = this.scene.getObjectByName("ARBC_FUNmodel_Web");
    if (!this.arbcModel) {
      console.error("ARBC_FUNmodel_Web not found in scene");
      return;
    }

    this.storeBaseStates();
    this.createMasterTimeline();
    this.createWaveLoopAnimation();
    this.startWaveLoop();
  }

  storeBaseStates() {
    // Store original states for all elements that will be animated
    const animatedElements = [
      "A01",
      "B01",
      "C01",
      "R01",
      "IC01", // Make sure IC01 is included
      "A",
      "B",
      "C",
      "R",
      "ASourire",
      "LUNETTE",
      "A_ZoneSmile",
      "aCIL",
      "aCIL2",
      "RCil01",
      "RCil02",
      "gl_Ligne001",
      "gl_Ligne002",
      "Path_6",
      "Path_5",
      "Path_4",
      "Path_3",
      "Path_2",
      "Path_1",
    ];

    animatedElements.forEach((name) => {
      const element =
        this.arbcModel.getObjectByName(name) ||
        this.scene.getObjectByName(name);
      if (element) {
        this.baseStates.set(name, {
          position: element.position.clone(),
          scale: element.scale.clone(),
          rotation: element.rotation.clone(),
        });
      }
    });
  }

  createWaveLoopAnimation() {
    if (!window.gsap) return;

    // Create the wave loop timeline
    this.waveLoopTimeline = window.gsap.timeline({
      repeat: -1, // Infinite loop
      paused: true,
      defaults: {
        ease: "power2.inOut",
        duration: 0.6,
      },
    });

    // Get elements for wave animation
    const A01 = this.arbcModel.getObjectByName("A01");
    const B01 = this.arbcModel.getObjectByName("B01");
    const C01 = this.arbcModel.getObjectByName("C01");
    const R01 = this.arbcModel.getObjectByName("R01");
    const IC01 = this.scene.getObjectByName("IC01");
    const IC01path = this.scene.getObjectByName("Path");

    // Define timing for each element (staggered wave effect)
    const waveDelay = 0.3; // Time between each element animation
    const scaleDuration = 0.3;
    const scaleAmount = 1.1;

    // A01 Animation (starts immediately)
    if (A01) {
      this.waveLoopTimeline
        // Scale up and move position + rotate (first half)

        .set(A01.scale, { x: 1, y: 1, z: 1 }, 0)

        .to(
          A01.scale,
          {
            x: scaleAmount,
            y: scaleAmount,
            z: scaleAmount,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          A01.position,
          {
            x: "-=25",
            y: "+=20",
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          A01.rotation,
          {
            z: "-=0.2",
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          0
        )
        // Scale down and return to original position + rotation (second half)
        .to(
          A01.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          scaleDuration
        )
        .to(
          A01.position,
          {
            x: "+=25", // Return to original position
            y: "-=20", // Return to original position
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          scaleDuration
        )
        .to(
          A01.rotation,
          {
            z: "+=0.2", // Return to original rotation
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          scaleDuration
        );
    }

    // R01 Animation (after A01)
    if (R01) {
      // Store the original position for absolute reset
      const r01BaseState = this.baseStates.get("R01");

      this.waveLoopTimeline
        // Forward animation - starts after A01 begins
        .to(
          R01.scale,
          {
            x: scaleAmount - 0.05,
            y: scaleAmount - 0.05,
            z: scaleAmount - 0.05,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay // 0.7s
        )
        .to(
          R01.position,
          {
            x: "+=7",
            y: "+=30",
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay // 0.7s
        )
        .to(
          R01.rotation,
          {
            z: "+=0.1",
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay
        )
        // Return animation - starts AFTER forward animation completes
        .to(
          R01.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay + scaleDuration // 1.2s - after forward completes
        )
        .to(
          R01.position,
          {
            // Use absolute positioning to ensure exact return
            x: r01BaseState ? r01BaseState.position.x : 0,
            y: r01BaseState ? r01BaseState.position.y : 0,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay + scaleDuration // 1.2s
        )
        .to(
          R01.rotation,
          {
            // Use absolute rotation to ensure exact return
            z: r01BaseState ? r01BaseState.rotation.z : 0,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay + scaleDuration // 1.2s
        );
    }

    // B01 Animation (after A01)
    if (B01) {
      this.waveLoopTimeline
        .to(
          B01.scale,
          {
            x: scaleAmount - 0.02,
            y: scaleAmount - 0.02,
            z: scaleAmount - 0.02,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay * 5.5
        )
        .to(
          B01.position,
          {
            x: "-=6", // Move right
            y: "-=5", // Move down
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay * 5.5
        )
        .to(
          B01.rotation,
          {
            x: "+=0.13",
            z: "+=0.1", // Rotate clockwise
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay * 5.5
        )
        // Return to original state
        .to(
          B01.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay * 5.5 + scaleDuration
        )
        .to(
          B01.position,
          {
            x: "+=6", // Return to original position
            y: "+=5", // Return to original position
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay * 5.5 + scaleDuration
        )
        .to(
          B01.rotation,
          {
            x: "-=0.13",
            z: "-=0.1", // Return to original rotation
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          waveDelay * 5.5 + scaleDuration
        );
    }

    // IC01 Animation (appears after R01 finishes scaling up) - THIS WAS MISSING!
    if (IC01) {
      const ic01StartTime = waveDelay * 2.5 + scaleDuration;

      this.waveLoopTimeline
        .to(
          IC01.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          ic01StartTime
        )
        .to(
          IC01.position,
          {
            x: "+=100",
            y: "+=130",
            z: "+=120",
            duration: 0.3,
            ease: "power1.inOut",
          },
          ic01StartTime
        );

      // IC01path animation if it exists
      if (IC01path) {
        this.waveLoopTimeline.to(
          IC01path.position,
          {
            x: "-=40",
            y: "-=55",
            z: "+=0",
            duration: 0.3,
            ease: "power1.inOut",
          },
          ic01StartTime
        );
      }
    }

    // C01 Animation (after IC01 appears)
    if (C01) {
      const c01StartTime = waveDelay * 6.5;

      this.waveLoopTimeline
        .to(
          C01.scale,
          {
            x: scaleAmount,
            y: scaleAmount,
            z: scaleAmount,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          c01StartTime
        )
        .to(
          C01.position,
          {
            x: "+=25", // Move left
            y: "-=25", // Move up
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          c01StartTime
        )
        .to(
          C01.rotation,
          {
            x: "-=0.2",
            y: "-=0.4",
            z: "-=0.1", // Rotate counter-clockwise
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          c01StartTime
        )
        // Return to original state
        .to(
          C01.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          c01StartTime + scaleDuration
        )
        .to(
          C01.position,
          {
            x: "-=25", // Return to original position
            y: "+=25", // Return to original position
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          c01StartTime + scaleDuration
        )
        .to(
          C01.rotation,
          {
            x: "+=0.2",
            y: "+=0.4",
            z: "+=0.1", // Return to original rotation
            duration: scaleDuration,
            ease: "power1.inOut",
          },
          c01StartTime + scaleDuration
        );
    }

    // IC01 hide animation (after C01 finishes) - THIS WAS ALSO MISSING!
    if (IC01) {
      const ic01HideTime = waveDelay * 7 + scaleDuration * 2;

      this.waveLoopTimeline
        .to(
          IC01.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.3,
            ease: "power1.inOut",
          },
          ic01HideTime
        )
        .to(
          IC01.position,
          {
            x: "-=20",
            y: "-=60",
            z: "-=120",
            duration: 0.3,
            ease: "power1.inOut",
          },
          ic01HideTime
        );
    }

    // Add a pause before the loop repeats
    const totalDuration = waveDelay * 3 + scaleDuration * 2 + 0.5;
    this.waveLoopTimeline.set({}, {}, totalDuration + 2); // 4 second pause
  }

  createMasterTimeline() {
    if (!window.gsap) return;

    this.masterTimeline = window.gsap.timeline({
      paused: true,
      defaults: {
        ease: "power1.inOut",
        duration: 0.1,
      },
    });

    this.addMainLetterAnimations();
    this.addSubElementAnimations();
    this.addDetailAnimations();
  }

  addMainLetterAnimations() {
    if (!window.gsap || !this.arbcModel) return;

    const arbcModel = this.scene.getObjectByName("ARBC_FUNmodel_Web");
    const Path_6_1 = this.arbcModel.getObjectByName("Path_6");
    const Path_5_1 = this.arbcModel.getObjectByName("Path_5");
    const Path_4_1 = this.arbcModel.getObjectByName("Path_4");
    const Path_3_1 = this.arbcModel.getObjectByName("Path_3");
    const Path_2_1 = this.arbcModel.getObjectByName("Path_2");
    const Path_1 = this.arbcModel.getObjectByName("Path_1");
    const X006 = this.arbcModel.getObjectByName("X006");
    const X005 = this.arbcModel.getObjectByName("X005");
    const X004 = this.arbcModel.getObjectByName("X004");
    const X003 = this.arbcModel.getObjectByName("X003");
    const X002 = this.arbcModel.getObjectByName("X002");
    const X001 = this.arbcModel.getObjectByName("X001");

    // Second hierarchy elements
    const aCIL2 = this.arbcModel.getObjectByName("aCIL2");
    const aCIL = this.arbcModel.getObjectByName("aCIL");
    const eye2 = this.arbcModel.getObjectByName("eye_2");
    const eye1 = this.arbcModel.getObjectByName("eye");
    const clin1 = this.arbcModel.getObjectByName("clin");
    const clin2 = this.arbcModel.getObjectByName("clin02");
    const B4 = this.arbcModel.getObjectByName("B4");
    const B3 = this.arbcModel.getObjectByName("B3");
    const B2 = this.arbcModel.getObjectByName("B2");
    const B1 = this.arbcModel.getObjectByName("B1");
    const BS = this.arbcModel.getObjectByName("Bs");
    const RB01 = this.arbcModel.getObjectByName("RB01");
    const RB02 = this.arbcModel.getObjectByName("RB02");
    const RCil02 = this.arbcModel.getObjectByName("RCil02");
    const RCil01 = this.arbcModel.getObjectByName("RCil01");

    // Scale up the entire model
    if (arbcModel) {
      this.masterTimeline.to(
        arbcModel.scale,
        {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          duration: 0.5,
          ease: "ease.inOut",
        },
        0
      );
    }

    // aCIL animations
    if (aCIL2) {
      this.masterTimeline
        .to(
          aCIL2.rotation,
          {
            x: 0,
            y: 0,
            z: "+=0.2",
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          aCIL2.position,
          {
            y: "-=8",
            x: "-=3",
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        );
    }

    if (aCIL) {
      this.masterTimeline
        .to(
          aCIL.rotation,
          {
            x: 0,
            y: 0,
            z: "-=0.2",
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          aCIL.position,
          {
            y: "-=5",
            x: "-=3",
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        );
    }

    // Eye animations
    if (eye2 && eye1) {
      this.masterTimeline
        .to(
          eye2.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          eye1.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        );
    }

    // Clin animations
    if (clin1 && clin2) {
      this.masterTimeline
        .to(
          clin1.position,
          {
            x: "+=2",
            y: "+=0.95",
            z: "-=5",
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          clin1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          clin2.position,
          {
            x: "+=0.5",
            y: "-=0.95",
            z: "-=5",
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          clin2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        );
    }

    // B animations
    if (B4 && B3 && B2 && B1 && BS) {
      this.masterTimeline
        .to(
          BS.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          B4.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          B3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          B2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          B1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        );
    }

    // R Letter Animation
    if (RB01 && RB02) {
      this.masterTimeline
        .to(
          RB01.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          RB01.position,
          {
            z: "-=5",
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          RB02.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        );
    }

    if (RCil02 && RCil01) {
      this.masterTimeline
        .to(
          RCil02.rotation,
          {
            z: 0,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          RCil02.position,
          {
            x: -17,
            y: 160,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          RCil01.rotation,
          {
            z: 0,
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          RCil01.position,
          {
            x: "-=7",
            y: "+=12",
            z: "-=5",
            duration: 0.4,
            ease: "ease.inOut",
          },
          0
        );
    }

    // Path animations
    if (Path_6_1 && Path_5_1 && Path_4_1 && Path_3_1 && Path_2_1 && Path_1) {
      this.masterTimeline
        .to(
          Path_6_1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          Path_5_1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          Path_4_1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          Path_3_1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          Path_2_1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          Path_1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
            onStart: () => {
              // Force apply the correct material
              const primaryMaterial = new THREE.MeshStandardMaterial({
                color: 0xcccccc,
                metalness: 0.1,
                roughness: 0.2,
              });
              Path_1.material = primaryMaterial;
            },
            onComplete: () => {},
          },
          0
        );
    }

    // X animations
    if (X006 && X005 && X004 && X003 && X002 && X001) {
      this.masterTimeline
        .to(
          X006.scale,
          {
            x: 0.33,
            y: 0.33,
            z: 0.33,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          X005.scale,
          {
            x: 0.44,
            y: 0.44,
            z: 0.44,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          X004.scale,
          {
            x: 0.46,
            y: 0.46,
            z: 0.46,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          X003.scale,
          {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          X002.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        )
        .to(
          X001.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "ease.inOut",
          },
          0
        );
    }
  }

  addSubElementAnimations() {
    // Animate facial features and accessories
    const azoneSmile = this.arbcModel?.getObjectByName("A_ZoneSmile");

    // Eye zone animation
    if (azoneSmile) {
      this.masterTimeline.to(
        azoneSmile.scale,
        {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.5,
        },
        0.6
      );
    }
  }

  addDetailAnimations() {
    // Animate smaller details like eyelashes and lines
    const aCIL = this.arbcModel?.getObjectByName("aCIL");
    const aCIL2 = this.arbcModel?.getObjectByName("aCIL2");
    const ligne001 = this.arbcModel?.getObjectByName("gl_Ligne001");
    const ligne002 = this.arbcModel?.getObjectByName("gl_Ligne002");

    // Eyelash animations
    if (aCIL) {
      this.masterTimeline.to(
        aCIL.rotation,
        {
          z: "+=0.1",
          duration: 0.4,
          ease: "sine.inOut",
        },
        0.7
      );
    }

    if (aCIL2) {
      this.masterTimeline.to(
        aCIL2.rotation,
        {
          z: "-=0.1",
          duration: 0.4,
          ease: "sine.inOut",
        },
        0.75
      );
    }

    // Line details
    if (ligne001) {
      this.masterTimeline.to(
        ligne001.position,
        {
          y: "+=2",
          duration: 0.4,
        },
        0.9
      );
    }

    if (ligne002) {
      this.masterTimeline.to(
        ligne002.position,
        {
          y: "+=1.5",
          duration: 0.4,
        },
        0.95
      );
    }
  }

  startWaveLoop() {
    if (this.waveLoopTimeline && !this.isHovered) {
      this.waveLoopTimeline.play();
    }
  }

  stopWaveLoop() {
    if (this.waveLoopTimeline) {
      this.waveLoopTimeline.pause();
      this.resetWaveElementsToBase();
    }
  }

  resetWaveElementsToBase() {
    if (!window.gsap) return;

    const waveElements = ["A01", "B01", "C01", "R01", "IC01"];

    waveElements.forEach((elementName) => {
      const element =
        this.arbcModel?.getObjectByName(elementName) ||
        this.scene.getObjectByName(elementName);
      const baseState = this.baseStates.get(elementName);

      if (element && baseState) {
        window.gsap.set(element.position, {
          x: baseState.position.x,
          y: baseState.position.y,
          z: baseState.position.z,
        });
        window.gsap.set(element.scale, {
          x: baseState.scale.x,
          y: baseState.scale.y,
          z: baseState.scale.z,
        });
        window.gsap.set(element.rotation, {
          x: baseState.rotation.x,
          y: baseState.rotation.y,
          z: baseState.rotation.z,
        });
      }
    });
  }

  checkHover(mouseX, mouseY, camera) {
    if (!this.arbcModel) return;

    // Get the canvas element to get correct dimensions
    const canvas =
      camera.parent?.renderer?.domElement ||
      document.querySelector("canvas") ||
      (camera.userData && camera.userData.canvas);

    if (!canvas) {
      console.warn("Canvas not found for hover detection");
      return;
    }

    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    // using the canvas dimensions, not window dimensions
    this.mouse.x = (mouseX / canvas.clientWidth) * 2 - 1;
    this.mouse.y = -(mouseY / canvas.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObject(this.arbcModel, true);

    if (intersects.length > 0 && !this.isHovered) {
      this.playHoverIn();
    } else if (intersects.length === 0 && this.isHovered) {
      this.playHoverOut();
    }
  }

  playHoverIn() {
    if (this.isHovered || !this.masterTimeline) return;

    // Double-check GSAP availability
    if (!window.gsap) {
      console.warn("GSAP not available for hover animation");
      return;
    }

    this.isHovered = true;
    this.stopWaveLoop();
    this.masterTimeline.play();
  }

  playHoverOut() {
    if (!this.isHovered || !this.masterTimeline) return;

    // Double-check GSAP availability
    if (!window.gsap) {
      console.warn("GSAP not available for hover animation");
      return;
    }

    this.isHovered = false;
    this.masterTimeline.reverse();

    window.gsap.delayedCall(this.masterTimeline.duration(), () => {
      if (!this.isHovered) {
        this.startWaveLoop();
      }
    });
  }

  resetToBaseState() {
    if (!window.gsap) return;

    this.stopWaveLoop();

    this.baseStates.forEach((state, elementName) => {
      const element =
        this.arbcModel?.getObjectByName(elementName) ||
        this.scene.getObjectByName(elementName);
      if (element) {
        element.position.copy(state.position);
        element.scale.copy(state.scale);
        element.rotation.copy(state.rotation);
      }
    });

    this.isHovered = false;
    if (this.masterTimeline) {
      this.masterTimeline.progress(0);
    }
    this.startWaveLoop();
  }

  getAnimationInfo() {
    return {
      isHovered: this.isHovered,
      hoverProgress: this.masterTimeline?.progress() || 0,
      hoverDuration: this.masterTimeline?.duration() || 0,
      waveProgress: this.waveLoopTimeline?.progress() || 0,
      waveDuration: this.waveLoopTimeline?.duration() || 0,
      elementsCount: this.baseStates.size,
    };
  }
}

export default ARBCAnimations;
