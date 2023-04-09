import { printHeading } from "utils/print-heading";
import { getTextInput } from "helpers/get-text-input";

export const createProject = async () => {
	printHeading();
	console.log();
	console.log();

	const projectName = await getTextInput({
		defaultAnswer: "something-amazing",
		question: "Name your amazing project?",
		key: "project-name",
	});

	console.log(projectName);
};
