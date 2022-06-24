import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import styled from 'styled-components/native';
import notifee, { EventType, AndroidStyle } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import UserProfileView from './src/Components/UserProfileView';
import NotificationTestView from './src/Components/NotificationTestView';
import messagingNotification from './src/Notifications/MessagingNotification';
import bigPictureNotification from './src/Notifications/BigPictureNotification';
import NotificationHistory from './src/Components/NotificationHistory';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const setupNotificationPermissions = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    return true;
  } else {
    try {
      await messaging().requestPermission();
      return true;
    } catch (error) {
      return false;
    }
  }
}

const App = () => {
  const listenNotifications = async () => {
    await setupNotificationPermissions();

    //Foreground local Notification Handler
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
      }
    });

    //Background local Notification Handler
    notifee.onBackgroundEvent(async ({ type, detail, headless }) => {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
      if (type === EventType.DISMISSED) {
        //
      }
    });

    //Event handling on click Notification from Quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log("***");
        if (remoteMessage) {
          console.log(
            'Notification from Quit state',
            remoteMessage.notification,
          );
        }
      });

    //Event handling on click Notification from Open(Foreground/Background) state
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification from Open state',
        remoteMessage.notification,
      );
    });

    // Foreground-only remote notification handler. Background, Quit에선 호출 안됨
    messaging().onMessage(
      async (remoteMessage) => {
        await messagingNotification(remoteMessage);
        await bigPictureNotification(remoteMessage);
        console.log('Foreground Notification: ', remoteMessage);
      },
    );

    // Background or Quit remote notification handler
    messaging().setBackgroundMessageHandler(async (data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    listenNotifications();
  });

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="프로필" component={UserProfileView} options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person"
              size={20}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }} />
        <Tab.Screen name="알림" component={NotificationTestView} options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="notifications"
              size={20}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }} />
        <Tab.Screen name="알림내역" component={NotificationHistory} options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="ios-document-text-outline"
              size={20}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );

};

export default App;
