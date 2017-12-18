'use strict';

exports.provideBuilder = function () {
	return class AlanProvider {

		getNiceName() {
			return 'Alan Validate';
		}

		isEligible() {
			var textEditor = atom.workspace.getActiveTextEditor();
			if (textEditor) {
				var rootScopes = textEditor.getRootScopeDescriptor();
				return rootScopes.scopes["0"] === "source.alan";
			} else {
				return false;
			}
		}

		settings() {
			return [
				{
					name: "Alan Validate",
					sh: true,
					cwd: '{FILE_ACTIVE_PATH}',
					exec: 'bash -c "alan validate sublime --wire"',
					errorMatch: "(?<file>\\S.*\\S):(?<line>[0-9]+):(?<col>[0-9]+):(?:error|warning): (?<message>.*(?:\n\t.*)*)"
				},
				{
					name: "Alan Validate - Without Wiring",
					sh: true,
					cwd: '{FILE_ACTIVE_PATH}',
					exec: 'bash -c "alan validate sublime"',
					errorMatch: "(?<file>\\S.*\\S):(?<line>[0-9]+):(?<col>[0-9]+):(?:error|warning): (?<message>.*(?:\n\t.*)*)"
				}
			]
		}
	}
}
