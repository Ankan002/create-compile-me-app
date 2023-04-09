import { getInquirer } from "utils/get-inquirer";

interface GetTextInputArgs {
	question: string;
	key: string;
	defaultAnswer: string;
}

export const getTextInput = async (args: GetTextInputArgs) => {
	const { question, key, defaultAnswer } = args;

	const inquirer = await getInquirer.inquirerInstance();

	const answers = await inquirer.prompt([
		{
			message: question,
			type: "input",
			default: defaultAnswer,
			name: key,
		},
	]);

	if (!answers[key]) throw Error("WTF is your key!!");

	return answers[key] as string;
};
