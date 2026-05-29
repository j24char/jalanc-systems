import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function addLead(lead: any) {
  const docRef = await addDoc(collection(db, 'leads'), lead);
  return docRef.id;
}
