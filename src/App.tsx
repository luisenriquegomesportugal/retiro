import React from "react";
import Menu from "./components/Menu";
import { Routes } from "./router";

function App() {
  return (
    <React.Fragment>
      <header className="surface-0 shadow-1 w-full px-4 py-3 flex justify-content-between align-items-center">
        <img src="refugio.png" alt="Refúgio" className="w-12rem" />
        <h1 className="text-3xl font-bold m-0 text-700">Rede 12 + 17</h1>
      </header>
      <div className="flex-1 flex">
        <Menu />
        <main className="px-4 m-5 flex-1">
          <Routes />
        </main>
      </div>
    </React.Fragment>
  )
}

export default App
