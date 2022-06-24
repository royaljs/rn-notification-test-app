import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const Viewer = styled.View`
  width: 100%;
  height: 100%;
  padding-horizontal: 5%;

  flex: 1;
  background-color: #f2ede6;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TextTitle = styled.Text`
  margin: 10px 0 10px 0;
  font-size: 20px
  font-weight: bold
`;

const TextContent = styled.Text`
  margin: 0 0 0 0;
  font-size: 15px
  font-weight: normal
`;

const TextInput = styled.TextInput`
  margin: 10px 0 10px 0;
  font-size: 15px
  font-weight: normal
  background-color: white
  width: 100%
  height: 40px
  borderRadius: 20px
  paddingHorizontal: 5%
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

const setFCMToken = async () => {
  const fcmToken = await messaging().getToken();
}

const registerUser = async (userId, username, fcmToken) => {
  const enabled = await messaging().hasPermission();
  await axios.post(`${pushNotificationServer}/users`, {
    id: userId,
    name: username,
    fcmToken: fcmToken
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

const UserProfile = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  messaging().getToken()
    .then(data => { AsyncStorage.setItem('fcmToken', data); setFcmToken(data); });

  useEffect(() => {
    // const userId = AsyncStorage.getItem('userId').then(data => data);
    // const userName = AsyncStorage.getItem('userName').then(data => data);
    // const fcmToken = AsyncStorage.getItem('fcmToken').then(data => data);
  });

  return (
    <Viewer>
      <TextTitle>
        아이디
      </TextTitle>
      <TextInput
        placeholder="사용자 아이디를 입력하세요"
        onChangeText={text => {
          AsyncStorage.setItem('userId', text);
          setUserId(text);
        }}
      />
      <TextTitle>이름</TextTitle>
      <TextInput
        placeholder="사용자 이름을 입력하세요"
        onChangeText={text => {
          AsyncStorage.setItem('userName', text);
          setUserName(text);
        }}
      />
      <TextTitle>
        FCM Token: <TextContent>{fcmToken}</TextContent>
      </TextTitle>
      <Button
        onPress={async () => await registerUser(userId, userName, fcmToken)}>
        <ButtonText>사용자 등록</ButtonText>
      </Button>
      <TextTitle>
        참고:{' '}
        <TextContent>
          Push Notification Token(FCM Token)은 계정이 아니라 사용자 기기에
          설치된 앱 인스턴스에 고유하게 부여되는 값입니다. 따라서 로그인과 앱의
          재시작을 반복하더라도, Push Notification Token의 값은 유지됩니다. 앱을
          지우고 재설치했을때에만 Push Notification Token이 새로 발급됩니다.
        </TextContent>
      </TextTitle>
    </Viewer>
  );
};

export default UserProfile;
