// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as nanoid from 'nanoid';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('python-cacheit.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from python-cacheit! asd');
	});

	let mycommand = vscode.commands.registerCommand('python-cacheit.cacheit', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		
		let selection = editor.selection;
		let text = editor.document.getText(selection);
		if (text.length == 0) {
			return;
		}

		let index = text.indexOf("=");

		if (index == -1) {
			vscode.window.showInformationMessage("Indexof == -1");
			return;
		}
		
		let lhs = text.substring(0, index).trim();
		let rhs = text.substring(index + 1).trim();

		const re = /-/g;
		const nnid = nanoid.nanoid().replace(re, "_").substring(0, 5);

		let code = `def get_${lhs}${nnid}(hsh_: int):\n`
		code += `    return ${rhs}\n`
		code += `${lhs} = get_${lhs}(hsh_=magichash(${lhs}))`

		editor.edit(editBuilder => {
			editBuilder.replace(selection, code);
		});

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(mycommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
