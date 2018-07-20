'use strict';

exports.provideBuilder = function () {
	return class AlanProvider {

		getNiceName() {
			return 'Alan Build';
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
					name: "Alan Build",
					sh: true,
					cwd: '{FILE_ACTIVE_PATH}',
					exec: 'bash -c "alan build sublime --wire"',
					errorMatch: "(?<file>\\S.*\\S):(?<line>[0-9]+):(?<col>[0-9]+):(?:error|warning): (?<message>.*(?:\n\t.*)*)"
				}
			]
		}
	}
}
