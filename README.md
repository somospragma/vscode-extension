# 💜 Pragma extension manager 💜

Extensión de Visual Estudio Code que nos ayuda a mantener perfiles de desarrollo y alternar entre ellos cuando lo querramos.

## Funcionalidades

* Creación de perfiles de VsCode
* Instalación de extensiones propias de cada perfil
* Cambio entre perfiles a elección del usuario

## Requisitos
> [!NOTE]
> Debes asegurarte de tener instalado el comando **code** en tu máquina en windows no es necesario pero en mac debes precionar
> ```
> cmd + shift + p
> ```
> y elegir la opción "Shell command 'code' successfully installed in PATH." para poder instalar code 

## Release Notes

Primer release de la extension 

### 0.0.1

* Creación de perfiles de VsCode
* Instalación de extensiones propias de cada perfil
* Cambio entre perfiles a elección del usuario

## Cómo correr en local?

* Hacer pull de la rama principal
* Luego de realizar cada cambio nos posicionaremos en cd prxm/ y si ya tenemos una carpeta dist ejecutaremos el comando 
>```
> rm -rf dist
> npm run package
> ```
sino, solo
>```
> npm run package
> 

* Ejecutar en modo debugg la extension, para esto debemos elegir el archivo extension.ts y precionar f5 con esto nos abrirá una nueva instancia en modo debugg de vscode

## Guía de desarrollo de extensiones

Si deseas aprender mas sobre desarrollar extensiones ingresa a el link de abajo 👇🏻

* [Documentación sobre extensiones VsCode](https://code.visualstudio.com/api/extension-guides/overview)

## Equipo de trabajo
* [Jorge Omar Perez](mailto:jperezpenaranda@gmail.com)
* [Jamer Pinto](mailto:hammer.pinto@pragma.com.co)