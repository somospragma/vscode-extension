import * as vscode from "vscode";

export class ProfileMainViewProvider implements vscode.WebviewViewProvider {
    resolveWebviewView(webviewView: vscode.WebviewView) {
      webviewView.webview.options = { enableScripts: true };
      webviewView.webview.html = `
          <style>
          body { font-family: sans-serif; text-align: center; padding: 10px; }
          button { 
              background-color: #007acc; 
              color: white; 
              border: none; 
              padding: 10px 20px; 
              font-size: 14px; 
              cursor: pointer; 
              border-radius: 4px;
              }
              button:hover { background-color: #005f99; }
              </style>
              <body>
              <h1>💜Pragma extension manager🟣</h1>
              <p>Selecciona un perfil para instalar las extensiones necesarias dependiendo de tu chaper o equipo.</p>
              <ul>
              <li>Frontend Developer</li>
              <li>Backend Developer</li>
              <li>Full Stack</li>
              </ul>
              <p>👇 Haz clic en el botón para seleccionar un perfil:</p>
              <button id="selectProfile">Seleccionar Perfil</button>
              <script>
              const vscode = acquireVsCodeApi();
              document.getElementById("selectProfile").addEventListener("click", () => {
                  vscode.postMessage({ command: "selectProfile" });
                  });
                  </script>
                  </body>
                  `;
  
      webviewView.webview.onDidReceiveMessage((message) => {
        if (message.command === "selectProfile") {
          vscode.commands.executeCommand("profileManager.selectProfile");
        }
      });
    }
  }