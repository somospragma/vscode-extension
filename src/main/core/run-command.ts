import { exec, execSync } from "child_process";
import * as vscode from "vscode";

export function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error ejecutando ${command}:`, error.message);
        reject(error.message);
        return;
      }
      if (stderr) {
        console.warn(`⚠️ stderr: ${stderr}`);
      }
      console.log(`✅ stdout: ${stdout}`);
      resolve(stdout.trim());
    });
  });
}

export async function createProfile(profileName: string, extensions: string[]) {
  //Nuevo
  if (profileExists(profileName)) {
    console.log(`🔹 El perfil "${profileName}" ya existe, omitiendo creación.`);
  } else {
    console.log(`🔹 Creando perfil: ${profileName}`);
    await runCommand(`code --profile "${profileName}"`);
  }

  // 📌 Instalar extensiones en el perfil (esperar a que cada instalación termine)
  for (const ext of extensions) {
    console.log(`🔹 Instalando extensión: ${ext} en perfil: ${profileName}`);
    await runCommand(
      `code --install-extension ${ext} --profile ${profileName}`
    );
  }

  console.log(`✅ Perfil "${profileName}" creado con extensiones.`);
  vscode.window.showInformationMessage(`✅ Perfil "${profileName}" creado.`);
}

export function profileExists(profileName: string): boolean {
  try {
    const result = execSync(
      `code --list-extensions --profile "${profileName}"`,
      { encoding: "utf8" }
    );
    // Si no hay error, significa que el perfil existe
    return true;
  } catch (error: any) {
    if (error.message.includes(`Profile '${profileName}' not found`)) {
      return false; // El perfil no existe
    }
    console.error("❌ Error verificando el perfil:", error.message);
    return false;
  }
}
