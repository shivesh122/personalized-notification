# Effling Kids – Personalized Notifications  

Effling Kids supports **personalized notifications** to keep kids engaged and parents informed.  
This README explains how to set up, configure, and extend the notification system in your app.  

---

## ✨ Features  

- **Personalized messages** based on child’s profile (age, name, progress).  
- **Event-driven triggers** for milestones, new activities, and updates.  
- **Parent preferences** (choose what type of notifications to receive).  
- **Safe scheduling** (avoid spam, respect quiet hours).  
- **Cross-platform support** for Android, iOS, and Web.  

---

## ⚙️ Setup Instructions  

### 1. Install Dependencies  

For **Firebase Cloud Messaging (FCM)** (recommended):  

```bash
# For React Native / Expo
npm install @react-native-firebase/app @react-native-firebase/messaging

# For Node backend
npm install firebase-admin
```

---

### 2. Configure Firebase  

- Add your Firebase project credentials (`google-services.json` for Android, `GoogleService-Info.plist` for iOS).  
- Enable **Cloud Messaging** in Firebase Console.  

---

### 3. Request Permission (Frontend Example – React Native)  

```javascript
import messaging from '@react-native-firebase/messaging';

async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
  }
}
```

---

### 4. Get Device Token  

```javascript
async function getDeviceToken() {
  const token = await messaging().getToken();
  console.log("FCM Device Token:", token);
  // Save this token to backend linked with child/parent profile
}
```

---

### 5. Send Personalized Notification (Backend Example – Node.js)  

```javascript
const admin = require("firebase-admin");
admin.initializeApp();

async function sendPersonalizedNotification(token, childName, message) {
  const payload = {
    notification: {
      title: `Hey ${childName}!`,
      body: message,
    },
    token: token,
  };

  try {
    await admin.messaging().send(payload);
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

// Example usage:
sendPersonalizedNotification(
  "DEVICE_TOKEN_HERE",
  "Aarav",
  "Don’t forget to finish today’s puzzle challenge!"
);
```

---

## 🔔 Example Notifications  

- **Learning reminder** → `"Hi Aarav! Time for your math game."`  
- **Motivation** → `"Wow! You just unlocked a new badge."`  
- **Parent update** → `"Aarav completed 3 activities this week."`  
- **Event alert** → `"New bedtime story unlocked today!"`  

---

## 🛡 Privacy & Safety  

- All notifications are **child-safe and parent-approved**.  
- No ads, no spam.  
- Parents can adjust notification settings anytime.  

---

## 📌 Roadmap  

- 🎯 AI-driven smart reminders.  
- 📅 Weekly parent summary notifications.  
- 🌍 Multi-language notification support.  

---

## 👩‍💻 Contribution  

1. Fork the repo.  
2. Create a feature branch.  
3. Submit a pull request with your changes.  

---

## 📞 Support  

For issues or feedback:  
📧 support@efflingkids.com  
