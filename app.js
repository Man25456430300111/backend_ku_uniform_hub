// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const serviceAccount = require('./firebase/backend-ku-uniform-hub-firebase-adminsdk-wd3c5-414d634118.json'); // ใส่พาธไฟล์ credentials ของคุณ

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ตั้งค่า Auth object จาก Firebase Admin SDK
// const auth = admin.auth();
// const db = admin.firestore();

// // API สำหรับ Sign Up
// app.post('/api/signup', async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;

//   try {
//     // สร้างผู้ใช้ใน Firebase Authentication
//     const userRecord = await auth.createUser({
//       email: email,
//       password: password,
//       displayName: `${firstname} ${lastname}`,
//     });
//     console.log('User created:', userRecord); // ตรวจสอบว่าผู้ใช้ถูกสร้างหรือไม่

//     // บันทึกข้อมูลผู้ใช้ลงใน Firestore
//     await db.collection('users').doc(userRecord.uid).set({
//       firstname: firstname,
//       lastname: lastname,
//       email: email,
//       createdAt: new Date(),
//     });
//     console.log('User data saved in Firestore:', userRecord.uid); // ตรวจสอบว่าข้อมูลถูกบันทึกหรือไม่

//     res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
//   } catch (error) {
//     console.error('Error creating user:', error); // ตรวจสอบข้อผิดพลาดในการสร้างผู้ใช้
//     res.status(400).send({ message: 'Error creating user', error: error.message });
//   }
// });



// // API สำหรับ Login ด้วย ID Token
// app.post('/api/login', async (req, res) => {
//   const { idToken } = req.body;
//   console.log('Received ID Token:', idToken); // แสดง token ที่ได้รับจาก Frontend

//   try {
//     // ตรวจสอบและถอดรหัส token ที่ได้รับจาก Frontend
//     const decodedToken = await auth.verifyIdToken(idToken);
//     const uid = decodedToken.uid;
//     console.log('Decoded Token UID:', uid); // แสดง UID ที่ถอดรหัสได้จาก token

//     // ดึงข้อมูลผู้ใช้จาก Firestore
//     const userDoc = await db.collection('users').doc(uid).get();
//     if (!userDoc.exists) {
//       console.log('User not found in Firestore');
//       return res.status(404).send({ message: 'User not found in Firestore' });
//     }

//     const userData = userDoc.data();
//     console.log('User data from Firestore:', userData); // แสดงข้อมูลผู้ใช้ที่ได้จาก Firestore
//     res.status(200).send({ message: 'User authenticated', uid: uid, userData: userData });
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     res.status(401).send({ message: 'Authentication failed', error: error.message });
//   }
// });

// // API สำหรับดึงข้อมูลผู้ใช้
// app.get('/api/user/:uid', async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const userDoc = await db.collection('users').doc(uid).get();
//     if (!userDoc.exists) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     res.status(200).send(userDoc.data());
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send({ message: 'Error fetching user data', error: error.message });
//   }
// });

// // เริ่มเซิร์ฟเวอร์
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const serviceAccount = require('./firebase/backend-ku-uniform-hub-firebase-adminsdk-wd3c5-414d634118.json');

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// const auth = admin.auth();
// const db = admin.firestore();

// // API สำหรับ Sign Up
// app.post('/api/signup', async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;

//   try {
//     // ตรวจสอบว่ามีอีเมลในระบบอยู่แล้วหรือไม่
//     const user = await auth.getUserByEmail(email).catch(() => null);
//     if (user) {
//       return res.status(400).send({
//         message: 'Error creating user',
//         error: 'The email address is already in use by another account.',
//       });
//     }

//     // สร้างผู้ใช้ใน Firebase Authentication
//     const userRecord = await auth.createUser({
//       email: email,
//       password: password,
//       displayName: `${firstname} ${lastname}`,
//     });
//     console.log('User created:', userRecord);

//     // บันทึกข้อมูลผู้ใช้ลงใน Firestore
//     await db.collection('users').doc(userRecord.uid).set({
//       firstname: firstname,
//       lastname: lastname,
//       email: email,
//       createdAt: new Date(),
//     });
//     console.log('User data saved in Firestore:', userRecord.uid);

//     res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(400).send({ message: 'Error creating user', error: error.message });
//   }
// });

// // API สำหรับ Login ด้วย ID Token
// app.post('/api/login', async (req, res) => {
//   const { idToken } = req.body;
//   console.log('Received ID Token:', idToken);

//   try {
//     const decodedToken = await auth.verifyIdToken(idToken);
//     const uid = decodedToken.uid;
//     console.log('Decoded Token UID:', uid);

//     const userDoc = await db.collection('users').doc(uid).get();
//     if (!userDoc.exists) {
//       console.log('User not found in Firestore');
//       return res.status(404).send({ message: 'User not found in Firestore' });
//     }

//     const userData = userDoc.data();
//     console.log('User data from Firestore:', userData);
//     res.status(200).send({ message: 'User authenticated', uid: uid, userData: userData });
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     res.status(401).send({ message: 'Authentication failed', error: error.message });
//   }
// });

