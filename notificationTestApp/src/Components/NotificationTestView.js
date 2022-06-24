import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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
  border-radius: 20px
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

const sendNotificationMessage = async (title, body) => {

  console.log(title)
  const userId = await AsyncStorage.getItem('userId').then(data => { return data; })
  console.log(userId);
  await axios.post(`${pushNotificationServer}/notifications`, {
    senderId: userId,
    userId: userId,
    notification: {
      title: title,
      body: body
    }
  })
  .then(res => res.data)
    .then(data => {
      console.log(data);
    });
};

const NotificationTestView = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <Viewer>
      <TextTitle>Push Notification 테스트</TextTitle>
      <TextTitle>메시지 제목</TextTitle>
      <TextInput placeholder="제목을 입력하세요" onChangeText={text => setTitle(text)}/>
      <TextTitle>메시지 내용</TextTitle>
      <TextInput placeholder="내용을 입력하세요" onChangeText={text => setBody(text)}/>
      <Button onPress={() => sendNotificationMessage(title, body)}>
        <ButtonText>Send Push Notification Message</ButtonText>
      </Button>
    </Viewer>
  );
};

export default NotificationTestView;
