// Import Three.js library
const THREE = window.THREE

// Solar System 3D Simulation
class SolarSystem {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.clock = new THREE.Clock()
    this.planets = []
    this.sun = null
    this.stars = null
    this.isPaused = false
    this.isDarkTheme = true
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    // Planet data with realistic proportions (scaled for visibility)
    this.planetData = [
      {
        name: "Mercury",
        radius: 0.4,
        distance: 8,
        speed: 4.74,
        color: 0x8c7853,
        description: "The smallest planet and closest to the Sun.",
      },
      {
        name: "Venus",
        radius: 0.9,
        distance: 12,
        speed: 3.5,
        color: 0xffc649,
        description: "The hottest planet with a thick, toxic atmosphere.",
      },
      {
        name: "Earth",
        radius: 1.0,
        distance: 16,
        speed: 2.98,
        color: 0x6b93d6,
        description: "Our home planet, the only known planet with life.",
      },
      {
        name: "Mars",
        radius: 0.5,
        distance: 20,
        speed: 2.41,
        color: 0xc1440e,
        description: "The Red Planet, with the largest volcano in the solar system.",
      },
      {
        name: "Jupiter",
        radius: 2.5,
        distance: 28,
        speed: 1.31,
        color: 0xd8ca9d,
        description: "The largest planet, a gas giant with many moons.",
      },
      {
        name: "Saturn",
        radius: 2.1,
        distance: 36,
        speed: 0.97,
        color: 0xfad5a5,
        description: "Famous for its beautiful ring system.",
      },
      {
        name: "Uranus",
        radius: 1.6,
        distance: 44,
        speed: 0.68,
        color: 0x4fd0e7,
        description: "An ice giant that rotates on its side.",
      },
      {
        name: "Neptune",
        radius: 1.5,
        distance: 52,
        speed: 0.54,
        color: 0x4b70dd,
        description: "The windiest planet in the solar system.",
      },
    ]

