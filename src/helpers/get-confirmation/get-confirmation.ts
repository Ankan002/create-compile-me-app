import { getInquirer } from "utils/get-inquirer";

interface GetConfirmationArgs {
	key: string;
	question: string;
}

export const getConfirmation = async (args: GetConfirmationArgs) => {
	const { key, question } = args;

	const inquirer = await getInquirer.inquirerInstance();

	const answers = await inquirer.prompt([
		{
			type: "confirm",
			name: key,
			message: question,
		},
	]);

	if (answers[key] === undefined || answers[key] === null) throw Error("WTF is your key!!");

	return answers[key];
};
