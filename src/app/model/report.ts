export interface Report {
  teamName: string,
  projectName: string,
  id: string,
  reportDateTime: string
  violations: number
  nclocLanguageDistribution: string
  lines: number,
  classes: number
  functions: number
  statements: number
  codeSmells: number
  bugs: number
  coverage: number
  testFailures: number
  skippedTests: number
  linesToCover: number
}
