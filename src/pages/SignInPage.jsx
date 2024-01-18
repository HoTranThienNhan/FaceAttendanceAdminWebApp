import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ServerService from '../services/ServerService';

const SignInPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (username, password) => {
        if (username.length > 0 && password.length > 0) {
            const res = await ServerService.signIn(username, password);
        }
    }

    const handleOnChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value)
    }

    // navigate
    const navigate = useNavigate();

    return (
        <div>
            <div>THIS IS MY SIGN IN PAGE</div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        value={username}
                        onChange={handleOnChangeUsername}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        value={password}
                        onChange={handleOnChangePassword}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit" onClick={() => handleSignIn(username, password)}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default SignInPage;

