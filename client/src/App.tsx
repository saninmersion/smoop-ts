import React, {useEffect, useState} from 'react';
import './App.css';
import {Input, Layout, Button, Row, Col, Typography, Image} from "antd";
import {io} from "socket.io-client";

const socket = io('ws://localhost:8080')

function App() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])

    // Handle room creation
    const createRoom = () => {
        socket.emit('create_room');
    }

    useEffect(() => {
        socket.on('chat message', (msg: string) => {
            setMessages([...messages, msg]);
        });
    }, [messages]);

    const sendMessage = () => {
        socket.emit('chat message', message);
        setMessage('');
    };
    return (
        <Layout className="app-layout" style={{padding: '10px 40px'}}>
            <Row justify="center" align="middle" style={{height: '100vh'}}>
                <Col xs={24} md={12}>
                    <Image src="meet_logo.png" alt="Logo" preview={{visible: false}}/>
                    <Typography.Title level={1}>Join a chat</Typography.Title>
                    <Typography.Paragraph>
                        Start or join a chat with friends, family, or colleagues.
                    </Typography.Paragraph>

                    <Row gutter={16}>
                        <Col span={6}>
                            <Button type="primary" onClick={createRoom}>
                                Create new chat
                            </Button>
                        </Col>
                        <Col span={10}>
                            <Input placeholder="Enter chat link"/>
                        </Col>
                        <Col span={8}>
                            <Button type="link">
                                Join Existing Chat
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Image src="hero.jpeg" alt="Hero" preview={{visible: false}}/>
                </Col>
            </Row>
        </Layout>
    );
}

export default App;
