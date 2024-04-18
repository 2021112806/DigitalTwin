import "./App.css";
import { Model } from "./BlenderModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <body style={{ margin: 0, padding: 0, height: "100vh", width: "100vw" }}>
    <Canvas camera={{ fov: 64, position: [2, 2, 0] }}>
      {/* 调整光源的位置 */}
      <ambientLight intensity={5} position={[-2, 2, 2]} />
      {/* 添加一个点光源 */}
      <pointLight intensity={1} position={[5, 5, 5]} />
      <OrbitControls enableZoom={true} />
      <Model />
    </Canvas>
  </body>
  );
}

export default App;