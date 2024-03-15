// tokenStorage.js

const DB_NAME = 'JWTTokenDB';
const STORE_NAME = 'JWTTokenStore';

function openDB() {
 return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, 1);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'key' });
    };

    openRequest.onsuccess = function(event) {
      resolve(event.target.result);
    };

    openRequest.onerror = function(event) {
      reject(event.target.error);
    };
 });
}

export async function saveToken(token) {
 const db = await openDB();
 return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    // Adjusted to pass an object with a 'key' property
    const request = store.put({ key: 'jwtToken', token: token });

    request.onsuccess = function() {
      resolve();
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
 });
}

export async function getToken(key) {
 const db = await openDB();
 return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = function(event) {
      resolve(event.target.result ? event.target.result.token : null);
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
 });
}

export async function removeToken(key) {
 const db = await openDB();
 return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);

    request.onsuccess = function() {
      resolve();
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
 });
}
