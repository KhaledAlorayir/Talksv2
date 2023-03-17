import { ZodIssue } from "zod";

export interface ServerToClientEvents {
  joined: (args: { room: string }) => void;
  receive: (args: { message: string }) => void;
  waiting: () => void;
}

export interface ClientToServerEvents {
  join: (
    args: { subject: string },
    validationCallback: (error: ZodIssue[]) => void
  ) => void;
  message: (args: { message: string }) => void;
}
