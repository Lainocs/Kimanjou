// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

let app

if(!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

const auth = getAuth(app)
const db = getFirestore()

export { auth, db }
