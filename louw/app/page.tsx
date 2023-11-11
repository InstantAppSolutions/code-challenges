"use client"

import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

import NavBar from '@/components/custom/nav-bar';
import { TodoWidget } from '@/components/widgets/todo-widget';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBngUKavZFMIWv0yZ63MC5iZFzu_Ga4BAk",
  authDomain: "instant-app-challenge.firebaseapp.com",
  projectId: "instant-app-challenge",
  storageBucket: "instant-app-challenge.appspot.com",
  messagingSenderId: "1028736960397",
  appId: "1:1028736960397:web:61f70cd465c615c703dfc4",
  measurementId: "G-8YHG98WQCW"
};

function FirebaseWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (<FirestoreProvider sdk={firestoreInstance}>
    {children}
  </FirestoreProvider>);
}

export default function Page() {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <FirebaseWrapper>
            <NavBar>
              <div className="flex m-2">
                <div className="m-auto w-full max-w-lg">
                  <TodoWidget />
                </div>
              </div>
            </NavBar>
          </FirebaseWrapper>
        </FirebaseAppProvider>
      </body>
    </html>
  )
}
