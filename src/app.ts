import gradient from "gradient-string";
import { platform as getOSPlatform } from "node:os";

import { printHeading } from "utils/print-heading";
import { getTextInput } from "helpers/get-text-input";
import { validateProjectName } from "helpers/validate-project-name";
import { validateEmail } from "helpers/validate-email";
import { getChoiceResult } from "helpers/get-choice-result";
import { getFrontendTemplate } from "helpers/questionare";
import { executeShellCommand } from "helpers/execute-shell-command";
import { parseNodeVersion } from "helpers/parse-node-version";
import { getGitUrl } from "helpers/get-git-url";
import { getConfirmation } from "helpers/get-confirmation";

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
			options: ["frontend"],
			key: "domain",
		});

		let templateArray = ["template"];

		if (domain === "frontend") {
			const frontendTemplateArray = await getFrontendTemplate();

			templateArray = templateArray.concat(frontendTemplateArray);
		}

		const pkgManager = await getChoiceResult({
			key: "pkg-manager",
			question: "Choose a package manager to install the dependencies?",
			options: ["yarn", "npm", "none"],
		});

		const shoulGitBeInitialized = await getConfirmation({
			key: "git-initilization-confirmation",
			question: "Should we initialize a Git Repository on your behalf?",
		});

		console.log();

		const template = templateArray.join("-");

		const gitDownloadUrl = getGitUrl(template);

		await executeShellCommand({
			command: `mkdir ${projectName}`,
		});

		process.stdout.write("⌛ Downloading Template...\r\x1b");

		await executeShellCommand({
			command: `cd ${projectName} && git clone -b main ${gitDownloadUrl} .`,
		});

		// Prependeing a garbage value just to avaoid the first letter getting deleted due to escape sequences.
		process.stdout.write("t✅ Template Downloaded...\n");

		console.log(process.env["SHELL"]);

		await executeShellCommand({
			command: `cd ${projectName} && npm pkg set name=${projectName} && ${
				getOSPlatform().includes("win") && process.env["SHELL"]?.includes("bash")
					? "rd /s /q .git && del yarn.lock package-lock.json"
					: "rm -rf .git yarn.lock package-lock.json"
			}`,
		});

		if (pkgManager !== "none") {
			process.stdout.write("⌛ Installing required dependencies...\r\x1b");

			await executeShellCommand({
				command: `cd ${projectName} && ${pkgManager === "npm" ? "npm i" : "yarn"}`,
			});

			process.stdout.write("t✅ Installed all required dependencies...\n");
		}

		if (shoulGitBeInitialized) {
			process.stdout.write("⌛ Initializing Git...\r\x1b");

			await executeShellCommand({
				command: `cd ${projectName} && git init -b main && git add . && git commit -m "chore: :tada: project initialized"`,
			});

			process.stdout.write("t✅ Git Repository Initialized...\n");
		}

		console.log();
		console.log(`✨✨ Your ${projectName} project has been created`);

		console.log();
		console.log(`▶ Just run:`);
		console.log(
			`cd ${projectName} to change the current directory to project directory ${
				pkgManager !== "none" ? "and" : ""
			},`
		);
		console.log(`${pkgManager !== "none" ? "&& ${pkgManager} <'start | run dev'> as required!!" : ""} `);

		console.log();
		console.log("📖 For docs visit: https://create-compile-me-app.compile-me.com");
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