// // API สำหรับดึงข้อมูลผู้ใช้
// app.get('/api/user/:uid', async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const userDoc = await db.collection('users').doc(uid).get();
//     if (!userDoc.exists) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     res.status(200).send(userDoc.data());
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send({ message: 'Error fetching user data', error: error.message });
//   }
// });

// // เริ่มเซิร์ฟเวอร์
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const serviceAccount = require('./firebase/backend-ku-uniform-hub-firebase-adminsdk-wd3c5-414d634118.json');

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// const auth = admin.auth();
// const db = admin.firestore();

// // API สำหรับ Sign Up
// app.post('/api/signup', async (req, res) => {
//     const { email, password, firstname, lastname } = req.body;

//     try {
//         // ตรวจสอบว่ามีอีเมลในระบบอยู่แล้วหรือไม่
//         const user = await auth.getUserByEmail(email).catch(() => null);
//         if (user) {
//             return res.status(400).send({
//                 message: 'Error creating user',
//                 error: 'The email address is already in use by another account.',
//             });
//         }

//         // สร้างผู้ใช้ใน Firebase Authentication
//         const userRecord = await auth.createUser({
//             email: email,
//             password: password,
//             displayName: `${firstname} ${lastname}`,
//         });
//         console.log('User created:', userRecord);

//         // บันทึกข้อมูลผู้ใช้ลงใน Firestore
//         await db.collection('users').doc(userRecord.uid).set({
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             createdAt: new Date(),
//         });
//         console.log('User data saved in Firestore:', userRecord.uid);

//         res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(400).send({ message: 'Error creating user', error: error.message });
//     }
// });

// // API สำหรับ Login ด้วย ID Token
// app.post('/api/login', async (req, res) => {
//     const { idToken } = req.body;
//     console.log('Received ID Token:', idToken);

//     try {
//         const decodedToken = await auth.verifyIdToken(idToken);
//         const uid = decodedToken.uid;
//         console.log('Decoded Token UID:', uid);

//         const userDoc = await db.collection('users').doc(uid).get();
//         if (!userDoc.exists) {
//             console.log('User not found in Firestore');
//             return res.status(404).send({ message: 'User not found in Firestore' });
//         }

//         const userData = userDoc.data();
//         console.log('User data from Firestore:', userData);
//         res.status(200).send({ message: 'User authenticated', uid: uid, userData: userData });
//     } catch (error) {
//         console.error('Error during authentication:', error);
//         res.status(401).send({ message: 'Authentication failed', error: error.message });
//     }
// });

// // API สำหรับดึงข้อมูลผู้ใช้
// app.get('/api/user/:uid', async (req, res) => {
//     const { uid } = req.params;

//     try {
//         const userDoc = await db.collection('users').doc(uid).get();
//         if (!userDoc.exists) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         res.status(200).send(userDoc.data());
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).send({ message: 'Error fetching user data', error: error.message });
//     }
// });

// // เริ่มเซิร์ฟเวอร์
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// สร้างการตั้งค่า Firebase โดยใช้ตัวแปรแวดล้อมจากไฟล์ .env
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // แก้ไข \n ให้เป็นบรรทัดใหม่
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

const auth = admin.auth();
const db = admin.firestore();

// API สำหรับ Sign Up
app.post('/api/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    try {
        // ตรวจสอบว่ามีอีเมลในระบบอยู่แล้วหรือไม่
        const user = await auth.getUserByEmail(email).catch(() => null);
        if (user) {
            return res.status(400).send({
                message: 'Error creating user',
                error: 'The email address is already in use by another account.',
            });
        }

        // สร้างผู้ใช้ใน Firebase Authentication
        const userRecord = await auth.createUser({
            email: email,
            password: password,
            displayName: `${firstname} ${lastname}`,
        });
        console.log('User created:', userRecord);

        // บันทึกข้อมูลผู้ใช้ลงใน Firestore
        await db.collection('users').doc(userRecord.uid).set({
            firstname: firstname,
            lastname: lastname,
            email: email,
            createdAt: new Date(),
        });
        console.log('User data saved in Firestore:', userRecord.uid);

        res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).send({ message: 'Error creating user', error: error.message });
    }
});

// API สำหรับ Login ด้วย ID Token
app.post('/api/login', async (req, res) => {
    const { idToken } = req.body;
    console.log('Received ID Token:', idToken);

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;
        console.log('Decoded Token UID:', uid);

        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            console.log('User not found in Firestore');
            return res.status(404).send({ message: 'User not found in Firestore' });
        }

        const userData = userDoc.data();
        console.log('User data from Firestore:', userData);
        res.status(200).send({ message: 'User authenticated', uid: uid, userData: userData });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(401).send({ message: 'Authentication failed', error: error.message });
    }
});

// API สำหรับดึงข้อมูลผู้ใช้
app.get('/api/user/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(userDoc.data());
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send({ message: 'Error fetching user data', error: error.message });
    }
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
