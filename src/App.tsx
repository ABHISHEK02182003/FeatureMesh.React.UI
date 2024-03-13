import React, { memo } from "react";
import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import resets from "./components/_resets.module.css";
import { LandingPage } from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import { EntityPage } from "./components/EntityPage/EntityPage";

interface Props {
	className?: string;
}

export const App: FC<Props> = memo(function App(props = {}) {
	return (
		<Router>
			<div className={`${resets.clapyResets} ${classes.root}`}>
				<Navbar />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/entity" element={<EntityPage />} />
					{/* Add more routes as needed */}
				</Routes>
			</div>
		</Router>
	);
});
