# FED Assessment for Propylon

This is a [React](https://react.dev/) + [Typescript](https://www.typescriptlang.org/) project created with [Vite](https://vitejs.dev/) for the FED Assesment required by Propylon.

## How to run on dev mode

1. Clone this repository.
2. Open a terminal, and download dependencies through `npm install` or `yarn install`
3. Go the folder project and type `npm run dev` or `yarn dev`

---

## Folder structure

Folders and files must be organized as follows:

```
src/
├── __mocks__/
│ ├── mock1.json
│ ├── mock2.json
│ ├── ...
├── components/
│ ├── ComponentGroup1/
│ ├── ComponentGroup2/
│ ├── ...
├── config/
│ ├── config.ts
│ ├── configFile2.ts
│ ├── configFile3.ts
│ ├── ...
│ ├── index.ts
├── helpers/
│ ├── helper1.ts
│ ├── helper2.ts
│ ├── useHook1.ts
│ ├── useHook2.ts
│ ├── ...
├── pages/
│ ├── Page1.tsx
│ ├── Page2.tsx
│ ├── ...
├── store/
│ ├── useStore1.ts
│ ├── useStore1.types
│ ├── useStore2.ts
│ ├── useStore2.types
│ ├── ...
├── styles/
│ ├── theme.tsx
│ ├── ...
├── templates/
│ ├── template1.hbs
│ ├── template2.hbs
│ ├── ...
├── types/
│ ├── type1.ts
│ ├── type2.ts
│ ├── ...
...
```

- `src/__mocks`: every mock used for unit tests (or for any general purpose) is located here.
- `src/components`: this folder contains groups of React components, utilized by pages and other components.
- `src/config`: general static values used along the application goes here.
- `src/helpers`: contains general helpers functions, including hooks.
- `src/pages`: contains page components.
- `src/store`: contains hooks utilized for shared global state management.
- `src/styles`: styles for general purposes (like the MUI theme).
- `src/templates`: templates for file generation through the `generate` script.
- `src/types`: types for general purpose.

---

## Component generation

Please use the provided scripts for component generation:

- `npm run generate component` for single components
- `npm run generate group` for group of components.

In both cases, every single component will be generated with its corresponding type and test files (those can be removed later if they aren't needed). This component generation is performed using the [Plop](https://plopjs.com/) library and its configuration can be found in `plopfile.js`. Templates used for file generation can be found in the `./templates` folder.

---

## Routing

This project uses [React Router](https://reactrouter.com) for routing management, through the `react-router-dom` package. It's important not to confuse this package with `react-router-native`, especially when reading documentation.

---

## API requests

API requests can be handled by the `useApi()` hook as follows:

```typescript
import useApi from "@/helpers/useApi";

/* ... */

const api = useApi();

const { data, isFetched, isFetching, isError, error, ...rest } =
  api.legislation.get({
    ...queryParams,
  });
```

As this hook uses the [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) library under the hood, all the `get` requests (like `api.legislation.get({...queryParams})`, for instance) will return the object returned by the `useQuery(...)` hook. On the other hand, requests that involve mutation (like `post`, `put` and `delete`) will return the object returned by the `useMutation(...)` hook. Please read the [official documentation](https://tanstack.com/query/latest/docs/framework/react/overview) for further information.

In order to perform the requests, `useApi()` utilizes the functions provided by `src/helpers/api.ts`. This approach makes it easier to mock those requests during unit tests.

---

## Global state management

Is handled by the [Zustand](https://github.com/pmndrs/zustand) library, and the files are located in the `./store` folder.

---

## Testing:

This project uses [Vitest](https://vitest.dev/guide/features) and [React Testing Library](https://testing-library.com/docs/react-testing-library) for unit tests, and its setup file is `vitest.setup.ts`. Mocks are located in `src/__mocks__`.

- `npm run test` or `yarn test` runs tests in watch mode.
- `npm run test --run` or `yarn test --run` runs tests in non-watch mode.
- `npm run test-coverage` or `yarn test-coverage` runs tests in non-watch mode, and with coverage report.

---

## Code formatting

Code formatting is performed by [Prettier](https://prettier.io), and its configuration can be found in the `.prettierrc` file.

---

## Git Hooks (through Husky)

This repository uses [Git Hooks](https://git-scm.com/docs/githooks) in order to trigger actions on every checkout, merge, commit and push, and it's handled by the [Husky](https://typicode.github.io/husky) library, which makes it easier to set up.

---

## SonarQube:

This tool is an automatic code review tool that helps developers to deliver clean code. Docs can be found on [this link](https://docs.sonarsource.com/sonarqube)

### How to run it:

1. Make sure you have Docker installed and running.

2. Run the sonar docker containers with `docker compose up -d`

3. Open [http://localhost:9000](http://localhost:9000) with your browser

If you're running this Sonarqube server for the first time, the username and password to login will be `admin` (for both of them). Once you've logged in, please make sure you change the password into a more secure one, and use the token and data provided to fullfill the following environment variables: `SONAR_PROJECT_KEY`, `SONAR_PROJECT_NAME` and `SONAR_TOKEN`

Once the Sonarqube server is running, you can scan this repository code with it:

- To run sonarLint: `npm run sonarLint` or `yarn sonarLint`

- To run sonar-scanner: `npm run sonar` or `yarn sonar`

---

## More info about libraries and tools used in this repository:

- [Plop](https://plopjs.com/)
- [Vitest](https://vitest.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Husky](https://typicode.github.io/husky)
- [Git Hooks](https://git-scm.com/docs/githooks)
- [SonarQube](https://docs.sonarsource.com/sonarqube)
- [Material UI](https://mui.com/)
- [React Router](https://reactrouter.com)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Testing Library](https://testing-library.com/docs/react-testing-library)
