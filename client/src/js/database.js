import { openDB } from 'idb';

// initializes the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// Updates the databse
export const putDb = async (content) => {
  console.log('in the putDb function');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  const request = store.put({content});
  const result = await request;
  console.log('the database has been upadted!');
};

// gets the info from the database
export const getDb = async () => {

    console.log('getAll from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('got the stuff!');

};

initdb();
