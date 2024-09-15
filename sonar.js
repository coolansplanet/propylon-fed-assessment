/*global process*/
import sonarqubeScanner from "sonarqube-scanner";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const server = sonarqubeScanner.default(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.projectKey": process.env.SONAR_PROJECT_KEY,
      "sonar.projectName": process.env.SONAR_PROJECT_NAME,
      "sonar.token": process.env.SONAR_TOKEN,
      "sonar.scm.enabled": "false",
      "sonar.sources": ".",
      "sonar.tests": ".",
      "sonar.inclusions": "**",
      "sonar.test.inclusions": "**/*.test.*",
      "sonar.test.exclusions": "**/node_modules/**",
      "sonar.javascript.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "coverage/sonar-report.xml",
      "sonar.eslint.reportPaths": "coverage/report.json",
    },
  },

  function () {}
);
export default server;
