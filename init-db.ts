import * as firebase from 'firebase';
import { USERS } from './db-data';
const config = {
  apiKey: 'AIzaSyCJwyVmDALuusfMiUFkeTnJHB8k-t4jl4E',
  authDomain: 'monllorgame.firebaseapp.com',
  databaseURL: 'https://monllorgame.firebaseio.com',
  projectId: 'monllorgame',
  storageBucket: 'monllorgame.appspot.com',
  messagingSenderId: '676008548347',
  appId: '1:676008548347:web:5849cb651142caf277dd5e'
};

console.log('Uploading data to the database with the following config:\n');
console.log(JSON.stringify(config));

console.log('\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n');

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then(r => console.log('Done.'));

async function main() {
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  } catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}

async function uploadData() {
  const users = await db.collection('users');
  for (let user of Object.values(USERS)) {
    const userRef = await users.add(user);
    console.log(`Uploading user ${user['firstname']}`);
  }
}


