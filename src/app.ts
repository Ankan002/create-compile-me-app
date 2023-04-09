import { printHeading } from "utils/print-heading";
import { getInquirer } from "utils/get-inquirer";

export const createProject = async () => {
	printHeading();
	console.log();
	console.log();

	const inquirer = await getInquirer.inquirerInstance();

	const data = await inquirer.prompt([
		{
			type: "input",
			message: "What is your name?",
			default: "Ankan",
			name: "name",
		},
	]);

	console.log(data.name);
};
