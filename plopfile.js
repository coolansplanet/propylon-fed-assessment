import { readdirSync } from "fs";

export default (plop) => {
  const pathBase = "./src/components";
  const getDirectories = () =>
    readdirSync(pathBase, { withFileTypes: true })
      .filter((oneItem) => oneItem.isDirectory())
      .map((oneItem) => pathBase + "/" + oneItem.name);

  const folder = "{{folder}}";

  const createComponentPrompt = {
    type: "input",
    name: "name",
    message: "What's the component's name?",
  };
  const chooseFolderPrompt = {
    type: "list",
    name: "folder",
    message: "Choose a folder",
    choices: getDirectories(),
  };

  plop.setGenerator("component", {
    description: "Components for React",
    prompts: [{ ...createComponentPrompt }, { ...chooseFolderPrompt }],
    actions: [
      {
        type: "add",
        path: folder + "/{{PascalCase name}}.tsx",
        templateFile: "src/templates/component.hbs",
      },
      {
        type: "add",
        path: folder + "/{{PascalCase name}}.types.ts",
        templateFile: "src/templates/typesFile.hbs",
      },
      {
        type: "add",
        path: folder + "/{{PascalCase name}}.test.tsx",
        templateFile: "src/templates/testFile.hbs",
      },
    ],
  });

  plop.setGenerator("group", {
    description: "Folder with components",
    prompts: [{ ...createComponentPrompt }],
    actions: [
      {
        type: "add",
        path: `${pathBase}/{{PascalCase name}}/{{PascalCase name}}.tsx`,
        templateFile: "src/templates/component.hbs",
      },
      {
        type: "add",
        path:
          folder +
          `${pathBase}/{{PascalCase name}}/{{PascalCase name}}.types.ts`,
        templateFile: "src/templates/typesFile.hbs",
      },
      {
        type: "add",
        path:
          folder +
          `${pathBase}/{{PascalCase name}}/{{PascalCase name}}.test.tsx`,
        templateFile: "src/templates/testFile.hbs",
      },
      {
        type: "add",
        path: folder + `${pathBase}/{{PascalCase name}}/index.ts`,
        templateFile: "src/templates/index.hbs",
      },
    ],
  });

  plop.setHelper("PascalCase", (aString) => {
    return (aString.match(/[a-zA-Z0-9]+/g) || [])
      .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
      .join("");
  });
};
