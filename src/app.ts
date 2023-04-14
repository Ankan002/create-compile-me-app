import gradient from "gradient-string";

import { printHeading } from "utils/print-heading";
import { getTextInput } from "helpers/get-text-input";
import { validateProjectName } from "helpers/validate-project-name";
import { validateEmail } from "helpers/validate-email";
import { getChoiceResult } from "helpers/get-choice-result";
import { getFrontendTemplate } from "helpers/questionare";
import { executeShellCommand } from "helpers/execute-shell-command";
import { parseNodeVersion } from "helpers/parse-node-version";

export const createProject = async () => {
	printHeading();
	console.log();
	console.log();

	try {
		const nodeVersion = await executeShellCommand({
			command: "node -v",
		});

		const majorNodeVersion = parseNodeVersion({
			version: nodeVersion,
		});

		if (majorNodeVersion < 16) throw new Error("Node version must be v16 or above");

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

		const emailId = (
			await getTextInput({
				question: "Enter your email id: ",
				key: "email",
				defaultAnswer: "ankanbhattacharya89@gmail.com",
			})
		).trim();

		if (!validateEmail(emailId)) {
			throw new Error("Enter a valid email id!!");
		}

		const domain = await getChoiceResult({
			question: "Choose a project domain?",
			options: ["backend", "frontend"],
			key: "domain",
		});

		let templateArray = ["template"];

		if (domain === "frontend") {
			const frontendTemplateArray = await getFrontendTemplate();

			templateArray = templateArray.concat(frontendTemplateArray);
		}

		const template = templateArray.join("-");

		const res = await executeShellCommand({
			command: "ls",
		});

		console.log(res);

		// await executeShellCommand({
		// 	command:
		// 		"git clone --depth 1 --filter=blob:none --no-checkout https://github.com/Ankan002/create-compile-me-app.git .",
		// });

		// await executeShellCommand({
		// 	command: "git checkout main -- template-frontend-bare-react-javascript-recoil",
		// });

		// await executeShellCommand({
		// 	command: "rm -rf .git",
		// });

		// await executeShellCommand({
		// 	command: `mv template-frontend-bare-react-javascript-recoil ${projectName}`,
		// });

		console.log(template);

		console.log(projectName);
		console.log(emailId);
		console.log(domain);
	} catch (error) {
		const errorColor = gradient(["#F15A59", "#ED2B2A"]);

		if (error instanceof Error) {
			console.log(errorColor(`Error: ${error.message}`));
			console.log(errorColor("❌❌ Process exited with error code 1... ❌❌"));
			process.exit(1);
		}

		console.log(error);

		console.log(errorColor(`Error: Some Error Occurred!!`));
		console.log(errorColor("❌❌ Process exited with error code 1... ❌❌"));
		process.exit();
	}
};
