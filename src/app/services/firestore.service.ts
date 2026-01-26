import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  docData,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  readonly batchMaxLength = 500;
  private readonly firestore = inject(Firestore);

  constructor() {}

  getDocument<T = any>(collectionPath: string): Observable<T[]> {
    const collectionInstance = collection(this.firestore, collectionPath);
    const q = query(collectionInstance, orderBy('updated', 'desc'));
    return collectionData(q) as Observable<T[]>;
  }

  getDocumentById<T = any>(collectionPath: string, id: string): Observable<T | undefined> {
    const documentInstance = doc(this.firestore, `${collectionPath}/${id}`);
    return docData(documentInstance) as Observable<T>;
  }

  getDocumentByQuery<T = any>(collectionPath: string, queryFn: (ref: any) => any): Observable<T[]> {
    const collectionInstance = collection(this.firestore, collectionPath);
    const q = queryFn(query(collectionInstance));
    return collectionData(q) as Observable<T[]>;
  }

  async addDocument(collectionPath: string, data: any): Promise<string> {
    const collectionInstance = collection(this.firestore, collectionPath);
    const docRef = await addDoc(collectionInstance, data);
    return docRef.id;
  }

  async updateDocument(collectionPath: string, id: string, data: any): Promise<void> {
    const documentInstance = doc(this.firestore, `${collectionPath}/${id}`);
    await updateDoc(documentInstance, data);
  }

  async deleteDocument(collectionPath: string, id: string): Promise<void> {
    const documentInstance = doc(this.firestore, `${collectionPath}/${id}`);
    await deleteDoc(documentInstance);
  }
}
