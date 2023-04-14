import { exec } from "node:child_process";

interface ExecuteShellCommandArgs {
	command: string;
}

export const executeShellCommand = (args: ExecuteShellCommandArgs): Promise<string> => {
	const { command } = args;

	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error.message);
			} else if (stderr) {
				reject(stderr);
			}

			resolve(stdout);
		});
	});
};
