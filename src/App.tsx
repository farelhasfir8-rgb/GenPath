import { useState } from "react";
import Reflection from "./pages/Reflection";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Compass from "./pages/Compass";
import PathPreview from "./pages/PathPreview";
import Roadmap from "./pages/Roadmap";
import StationDetail from "./pages/StationDetail";
import Checkpoint from "./pages/Checkpoint";
import Navigator from "./pages/Navigator";
import Analysis from "./pages/Analysis";
import type { StationNumber } from "./roadmapStations";
import AudioLayer from "./AudioLayer";
import FloatingDecor from "./FloatingDecor";

function App() {
  const [currentStation, setCurrentStation] = useState<StationNumber>(1);

  return (
    <BrowserRouter>
      <FloatingDecor />
      <AudioLayer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/compass" element={<Compass />} />
        <Route path="/preview" element={<PathPreview />} />
        <Route
          path="/roadmap"
          element={<Roadmap currentStation={currentStation} />}
        />
        <Route
          path="/station"
          element={<StationDetail currentStation={currentStation} />}
        />
        <Route
          path="/checkpoint"
          element={
            <Checkpoint
              currentStation={currentStation}
              setCurrentStation={setCurrentStation}
            />
          }
        />
        <Route path="/navigator" element={<Navigator />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
