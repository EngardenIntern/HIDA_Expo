import { Image, StyleSheet, Platform, Text } from 'react-native';
import * as React from 'react';
import {WebView} from 'react-native-webview';
import * as Notifications from 'expo-notifications';

export default function HomeScreen() {

  React.useEffect(() => {
    sendNotification();

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received: ', notification);
    });

    return () => subscription.remove();
  }, []);


  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  })

  React.useEffect(() => {
    (async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('알림 권한이 거부되었습니다.');
      }
    })();
  })

  const sendNotification = async () => {

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'E끌림',
        body: '오늘의 일기를 작성해주세요.',
      },
      trigger: null,
    });
  };

  return (
    <WebView
      source={{uri: 'http://ngarden.asuscomm.com:61110'}}
    />
  );
}
