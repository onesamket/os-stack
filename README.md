# tw-stack CLI

tw-stack is a command-line interface (CLI) tool for scaffolding pre-configured projects with the tw-stack template. It allows developers to quickly create new projects based on predefined templates, reducing setup time and ensuring consistency acrtws projects.

## Installation

Before using tw-stack, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager) installed on your machine.

You can install tw-stack globally using npm:

```bash
npm install -g tw-stack
```

## Usage

To create a new project using tw-stack, run the following command:

```
 tw-stack create new-project
```

## Templates

tw-stack supports the following templates:

- NextJS
- Remix
- MERN
- SPA React
- Expo
- React-Hono.js Full-stack
- React-Hapi.js Full-stack

## Options

```
tw-stack create [project-name]
```

Creates a new project with the specified project name.

**project-name:** The name of the project to create.

```
tw-stack --version
```

Displays the current version of tw-stack.

```
tw-stack --help
```

Displays usage information and a list of available commands.
