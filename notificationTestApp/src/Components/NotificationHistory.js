import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ScrollView = styled.ScrollView.attrs(props => ({
    bounces: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        //flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
}))`
  flex: 1;
  padding-horizontal: 10px;
`;

const FlatList = styled.FlatList`
flex: 1;
padding-horizontal: 10px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Viewer = styled.View`
  width: 100%;
  height: 100%;
  margin: 5px 0 0 0;
  padding-horizontal: 10px;
  flex: 1;
  background-color: #f2ede6;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 10px;
  border-color: #deb887;
  border-width: 1px;

`;

const HeadViewer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  flex: 1;
  background-color: #f2ede6;
  flex-direction: row
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

const Category = styled.Text`
  margin: 10px 0 10px 0;
  font-size: 20px
  font-weight: bold
`;

const TimeContent = styled.Text`
  margin: 0 0 0 0;
  font-size: 10px
  font-weight: normal
`;

const NotificationTitle = styled.Text`
  margin: 10px 0 10px 0;
  font-size: 20px
  font-weight: bold
`;

const NotificationBody = styled.Text`
  margin: 0 0 0 0;
  font-size: 15px
  font-weight: normal
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

const fetchNotificationHistory = async (title, body) => {

    const userId = await AsyncStorage.getItem('userId').then(data => { return data; })
    return await axios.get(`${pushNotificationServer}/notifications/${userId}`);
};

const NotificationHistoryCard = ({ data }) => {
    console.log(data)
    return (
        <Viewer>
            <HeadViewer>
                <Category>
                    {data.category}
                </Category>
                <TimeContent>{data.createdAt}</TimeContent>
            </HeadViewer>
            <NotificationTitle>
                {data.title}
            </NotificationTitle>
            <NotificationBody>
                {data.body}</NotificationBody>
        </Viewer>);
}

const NotificationHistory = () => {
    const [notificationHistories, setNotificationHistories] = useState([]);
    // const [category, setCategory] = useState('');
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');
    // const [createdAt, setCreatedAt] = useState('');
    useEffect(() => {
        fetchNotificationHistory().then(res => res.data).then(data => {
            console.log(data.length)
            console.log(data[0].category)
            setNotificationHistories(data)
            // data.forEach(item => {
            //     const new_item = {
            //         category: item.category,
            //         createdAt: item.createdAt,
            //         title: item.title,
            //         body: item.body
            //     }
            //     setNotificationHistories(new_item => [...notificationHistories, new_item])
            // });
            // console.log(data[0])
            // setCategory(data[0].category);
            // setTitle(data[0].title);
            // setBody(data[0].body);
            // setCreatedAt(data[0].createdAt);
        })
    }, []);

    return (
        <FlatList data={notificationHistories}
           renderItem={({item}) => <NotificationHistoryCard data={item}/>}
            keyExtractor={(item, index) => item.createdAt}
        >
            {/* <NotificationHistoryCard category={category} title={title} body={body} createdAt={createdAt} />     */}
        </FlatList>
    );
}


export default NotificationHistory;