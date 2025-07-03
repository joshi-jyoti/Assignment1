# 3D Solar System Simulation

A beautiful, interactive 3D solar system simulation built with Three.js. Explore the planets, control their orbital speeds, and learn about our solar system in an immersive 3D environment.

![Solar System Simulation](https://img.shields.io/badge/Status-Active-brightgreen)
![Three.js](https://img.shields.io/badge/Three.js-r128-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🌟 Core Features
- **Realistic Solar System**: All 8 planets with accurate relative sizes and orbital distances
- **Interactive Controls**: Click on planets to learn more about them
- **Orbital Animation**: Smooth planetary motion with realistic orbital speeds
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile

### 🎮 Interactive Controls
- **Speed Control**: Individual speed sliders for each planet (0-5x speed multiplier)
- **Camera Controls**: Zoom in/out and reset camera position
- **Pause/Resume**: Pause the entire simulation
- **Reset Function**: Reset all planets to initial positions and speeds
- **Theme Toggle**: Switch between dark and light themes

### 🎨 Visual Features
- **Starfield Background**: Beautiful animated starfield
- **Planet Descriptions**: Detailed information panels for each celestial body
- **Orbital Paths**: Visible orbit lines for each planet
- **Sun Glow Effect**: Realistic sun with glow effect
- **Dynamic Lighting**: Point light source from the sun with shadows

### 📱 Mobile Features
- **Touch Support**: Full touch interaction for mobile devices
- **Responsive UI**: Adaptive control panels for different screen sizes
- **Mobile-Optimized**: Optimized performance and layout for mobile browsers

## 🚀 Quick Start

### Prerequisites
- A modern web browser with WebGL support
- No additional installations required (uses CDN for Three.js)

### Installation

1. **Clone or Download**: Download the project files to your local machine

2. **File Structure**: Ensure you have these files:
   ```
   threejs/
   ├── index.html
   ├── script.js
   ├── style.css
   └── README.md
   ```

3. **Run the Project**: 
   - Open `index.html` in a web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using Live Server extension in VS Code
     ```

4. **Access**: Open your browser and navigate to `http://localhost:8000` (if using local server)

## 🎯 How to Use

### Basic Navigation
- **Mouse**: Click and drag to rotate the view
- **Mouse Wheel**: Zoom in and out
- **Click Planets**: Click on any planet or the sun to see information

### Control Panel
The control panel (top-right) includes:

#### Global Controls
- **Pause/Resume**: Stop or start the planetary motion
- **Reset**: Reset all planets to initial state
- **Theme Toggle**: Switch between dark (🌙) and light (☀️) themes

#### Planet Speed Controls
- Each planet has an individual speed slider
- Range: 0x to 5x normal speed
- Real-time speed adjustment
- Color-coded planet names

#### Camera Controls
- **Zoom In**: Get closer to the solar system
- **Zoom Out**: Get a wider view
- **Reset View**: Return to default camera position

### Mobile Controls
- **Touch**: Tap planets to select them
- **Pinch**: Zoom in/out (on supported devices)
- **Panel Toggle**: Collapse/expand control panel to save space

## 🌍 Planet Information

The simulation includes accurate representations of:

| Planet  | Relative Size | Distance | Speed | Color |
|---------|---------------|----------|-------|-------|
| Mercury | 0.4          | 8 units  | 4.74  | Gray-brown |
| Venus   | 0.9          | 12 units | 3.5   | Yellow |
| Earth   | 1.0          | 16 units | 2.98  | Blue |
| Mars    | 0.5          | 20 units | 2.41  | Red |
| Jupiter | 2.5          | 28 units | 1.31  | Tan |
| Saturn  | 2.1          | 36 units | 0.97  | Light tan |
| Uranus  | 1.6          | 44 units | 0.68  | Light blue |
| Neptune | 1.5          | 52 units | 0.54  | Blue |

Each planet includes educational descriptions and realistic orbital characteristics.

## 🔧 Technical Details

### Technologies Used
- **Three.js (r128)**: 3D graphics library
- **HTML5**: Structure and canvas element
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Application logic and interactivity

### Key Components

#### SolarSystem Class
Main class that handles:
- Scene initialization
- Planet creation and animation
- User interaction
- Camera controls
- UI management

#### Rendering Features
- **WebGL Renderer**: Hardware-accelerated 3D rendering
- **Shadow Mapping**: Realistic shadows from the sun
- **Ambient + Point Lighting**: Realistic lighting setup
- **Particle System**: Starfield background

#### Performance Optimizations
- **Efficient Animation Loop**: RequestAnimationFrame with delta time
- **Responsive Rendering**: Automatic quality adjustment
- **Memory Management**: Proper cleanup and resource management

### Browser Compatibility
- **Chrome**: Fully supported
- **Firefox**: Fully supported
- **Safari**: Fully supported
- **Edge**: Fully supported
- **Mobile Browsers**: Optimized support

## 📱 Responsive Design

The application adapts to different screen sizes:

### Desktop (1920px+)
- Full control panel with all features
- Large planet information panels
- Optimal camera positioning

### Tablet (768px - 1919px)
- Adjusted control panel size
- Touch-friendly interface
- Responsive text and buttons

### Mobile (< 768px)
- Compact control panel
- Collapsible sections
- Touch-optimized controls
- Simplified layout

### Landscape Mobile
- Special layout for landscape orientation
- Optimized for limited vertical space
- Scrollable control panels

## 🎨 Customization

### Modifying Planets
To add or modify planets, edit the `planetData` array in `script.js`:

```javascript
{
  name: "Planet Name",
  radius: 1.0,           // Relative size
  distance: 20,          // Distance from sun
  speed: 2.0,           // Orbital speed
  color: 0xff0000,      // Hex color
  description: "Description text"
}
```

### Styling
- **Colors**: Modify CSS custom properties
- **Layout**: Adjust responsive breakpoints in `style.css`
- **Animations**: Customize transition durations and effects

### Performance Tuning
- **Star Count**: Adjust `starsCount` in `createStars()`
- **Shadow Quality**: Modify shadow map size
- **Rendering Quality**: Adjust geometry segments

## 🐛 Troubleshooting

### Common Issues

#### Black Screen
- Check browser console for errors
- Ensure WebGL is supported
- Try refreshing the page

#### Performance Issues
- Reduce star count
- Disable shadows
- Lower geometry quality

#### Controls Not Working
- Check for JavaScript errors
- Ensure all HTML elements exist
- Verify event listeners are attached

#### Mobile Issues
- Ensure touch events are enabled
- Check viewport meta tag
- Test on different browsers

### Debug Mode
Enable console logging by checking browser developer tools (F12).

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Project**
2. **Create a Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Ideas for Contributions
- Add asteroid belt
- Include planet moons
- Add comet animations
- Implement VR support
- Add educational quizzes
- Include planet texture mapping

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Three.js Community**: For the amazing 3D library
- **NASA**: For planetary data and inspiration
- **WebGL**: For making browser-based 3D graphics possible

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Look at browser console for errors
3. Create an issue on the project repository

---

**Enjoy exploring the cosmos! 🌌**

*Made with ❤️ and Three.js*
