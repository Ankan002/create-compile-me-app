import { useRecoilState } from "recoil";
import { countAtom } from "./atoms";

function App() {
    const [count, setCount] = useRecoilState(countAtom);

    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center p-5 font-manrope bg-primary-light">
            <a
                href="https://create-compile-me-app.compile-me.com"
                target="_blank"
            >
                <img
                    src="https://res.cloudinary.com/exponents/image/upload/v1680626626/reamde-images/create-compile-me-app-readme-cover_eih0nr.png"
                    className="w-[400px] h-[225px] border-4 border-primary-dark rounded-lg"
                    alt="Create Compile Me App Logo"
                />
            </a>

            <h1 className="text-3xl text-center tracking-widest mt-5">
                Create Compile Me App
            </h1>

            <button
                className="px-5 py-1 border-2 border-primary-dark bg-primary-yellow mt-5 text-lg tracking-wider rounded-md hover:shadow-lg hover:shadow-primary-dark/40"
                onClick={() => setCount((prev) => prev + 1)}
            >
                Count: {count}
            </button>

            <p className="mt-4 text-sm text-primary-grey tracking-wider">
                Change app.tsx to get started.
            </p>
            <p className="mt-2 text-sm text-primary-grey tracking-wider">
                Special Thanks to Vite for this amazing template.
            </p>
        </main>
    );
}

export default App;