    this.init()
  }

  init() {
    console.log("Initializing Solar System...")
    this.createScene()
    this.createCamera()
    this.createRenderer()
    this.createLights()
    this.createStars()
    this.createSun()
    this.createPlanets()
    this.ensureAllPlanetsVisible() // Add this line
    this.createControls()
    this.setupEventListeners()
    this.animate()

    // Hide loading screen
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen")
      if (loadingScreen) {
        loadingScreen.classList.add("hidden")
      }
      console.log("Solar System loaded successfully!")
    }, 1000)
  }

  createScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000011)
    console.log("Scene created")
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    this.camera.position.set(0, 50, 100)
    this.camera.lookAt(0, 0, 0)
    console.log("Camera created")
  }

  createRenderer() {
    const canvas = document.getElementById("canvas")
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    console.log("Renderer created")
  }

  createLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2)
    this.scene.add(ambientLight)

    // Point light from the sun
    const sunLight = new THREE.PointLight(0xffffff, 2, 200)
    sunLight.position.set(0, 0, 0)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    this.scene.add(sunLight)
    console.log("Lights created")
  }

  createStars() {
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 400
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: false,
    })

    this.stars = new THREE.Points(starsGeometry, starsMaterial)
    this.scene.add(this.stars)
    console.log("Stars created")
  }

  createSun() {
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.3,
    })

    this.sun = new THREE.Mesh(sunGeometry, sunMaterial)
    this.sun.name = "Sun"
    this.scene.add(this.sun)

    // Add sun glow effect
    const glowGeometry = new THREE.SphereGeometry(4, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.1,
    })
    const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial)
    this.scene.add(sunGlow)
    console.log("Sun created")
  }

  createPlanets() {
    this.planetData.forEach((data, index) => {
      // Create planet
      const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32)
      const planetMaterial = new THREE.MeshLambertMaterial({
        color: data.color,
      })

      const planet = new THREE.Mesh(planetGeometry, planetMaterial)
      planet.position.x = data.distance
      planet.castShadow = true
      planet.receiveShadow = true
      planet.name = data.name

      // Create more visible orbit line
      const orbitGeometry = new THREE.RingGeometry(data.distance - 0.2, data.distance + 0.2, 128)
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      })
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.rotation.x = Math.PI / 2

      // Create planet group for rotation
      const planetGroup = new THREE.Group()
      planetGroup.add(planet)
      planetGroup.add(orbit)

      this.scene.add(planetGroup)

      // Store planet data with improved speed calculation
      this.planets.push({
        group: planetGroup,
        planet: planet,
        orbit: orbit,
        data: data,
        angle: Math.random() * Math.PI * 2,
        baseSpeed: data.speed * 0.005, // Reduced base speed for better control
        currentSpeed: data.speed * 0.005,
        speedMultiplier: 1.0, // Track speed multiplier separately
      })
    })
    console.log("Planets created:", this.planets.length)
  }

  ensureAllPlanetsVisible() {
    // Calculate the maximum distance to ensure all planets are visible
    const maxDistance = Math.max(...this.planetData.map((p) => p.distance))
    const buffer = 20 // Extra space around the solar system

    // Adjust camera position based on screen size
    const isMobile = window.innerWidth < 768
    const cameraDistance = isMobile ? maxDistance + buffer + 30 : maxDistance + buffer

    this.camera.position.set(0, cameraDistance * 0.5, cameraDistance)
    this.camera.lookAt(0, 0, 0)

    console.log(`Camera positioned for max distance: ${maxDistance}, camera distance: ${cameraDistance}`)
  }

  createControls() {
    const controlsContainer = document.getElementById("planet-controls")
    if (!controlsContainer) {
      console.error("Controls container not found")
      return
    }

    this.planets.forEach((planetObj, index) => {
      const controlDiv = document.createElement("div")
      controlDiv.className = "planet-control"

      const nameSpan = document.createElement("span")
      nameSpan.className = "planet-name"
      nameSpan.textContent = planetObj.data.name
      nameSpan.style.color = `#${planetObj.data.color.toString(16).padStart(6, "0")}`

      const speedControl = document.createElement("div")
      speedControl.className = "speed-control"

      const slider = document.createElement("input")
      slider.type = "range"
      slider.min = "0"
      slider.max = "5"
      slider.step = "0.1"
      slider.value = "1"
      slider.className = "speed-slider"

      const valueSpan = document.createElement("span")
      valueSpan.className = "speed-value"
      valueSpan.textContent = "1.0x"

      slider.addEventListener("input", (e) => {
        const multiplier = Number.parseFloat(e.target.value)
        planetObj.speedMultiplier = multiplier
        planetObj.currentSpeed = planetObj.baseSpeed * multiplier
        valueSpan.textContent = `${multiplier.toFixed(1)}x`
        console.log(`${planetObj.data.name} speed set to ${multiplier}x`)
      })

      speedControl.appendChild(slider)
      speedControl.appendChild(valueSpan)

      controlDiv.appendChild(nameSpan)
      controlDiv.appendChild(speedControl)

      controlsContainer.appendChild(controlDiv)
    })
    console.log("Controls created")
  }

  setupEventListeners() {
    // Window resize
    window.addEventListener("resize", () => this.onWindowResize())

    // Mouse events for planet selection
    this.renderer.domElement.addEventListener("click", (event) => this.onMouseClick(event))
    this.renderer.domElement.addEventListener("mousemove", (event) => this.onMouseMove(event))

    // Control buttons
    const pauseBtn = document.getElementById("pause-btn")
    const resetBtn = document.getElementById("reset-btn")
    const themeBtn = document.getElementById("theme-toggle")
    const zoomInBtn = document.getElementById("zoom-in")
    const zoomOutBtn = document.getElementById("zoom-out")
    const resetCameraBtn = document.getElementById("reset-camera")
    const togglePanelBtn = document.getElementById("toggle-panel")

    if (pauseBtn) pauseBtn.addEventListener("click", () => this.togglePause())
    if (resetBtn) resetBtn.addEventListener("click", () => this.resetSimulation())
    if (themeBtn) themeBtn.addEventListener("click", () => this.toggleTheme())
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => this.zoomCamera(0.8))
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => this.zoomCamera(1.2))
    if (resetCameraBtn) resetCameraBtn.addEventListener("click", () => this.resetCamera())
    if (togglePanelBtn) togglePanelBtn.addEventListener("click", () => this.togglePanel())

    // Touch events for mobile
    this.renderer.domElement.addEventListener("touchstart", (event) => this.onTouchStart(event))
    this.renderer.domElement.addEventListener("touchmove", (event) => this.onTouchMove(event))

    console.log("Event listeners setup")
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // Ensure planets remain visible on resize
    this.ensureAllPlanetsVisible()
  }

  onMouseClick(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)

    const planetMeshes = this.planets.map((p) => p.planet)
    const intersects = this.raycaster.intersectObjects([this.sun, ...planetMeshes])

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object
      this.showPlanetInfo(clickedObject)
    } else {
      this.hidePlanetInfo()
    }
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)

    const planetMeshes = this.planets.map((p) => p.planet)
    const intersects = this.raycaster.intersectObjects([this.sun, ...planetMeshes])

    if (intersects.length > 0) {
      document.body.style.cursor = "pointer"
    } else {
      document.body.style.cursor = "default"
    }
  }

  onTouchStart(event) {
    if (event.touches.length === 1) {
      const touch = event.touches[0]
      this.onMouseClick({ clientX: touch.clientX, clientY: touch.clientY })
    }
  }

  onTouchMove(event) {
    event.preventDefault()
    if (event.touches.length === 1) {
      const touch = event.touches[0]
      this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
    }
  }

  showPlanetInfo(planetMesh) {
    const infoPanel = document.getElementById("planet-info")
    const nameElement = document.getElementById("planet-name")
    const descriptionElement = document.getElementById("planet-description")

    if (!infoPanel || !nameElement || !descriptionElement) return

    if (planetMesh.name === "Sun") {
      nameElement.textContent = "Sun"
      descriptionElement.textContent =
        "The star at the center of our solar system, providing light and heat to all planets."
    } else {
      const planetData = this.planetData.find((p) => p.name === planetMesh.name)
      if (planetData) {
        nameElement.textContent = planetData.name
        descriptionElement.textContent = planetData.description
      }
    }

    infoPanel.classList.remove("hidden")
  }

  hidePlanetInfo() {
    const infoPanel = document.getElementById("planet-info")
    if (infoPanel) {
      infoPanel.classList.add("hidden")
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused
    const pauseBtn = document.getElementById("pause-btn")
    if (pauseBtn) {
      pauseBtn.textContent = this.isPaused ? "Resume" : "Pause"
    }
  }

  resetSimulation() {
    this.planets.forEach((planetObj, index) => {
      planetObj.angle = Math.random() * Math.PI * 2
      planetObj.speedMultiplier = 1.0
      planetObj.currentSpeed = planetObj.baseSpeed

      // Reset sliders
      const sliders = document.querySelectorAll(".speed-slider")
      const values = document.querySelectorAll(".speed-value")
      if (sliders[index]) sliders[index].value = "1"
      if (values[index]) values[index].textContent = "1.0x"
    })

    this.isPaused = false
    const pauseBtn = document.getElementById("pause-btn")
    if (pauseBtn) pauseBtn.textContent = "Pause"
    this.hidePlanetInfo()
    console.log("Simulation reset")
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme
    document.body.classList.toggle("light-theme")

    const themeBtn = document.getElementById("theme-toggle")
    if (themeBtn) {
      themeBtn.textContent = this.isDarkTheme ? "🌙" : "☀️"
    }

    // Update scene background
    this.scene.background = new THREE.Color(this.isDarkTheme ? 0x000011 : 0x87ceeb)

    // Update stars visibility
    if (this.stars) {
      this.stars.visible = this.isDarkTheme
    }
  }

  zoomCamera(factor) {
    this.camera.position.multiplyScalar(factor)

    // Clamp camera distance
    const distance = this.camera.position.length()
    if (distance < 20) {
      this.camera.position.normalize().multiplyScalar(20)
    } else if (distance > 200) {
      this.camera.position.normalize().multiplyScalar(200)
    }
  }

  resetCamera() {
    this.camera.position.set(0, 50, 100)
    this.camera.lookAt(0, 0, 0)
  }

  togglePanel() {
    const panelContent = document.querySelector(".panel-content")
    const toggleBtn = document.getElementById("toggle-panel")

    if (panelContent && toggleBtn) {
      panelContent.classList.toggle("collapsed")
      toggleBtn.textContent = panelContent.classList.contains("collapsed") ? "▲" : "▼"
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate())

    if (!this.isPaused) {
      const deltaTime = Math.min(this.clock.getDelta(), 0.1) // Cap delta time for stability

      // Rotate sun
      if (this.sun) {
        this.sun.rotation.y += 0.01
      }

      // Animate planets with improved speed handling
      this.planets.forEach((planetObj) => {
        // Update orbit angle with current speed
        planetObj.angle += planetObj.currentSpeed * deltaTime * 10 // Multiplied for visible effect

        // Update planet position
        const x = Math.cos(planetObj.angle) * planetObj.data.distance
        const z = Math.sin(planetObj.angle) * planetObj.data.distance

        planetObj.planet.position.x = x
        planetObj.planet.position.z = z

        // Rotate planet on its axis
        planetObj.planet.rotation.y += 0.02 * (planetObj.speedMultiplier || 1)
      })

      // Rotate stars slowly
      if (this.stars) {
        this.stars.rotation.y += 0.0002
      }
    }

    this.renderer.render(this.scene, this.camera)
  }
}

// Initialize the solar system when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing Solar System...")
  try {
    new SolarSystem()
  } catch (error) {
    console.error("Error initializing Solar System:", error)
  }
})

// Also try to initialize if Three.js loads after DOM
if (window.THREE) {
  console.log("Three.js already loaded")
} else {
  window.addEventListener("load", () => {
    if (window.THREE && !window.solarSystemInitialized) {
      console.log("Three.js loaded, initializing Solar System...")
      new SolarSystem()
      window.solarSystemInitialized = true
    }
  })
}
