import gradient from "gradient-string";

export const createProject = () => {
	const coolGradient = gradient(["#FFA559", "#FF6000"]);

	console.log(coolGradient("Hello GUYS!!"));
};
