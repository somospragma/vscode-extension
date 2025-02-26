import * as vscode from "vscode";
import { PROFILES } from "./main/constants/profiles";
import { ProfileMainViewProvider } from "./main/views/sidebar/main-view/profile-main-view-provider";
import {
  createProfile,
  profileExists,
  runCommand,
} from "./main/core/run-command";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 Profile Manager activado");
  // 📌 Registrar vista webview
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "profileMain",
      new ProfileMainViewProvider()
    )
  );

  // 📌 Registrar comando para cambiar perfiles
  let disposable = vscode.commands.registerCommand(
    "profileManager.selectProfile",
    async () => {
      const selectedProfile = await vscode.window.showQuickPick(
        Object.keys(PROFILES),
        { placeHolder: "👇🏻 Selecciona un perfil 👇🏻" }
      );

      if (!selectedProfile) {
        return;
      }

      vscode.window.showInformationMessage(
        `🔄 Cambiando al perfil "${selectedProfile}"...`
      );

      // 📌 Si el perfil no existe, crearlo e instalar extensiones
      if (!profileExists(selectedProfile)) {
        vscode.window.showInformationMessage(
          `🆕 Creando perfil "${selectedProfile}" y agregando extensiones...`
        );
        await createProfile(selectedProfile, PROFILES[selectedProfile]);
      } else {
        vscode.window.showInformationMessage(
          `🔄 Cambiando al perfil "${selectedProfile}"...`
        );
        // 📌 Activar el perfil
        await runCommand(`code --profile "${selectedProfile}"`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
