import { useState } from "react";
import "./app.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <main>
            <a
                href="https://create-compile-me-app.compile-me.com"
                target="_blank"
            >
                <img
                    src="https://res.cloudinary.com/exponents/image/upload/v1680626626/reamde-images/create-compile-me-app-readme-cover_eih0nr.png"
                    className="logo"
                    alt="Create Compile Me App Logo"
                />
            </a>

            <h1 className="heading">Create Compile Me App</h1>

            <button
                className="count-btn"
                onClick={() => setCount((prev) => prev + 1)}
            >
                Count: {count}
            </button>

            <p className="text-muted">Change app.jsx to get started.</p>
            <p className="text-muted">
                Special Thanks to Vite for this amazing template.
            </p>
        </main>
    );
}

export default App;
