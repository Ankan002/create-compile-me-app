import { printHeading } from "utils/print-heading";
import { getTextInput } from "helpers/get-text-input";
import gradient from "gradient-string";
import { validateProjectName } from "helpers/validate-project-name";

export const createProject = async () => {
	printHeading();
	console.log();
	console.log();

	try {
		let projectName = await getTextInput({
			defaultAnswer: "something-amazing",
			question: "Name your amazing project: ",
			key: "project-name",
		});

		const projectValidationResponse = validateProjectName(projectName);

		if (!projectValidationResponse.success) {
			throw new Error(projectValidationResponse.error);
		}

		projectName = projectValidationResponse.validName;

		const emailId = await getTextInput({
			question: "Enter your email id: ",
			key: "email",
			defaultAnswer: "ankanbhattacharya89@gmail.com",
		});

		console.log(projectName);
		console.log(emailId);
	} catch (error) {
		const errorColor = gradient(["#F15A59", "#ED2B2A"]);

		if (error instanceof Error) {
			console.log(errorColor(`Error: ${error.message}`));
			console.log(errorColor("❌❌ Process exited with error code 1... ❌❌"));
			process.exit();
		}

		console.log(errorColor(`Error: Some Error Occurred!!`));
		console.log(errorColor("❌❌ Process exited with error code 1... ❌❌"));
		process.exit();
	}
};
