#!/usr/bin/env node
// #!/usr/bin/env bun
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

const templates: { [key: string]: string } = {
  NextJS: "https://github.com/onesamket/nextjs.git",
  Remix: "https://github.com/onesamket/remix.git",
  MERN: "https://github.com/onesamket/tw-stack.git",
  "SPA React": "https://github.com/onesamket/spa.git",
  Expo: "https://github.com/onesamket/expo.git",
  "React-Hono.js Full-stack": "https://github.com/onesamket/honojs.git",
  "React-Hapi.js Full-stack": "https://github.com/onesamket/hapi.git",
};

program
  .version("1.0.0")
  .description("scaffold Pre configured projects with tw-stack");

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

    await cloneTemplate(answers.template, projectPath);

    console.log(chalk.green(`Project ${projectName} created successfully.`));
  });

async function cloneTemplate(templateName: string, targetPath: string) {
  const repoUrl = templates[templateName];

  try {
    console.log(chalk.blue(`Cloning repository from ${repoUrl}...`));
    await git.clone(repoUrl, targetPath);
    console.log(chalk.green("Repository cloned successfully."));
  } catch (err) {
    console.error(chalk.red(`Error cloning repository: ${err}`));
    process.exit(1);
  }
}

program.parse(process.argv);
