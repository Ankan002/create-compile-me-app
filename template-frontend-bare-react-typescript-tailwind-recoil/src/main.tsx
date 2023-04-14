import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { RecoilRoot } from "recoil";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>
);
