import React from "react";
import Home from "./components/Home";
import { GameStateProvider } from "./lib/GameStateProvider";

function App() {
    return (
        <GameStateProvider>
            <Home />
        </GameStateProvider>
    );
}

export default App;
