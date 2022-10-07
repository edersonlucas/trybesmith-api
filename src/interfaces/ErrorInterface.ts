export default interface IError extends Error {
  code: number,
  message: string
}