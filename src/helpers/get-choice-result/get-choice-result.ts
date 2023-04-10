import { getInquirer } from "utils/get-inquirer";

interface GetChoiceResultArgs {
	question: string;
	options: Array<string>;
	key: string;
}

export const getChoiceResult = async (args: GetChoiceResultArgs) => {
	const { question, options, key } = args;

	const inquirer = await getInquirer.inquirerInstance();

	const answers = await inquirer.prompt([
		{
			type: "list",
			message: question,
			choices: options,
			name: key,
		},
	]);

	if (!answers[key]) throw Error("WTF is your key!!");

	return answers[key] as string;
};
