import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
    Panel,
    PanelHeader,
    Header,
    Button,
    Group,
    Cell,
    Div,
    Avatar,
    FormLayout,
    Input,
    IconButton, FormItem, CardGrid, Card, Textarea, Text, Spacing
} from '@vkontakte/vkui';
import {Icon16Clear} from "@vkontakte/icons";
import MessageItem from "./MessageItem";

const Chat = ({id, fetchedUser, online, socketId, sendMessage, messenger}) => {

    const [message, setMessage] = useState('')

    const onChange = (e) => {
        setMessage(e.target.value)
    }
    const clear = () => {
        setMessage('')
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('send', message)
        sendMessage(message)
        clear();
    }


    const checkServer = () => {
        console.log(online)
    }

    return (
        <Panel id={id}>
            <PanelHeader>Chat room (online: {online} people)</PanelHeader>
            {fetchedUser &&
                <Group header={<Header mode="secondary">This is you (data from VK Bridge)</Header>}>
                    <Cell
                        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                        description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                    >
                        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                    </Cell>
                </Group>}

            <Group header={<Header mode="secondary">Chat</Header>}>
                <Div id='chat-area'>
                    {
                        messenger && messenger.map(mes=>
                            <MessageItem
                                key={Math.random()}
                                fetchedUser={fetchedUser}
                                socketId={socketId}
                                mesId={mes.id}
                                message={mes.message}
                            />
                        )
                    }
                </Div>
                <Div>
                    <FormLayout onSubmit={onSubmit}>
                        <Input
                            type="text"
                            name="message"
                            value={message}
                            onChange={onChange}
                            after={message ?
                                <IconButton
                                    hoverMode="opacity"
                                    aria-label="Очистить поле"
                                    onClick={clear}
                                >
                                    <Icon16Clear/>
                                </IconButton>
                                : null
                            }
                        />
                        <FormItem>
                            <Button stretched size="l" type={`submit`}>
                                Send message
                            </Button>
                        </FormItem>
                    </FormLayout>
                </Div>
            </Group>
        </Panel>
    )

};

Chat.propTypes = {
    id: PropTypes.string.isRequired,
    // go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Chat;
