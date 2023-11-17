export type TIsJSON = "JSON" | "Form" | "WRONG" | null

export interface IRequestContentReturn {
    data: FormData | null;
    message: string;
  }