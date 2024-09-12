declare module 'email-existence' {
    export function check(email: string, callback: (err: Error | null, exists: boolean) => void): void;
  }
  