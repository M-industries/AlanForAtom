'use babel';
'use strict';

import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';

export function provideBuilder() {
	return class AlanProvider extends EventEmitter {
		constructor(cwd) {
			super();
			this.cwd = cwd;
		}
		getNiceName() {
			return 'Alan Compiler';
		}
		isEligible() {
			return fs.existsSync(path.join(this.cwd, 'bootstrap.sh'));
		}
		settings() {
			return [
				{
					name: "Alan Application",
					sh: true,
					cwd: '{FILE_ACTIVE_PATH}',
					exec: "pushd {FILE_ACTIVE_PATH} && {PROJECT_PATH}/platform/client/devenv/alan-compiler {PROJECT_PATH}/platform/languages/application.lang --f-sublime --no-info compile /dev/null",
					errorMatch: "(?<file>\\S.*\\S):(?<line>[0-9]+):(?<col>[0-9]+):(?:error|warning): (?<message>.*(?:\n\t.*)*)",
					atomCommandName: 'Alan:compile-gui'
				},
				{
					name: "Alan GUI",
					sh: true,
					cwd: '{FILE_ACTIVE_PATH}',
					exec: "cd {FILE_ACTIVE_PATH} && {PROJECT_PATH}/platform/client/devenv/alan-compiler {PROJECT_PATH}/platform/client/devenv/languages/gui_definition.lang --f-sublime --no-info compile /dev/null",
					errorMatch: "(?<file>\\S.*\\S):(?<line>[0-9]+):(?<col>[0-9]+):(?:error|warning): (?<message>.*(?:\n\t.*)*)",
					atomCommandName: 'Alan:compile-gui'
				}
			]
		}
	}
}
