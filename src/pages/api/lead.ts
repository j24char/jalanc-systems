import type { NextApiRequest, NextApiResponse } from 'next'

// Lazy-load firebase-admin to avoid SSR issues
let admin: typeof import('firebase-admin') | null = null;

function getAdmin() {
  if (!admin) {
    admin = require('firebase-admin');
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
  }
  return admin;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const admin = getAdmin();
    const db = admin.firestore();
    const lead = req.body;
    lead.createdAt = admin.firestore.FieldValue.serverTimestamp();
    await db.collection('leads').add(lead);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Failed to submit lead' });
  }
}
