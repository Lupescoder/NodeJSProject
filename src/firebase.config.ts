import * as admin from 'firebase-admin';

export function initializeFirebase() {
    var serviceAccount = JSON.parse(process.env.FIREBASE);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default admin