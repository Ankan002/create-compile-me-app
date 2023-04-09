type ValidateProjectNameResponse =
	| {
			success: false;
			error: string;
	  }
	| {
			success: true;
			validName: string;
	  };

// Checking if the project name is URL friendly or not:
// Rules:
// -> It should not contain leading spaces
// -> It should only contain smaill characters, numbers and hypens.
export const validateProjectName = (projectName: string): ValidateProjectNameResponse => {
	const trimmedProjectName = projectName.trim();

	const myRegex = /^[a-z0-9-]+$/;

	if (!myRegex.test(projectName))
		return {
			success: false,
			error: "A valid project name should only contain smaill characters, numbers and hypens",
		};

	return {
		success: true,
		validName: trimmedProjectName,
	};
};
