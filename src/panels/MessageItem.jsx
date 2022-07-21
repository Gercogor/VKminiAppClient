import React from 'react';
import {Avatar, Card, CardGrid, Cell, Text} from "@vkontakte/vkui";

const MessageItem = ({fetchedUser, socketId, message, mesId}) => {
    return (
        <CardGrid size="l">
            <Card style={socketId===mesId?{backgroundColor: 'rgba(0, 255, 0, 0.5)'}:undefined}>
                <Cell before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}>
                    {`${fetchedUser.first_name} ${fetchedUser.last_name} ${mesId}`}
                </Cell>
                <div style={{padding: `10px 45px`}}>
                    <Text>{message}</Text>
                </div>
            </Card>
        </CardGrid>
    );
};

export default MessageItem;