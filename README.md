# Os-stack CLI

Os-stack is a command-line interface (CLI) tool for scaffolding pre-configured projects with the Os-stack template. It allows developers to quickly create new projects based on predefined templates, reducing setup time and ensuring consistency across projects.

## Installation

Before using Os-stack, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager) installed on your machine.

You can install Os-stack globally using npm:

```bash
npm install -g Os-stack
```

## Usage

To create a new project using Os-stack, run the following command:

```
 Os-stack create new-project
```

## Templates

Os-stack supports the following templates:

- NextJS
- Remix
- MERN
- SPA React
- Expo
- React-Hono.js Full-stack
- React-Hapi.js Full-stack

## Options

```
Os-stack create [project-name]
```

Creates a new project with the specified project name.

**project-name:** The name of the project to create.

```
Os-stack --version
```

Displays the current version of Os-stack.

```
Os-stack --help
```

Displays usage information and a list of available commands.
