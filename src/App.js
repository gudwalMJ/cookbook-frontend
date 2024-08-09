import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppContent from "./AppContent"; // Import the AppContent component

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
