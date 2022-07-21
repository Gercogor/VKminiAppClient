import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Chat from './panels/Chat';
import {io} from "socket.io-client";

//connect to server

const socket = io('http://localhost:3000', {
    secure: true,
    withCredentials: true,
    reconnectionDelayMax: 10000,
    extraHeaders: {
        "my-custom-header": "abcd"
    },
    transportOptions: {
        polling: {
            extraHeaders: {
                "my-custom-header": "abcd"
            },
        }
    }
})

const App = () => {

    const [scheme, setScheme] = useState('bright_light')
    const [activePanel, setActivePanel] = useState('chat');
    // real state
    // const [fetchedUser, setUser] = useState(null);
    // mock state
    const [fetchedUser, setUser] = useState({
        photo_200: 'https://cn.i.cdn.ti-platform.com/content/4/showpage/adventure-time/za/adventuretime-200x200.png',
        city: {
            title: 'The Land of Ooo'
        },
        first_name: 'Fin',
        last_name: 'Mertens'
    });
        const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [online, setOnline] = useState(0);
    const [messenger, setMessenger] = useState(null);

    socket.on('connect', () => {
        console.log(`you connect with id: ${socket.id}`)
    })

    socket.on('online', function (users) {
        setOnline(users);
    });

    socket.on('receive-messenger', function (msg) {
        setMessenger(msg);
    });

    const sendMessage = (message) => {
        console.log(message);
        socket.emit('send-message', socket.id, message);
    }

    useEffect(() => {

        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme)
            }
        });
		// get user
        // async function fetchData() {
        // 	const user = await bridge.send('VKWebAppGetUserInfo');
        // 	setUser(user);
        // 	setPopout(null);
        // }
        // fetchData();
        setPopout(null);
    }, []);

    console.log(messenger)

    // const go = e => {
    //     setActivePanel(e.currentTarget.dataset.to);
    // };

    return (
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout popout={popout}>
                        <SplitCol>
                            <View activePanel={activePanel}>
                                <Chat messenger={messenger} online={online} id='chat' fetchedUser={fetchedUser} socketId={socket.id} sendMessage={sendMessage}/>
                            </View>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
