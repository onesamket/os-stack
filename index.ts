#!/usr/bin/env node
import { Command } from "commander";
import * as inquirer from "inquirer";
import chalk from "chalk";
import simpleGit from "simple-git";
import { promises as fs } from "fs";
import * as path from "path";
const program = new Command();

interface Answers {
  projectName: string;
  template: string;
}

const git = simpleGit();

const repoUrl = "https://github.com/onesamket/tw-stack.git";
const templates: { [key: string]: string } = {
  "✨ - Nextjs Framework": "nextjs",
  "⚡ - Remix framework": "remix",
  "⚡ - Bun with HTMX": "bun-htmx",
  "🏗️ - MERN stack": "mern",
  "🌐 - SPA React": "react-spa",
  "📱 - React native with expo 51": "expo",
  "🔥 - React-Hono.js full-stack": "react-hono",
  "😀 - react-hapi.js full-stack": "react-hapi",
};

program
  .version("0.0.1")
  .description("Scaffold pre-configured projects with tw-stack");

program
  .command("create [project-name]")
  .action(async (projectName: string | undefined) => {
    if (!projectName) {
      const projectAnswer = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Enter the project name:",
          validate: (input: string) =>
            input ? true : "Project name is required.",
        },
      ]);
      projectName = projectAnswer.projectName;
    }

    const answers: Answers = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "Choose a template",
        choices: Object.keys(templates),
      },
    ]);
    // @ts-ignore
    const projectPath = path.join(process.cwd(), projectName);
    try {
      await fs.mkdir(projectPath);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "EEXIST") {
        console.log(chalk.red("Error: Project already exists."));
        process.exit(1);
      } else {
        throw err;
      }
    }

    await cloneTemplate(templates[answers.template], projectPath);

    console.log(chalk.green(`Project ${projectName} created successfully.`));
    console.log(chalk.blue(`Navigate to your project directory:`));
    console.log(chalk.blue(`Install dependencies using Bun:`));
    console.log(chalk.yellow(`bun install`));
  });

async function cloneTemplate(branchName: string, targetPath: string) {
  try {
    console.log(chalk.blue(`Cloning repository from ${repoUrl}...`));
    await git.clone(repoUrl, targetPath, [
      `--branch=${branchName}`,
      `--single-branch`,
    ]);
    console.log(chalk.green("Repository cloned successfully."));
    console.log(chalk.green(`cd ${targetPath}`));
    console.log(chalk.green(`bun install`));
    console.log(
      chalk.bgBlue.white(
        `Checkout GitHub repository: https://github.com/onesamket/tw-stack`
      )
    );
  } catch (err) {
    console.error(chalk.red(`Error cloning repository: ${err}`));
    process.exit(1);
  }
}

program.parse(process.argv);
