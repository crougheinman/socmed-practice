import { Timestamp } from 'firebase/firestore';
export interface User {
  id?: string;
  uid?: string;
  displayName: string;
  email: string;
  emailVerified?: boolean;
  photoURL?: string;
  phoneNumber?: string;
  providerId?: string;
  validSince?: string;
  created?: Timestamp;
  updated?: Timestamp;
}
