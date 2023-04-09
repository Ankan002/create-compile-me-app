const inquirer = import("inquirer");

export const getInquirer = {
	inquirerInstance: async () => (await inquirer).default,
};
