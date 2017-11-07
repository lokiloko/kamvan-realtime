import Firebase from 'firebase'
var firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDWG29i5-7fnSqfozvRdbFM9FU04vmE1iE',
  authDomain: 'ian-kamvan.firebaseapp.com',
  databaseURL: 'https://ian-kamvan.firebaseio.com',
  projectId: 'ian-kamvan',
  storageBucket: 'ian-kamvan.appspot.com',
  messagingSenderId: '955713055337'
})
var db = firebaseApp.database()

export default db
