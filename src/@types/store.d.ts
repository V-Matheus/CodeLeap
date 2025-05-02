declare global {
  interface User {
    id: string;
    username: string;
  }

  interface UserState {
    user: User | null;
  }
}

export {};