export interface User {
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  uid: string;
}

export interface UserContextType {
  user: User | null | false;
  setUser: (user: User | null) => void;
  registerUser: (email: string, password: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  signOutUser: () => Promise<void>;
} 