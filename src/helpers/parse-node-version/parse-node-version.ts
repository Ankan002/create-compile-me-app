interface ParseNodeVersionArgs {
	version: string;
}

/**
 * ### Args:
 * - version: Node Version (Example -> v18.13.0)
 *
 * ### Return:
 * It returns the `major version` of Node JS. For example if your pass `v18.13.0`, you would receive `18` in number format as output
 *
 * ### Note:
 * This function would throw an error if the passed version is not a valid semantic version, so make sure wrap it with a try and cathc block.
 */
export const parseNodeVersion = (args: ParseNodeVersionArgs): number => {
	const { version } = args;

	const semanticVersionParts = version.split(".");

	if (!semanticVersionParts[0]) {
		throw new Error("Provide a valid semantic version");
	}

	if (semanticVersionParts.length < 3 || !semanticVersionParts[0].startsWith("v")) {
		throw new Error("Provide a valid semantic version");
	}

	return Number(semanticVersionParts[0].substring(1));
};
