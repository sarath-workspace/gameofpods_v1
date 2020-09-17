export interface Cmpreport {
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
  pcodeSmells: number
  pbugs: number
  pcoverage: number
  bugsDifference: number
  codesmellDifference: number
  coverageDifference: number
  engineerBatch: boolean
  bugsBatch: boolean
  coverageBatch: boolean
  devilBatch: boolean
  testFailures: number
  skippedTests: number
  linesToCover: number
}
