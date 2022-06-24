import notifee, { EventType, AndroidStyle } from '@notifee/react-native';

const bigPictureNotification = async (remoteMessage) => {

    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
            channelId,
            style: { type: AndroidStyle.BIGPICTURE, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKjRfo1oAxWW8gxEB5M49z0UDuJ8T_QgGvDA&usqp=CAU' },
        },
    });
}

export default bigPictureNotification;