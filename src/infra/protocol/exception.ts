export interface Exception extends Error {
  code: string;
  status: number;
  message: string;
}
