// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	 let getDisposable = vscode.commands.registerCommand('api-code-template.get', function () {
		// 处理选中文本替换成"Hello VSCode!!!"
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			return;
		}
		let selection = activeEditor.selection
		var text = activeEditor.document.getText(selection);
		const fullName = text;
		const apiName = fullName.split('/').pop(); 
		const codeStr = `export function ${apiName} (params) {
			return http({
			  url: '${fullName}',
			  method: 'GET',
			  params
			});
		  }
		  `; 
		text = codeStr;
		activeEditor.edit((editBuilder) => {
			editBuilder.replace(selection, text);
		})
	});
	context.subscriptions.push(getDisposable);

	let postDisposable = vscode.commands.registerCommand('api-code-template.post', function () {
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			return;
		}
		let selection = activeEditor.selection
		var text = activeEditor.document.getText(selection);
		const fullName = text;
		const apiName = fullName.split('/').pop(); 
		const codeStr = `export function ${apiName} (data) {
			return http({
			  url: '${fullName}',
			  method: 'POST',
			  data
			});
		  }`; 
		text = codeStr;
		activeEditor.edit((editBuilder) => {
			editBuilder.replace(selection, text);
		})
	});
	context.subscriptions.push(postDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
