import React, { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import axios from 'axios';

const Viewer = styled.View`
  width: 100%;
  height: 100%;
  padding-horizontal: 5%;

  flex: 1;
  background-color: #333745;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TextTitle = styled.Text`
  margin: 10px 0 10px 0;
  font-size: 20px
  font-weight: bold
  color: white
`;

const TextContent = styled.Text`
  margin: 0 0 0 0;
  font-size: 15px
  font-weight: normal
  color: white
`;

const Button = styled.TouchableOpacity`
  margin: 10px 0 10px 0;
  font-size: 15px
  font-weight: normal
  background-color: #2196F3
  width: 100%
  height: 40px
  borderRadius: 20px
  paddingHorizontal: 5%
  justify-content: center
  align-items: center
`;

const ButtonText = styled.Text`
  margin: 0 0 0 0;
  font-size: 15px
  font-weight: normal
  color: white
  text-align: center
`;
const pushNotificationServer = 'SERVER_URL';

const TokenRegistrationView = () => {
  const [pushToken, setPushToken] = useState('');

  const registerToken = async () => {
    const enabled = await messaging().hasPermission();
    let userId, userName;
    await AsyncStorage.getItem('userId').then(data => { userId = data; });
    await AsyncStorage.getItem('userName').then(data => { userName = data });
    console.log('id: ' + userId);
    console.log('name: ' + userName);
    await axios.post(`${pushNotificationServer}/users/${userId}/update`, {
      name: userName,
      fcmToken: pushToken
    }).then(res => res.data)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
    // if (enabled) {
    //   setFCMToken();
    // } else {
    //   requestPermission();
    // }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      await setFCMToken();
    } catch (error) {
      alert("you can't handle push notification");
    }
  };

  const setFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    AsyncStorage.setItem('fcm_token', fcmToken);
    setPushToken(fcmToken);
  }

  setFCMToken();
  return (
    <Viewer>
      <TextTitle>
        Push Notification Server:{' '}
        <TextContent>Notification Server URL</TextContent>
      </TextTitle>
      <TextTitle>
        Push Notification Token: <TextContent>{pushToken}</TextContent>
      </TextTitle>
      <TextTitle>
        userId: <TextContent>userId</TextContent>
      </TextTitle>
    </Viewer >
  );
};

export default TokenRegistrationView;
