import notifee, { EventType, AndroidStyle } from '@notifee/react-native';

const messagingNotification = async (remoteMessage) => {
    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    console.log("******")
    console.log(remoteMessage.notification);

    await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
            channelId,
            color: 'red',
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            style: {
                type: AndroidStyle.MESSAGING,
                person: {
                    name: remoteMessage.data.senderName,
                    icon: 'https://item.kakaocdn.net/do/e8b4f78f7a48fdba045ecbebefb7d18dd0bbab1214a29e381afae56101ded106',
                },
                messages: [
                    {
                        text: remoteMessage.notification.body,
                        timestamp: Date.now() - 600000, // 10 minutes ago
                    }
                ],
            },
            actions: [
                {
                    title: '확인',
                    icon: 'https://my-cdn.com/icons/snooze.png',
                    pressAction: {
                        id: 'accept',
                    },
                    input: {
                        allowFreeFormInput: false, // set to false
                        choices: ['Yes', 'No', 'Maybe'],
                        placeholder: 'Reply to Sarah...',
                    },
                },
                {
                    title: '취소',
                    icon: 'https://my-cdn.com/icons/snooze.png',
                    pressAction: {
                        id: 'cancel',
                    },
                    input: {
                        allowFreeFormInput: false, // set to false
                        choices: ['Yes', 'No', 'Maybe'],
                        placeholder: 'Reply to Sarah...',
                    },
                }
            ],
        },

    });
}

export default messagingNotification;