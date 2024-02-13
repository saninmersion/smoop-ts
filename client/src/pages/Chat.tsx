import {
    Alert,
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Flex,
    Image,
    Input,
    Layout,
    List,
    Row,
    Typography,
    Upload,
} from "antd";
import React, {FormEvent} from "react";
import {UploadOutlined} from "@ant-design/icons";

const {Header, Content, Footer, Sider} = Layout;

const messagesData = [
    {
        id: '0',
        author: 'Eleanor Pena',
        avatar: 'https://zos.alipayobjects.com/rms/u/1905197095/img/AntDesignLogo.svg',
        message: 'Is anyone home?❤❤❤',
        time: '4:58 PM, Today',
    },
    {
        id: '1',
        author: 'David Letterman',
        avatar: 'https://zos.alipayobjects.com/rms/u/1392340971/img/x1.png',
        message:
            'Eleanor, hello! Thanks for your message. We typically reply back within 2-3 hours during business hours. We\'ll be in touch as possible!',
        time: '5:14 PM, Today',
    },
    {
        id: '2',
        author: 'Eleanor Pena',
        avatar: 'https://zos.alipayobjects.com/rms/u/1905197095/img/AntDesignLogo.svg',
        message: 'I saw that Clerk has two subscription plans. Before I continue, I would like to know more about the plans',
        time: '5:15 PM, Today',
    },
    {
        id: '3',
        author: 'David Letterman',
        avatar: 'https://zos.alipayobjects.com/rms/u/1392340971/img/x1.png',
        message:
            'Eleanor, do you need help? We could schedule a free call! Take your time and choose a free date - https://calendly.com/hc/en-us/requests/new?\n_ga=2.130074319.1923236466.1668591153\n\nOr you can simply get in touch with my colleague @JasonBrant He\'s our Sales Manager. Jason can tell you more about subscription plans.',
        time: '5:23 PM, Today',
    },
];

function getInitials(fullName: string) {
    if (!fullName.trim()) {
        return "U";
    }

    const names = fullName.split(" ");
    let initials = "";

    if (names.length >= 1) {
        initials += names[0][0].toUpperCase(); // First name initial
    }

    if (names.length >= 2) {
        initials += names[names.length - 1][0].toUpperCase(); // Last name initial
    }

    return initials;
}

export default function Chat() {
    const [messages, setMessages] = React.useState(messagesData);

    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //
    //     const message = (e!.target as HTMLFormElement)!.elements!.namedItem('message')!.value;
    //
    //     if (!message) {
    //         message.error('Please enter a message');
    //         return;
    //     }
    //
    //     setMessages([...messages, {
    //         id: String(messages.length),
    //         author: 'Eleanor Pena',
    //         avatar: 'https://zos.alipayobjects.com/rms/u/1905197095/img/AntDesignLogo.svg',
    //         message,
    //         time: 'Just now',
    //     }]);
    //
    //     (e!.target as HTMLFormElement).elements.message.value = '';
    // };

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="demo-logo-vertical"/>
            </Sider>
            <Layout>
                <Content style={{margin: 0, padding: 0}}>
                    <Card title="Chat box (Room id)"
                          style={{height: '100vh', borderRadius: 0}}>
                        <Flex vertical align="space-between" justify="flex-end" style={{height: '80vh'}}>
                            <List
                                itemLayout="horizontal"
                                dataSource={messages}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Flex gap="small">
                                            <Avatar style={{verticalAlign: 'middle', minWidth: '40px'}} size="large">
                                                {getInitials(item.author)}
                                            </Avatar>
                                            <Alert message={item.message} type="success"/>
                                        </Flex>
                                    </List.Item>
                                )}
                            >
                            </List>
                            <form>
                                <Divider/>
                                <Flex>
                                    <Input.TextArea
                                        rows={4}
                                        name="message"
                                        placeholder="Enter your message"
                                    />
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Upload name="file">
                                            <Button icon={<UploadOutlined/>}></Button>
                                        </Upload>
                                        <Button type="primary" htmlType="submit" style={{marginLeft: 8}}>
                                            Send
                                        </Button>
                                    </div>
                                </Flex>
                            </form>
                        </Flex>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    )
}