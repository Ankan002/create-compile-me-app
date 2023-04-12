import { getChoiceResult } from "helpers/get-choice-result";

export const getFrontendTemplate = async (): Promise<Array<string>> => {
	const frontendTemplateChoiceArray: Array<string> = ["frontend"];

	const framework = await getChoiceResult({
		key: "frontend-framework",
		question: "Choose a framework? ",
		options: ["bare-react"],
	});

	frontendTemplateChoiceArray.push(framework);

	const language = await getChoiceResult({
		key: "frontend-language",
		question: "Choose your favoured language? ",
		options: ["javascript", "typescript"],
	});

	frontendTemplateChoiceArray.push(language);

	const uiLibrary = await getChoiceResult({
		key: "ui-library",
		question: "Choose a UI Library? ",
		options: ["Tailwind", "none"],
	});

	if (uiLibrary !== "none") frontendTemplateChoiceArray.push(uiLibrary.toLowerCase());

	const stateManagementLibrary = await getChoiceResult({
		key: "state-management-library",
		question: "Choose a state management library? ",
		options: ["Recoil", "none"],
	});

	if (stateManagementLibrary !== "none") frontendTemplateChoiceArray.push(stateManagementLibrary.toLowerCase());

	return frontendTemplateChoiceArray;
};
