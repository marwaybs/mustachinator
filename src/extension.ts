// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Console log --mustachinator');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('mustachinator.createMustacheTemplate', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.commands.executeCommand('editor.action.insertCursorAtEndOfEachLineSelected');
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			let splitHtml = document.getText(selection).split('\n');
			
			for (let i = 0; i < splitHtml.length; i++) {
				//remove line break
				splitHtml[i] = splitHtml[i].replace(/(\r\n|\n|\r)/gm, "");
				//adding mustache template syntax
				if (splitHtml[i].trim() !== '') {
					splitHtml[i] = splitHtml[i].replace(/(\s*)(.*)/, "$1\"$2 \" +");
				}
			}

			// joining html with break lines
			const template = splitHtml.join('\n');

			// replacing selection with mustache template
			editor.edit(editBuilder => {
				editBuilder.replace(selection, template);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
