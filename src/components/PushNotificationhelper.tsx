import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        await GetFcmToken();
    }
    
}

async function GetFcmToken() {
    try {
        let fcmtoken = await AsyncStorage.getItem('fcmtoken');
        if (!fcmtoken) {
            fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                await AsyncStorage.setItem('fcmtoken', fcmtoken);
            }
        }
    } catch (error) {
        console.log('Error fetching FCM token:', error);
    }
}

export function NotificationListener() {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened from background state:', remoteMessage);
    });
    messaging().getInitialNotification().then(remoteMessage => {
        console.log('Notification opened from quit state:', remoteMessage);
    });
    messaging().onMessage(remoteMessage => {
        console.log('Notification received in foreground state:', remoteMessage);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Notification received in background state:', remoteMessage);
        // Perform background tasks if needed
    });
}
