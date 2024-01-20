import { ScanOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Modal, Row } from 'antd';
import * as MessagePopup from '../components/MessagePopupComponent';
import FloatingLabelComponent from '../components/FloatingLabelComponent';
import InputFormComponent from '../components/InputFormComponent';
import { styled } from "styled-components";
import ImageNotFound from '../assets/images/404-image-not-found.png';
import * as ServerService from '../services/ServerService';


const AddNewPage = () => {
    const navigate = useNavigate();

    const [studentState, setStudentState] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        email: '',
    });

    const [studentStateError, setStudentStateError] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        email: '',
    });

    // scan
    const [scanURL, setScanURL] = useState(ImageNotFound);
    const scan = async (newuser) => {
        if (studentState?.id?.length === 0) {
            MessagePopup.error('Student ID cannot be empty');
        } else {
            // create user folder in server
            try {
                await ServerService.createScan(newuser);
            } catch (e) {
                MessagePopup.error('Student ID has already been scanned');
                return;
            }
            // parse student state object to query string
            const queryString = new URLSearchParams(studentState).toString()
            // streaming 
            // setScanURL(`${process.env.REACT_APP_API_URL}/video_feed/${newuser}`);
            setScanURL(`${process.env.REACT_APP_API_URL}/video_feed?${queryString}`);
        }
    }

    // handle on change input
    const handleOnChangeStudentState = (e) => {
        setStudentState({
            ...studentState,
            [e.target.name]: e.target.value
        });
    }

    // navigate
    const navigateHomePage = () => {
        navigate('/');
    }
    const navigateSignInPage = () => {
        navigate('/signin');
    }
    const navigateScannerPage = () => {
        navigate('/scanner');
    }

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Row>
                <Col span={6} style={{ marginTop: '40px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '15px' }}>STUDENT INFORMATION</div>
                    <AddNewForm
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Student ID"
                                value={studentState?.id}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="id"
                                    placeholder=""
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={studentState?.id}
                                    onChange={handleOnChangeStudentState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Full Name"
                                value={studentState?.fullname}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="fullname"
                                    placeholder=""
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={studentState?.fullname}
                                    onChange={handleOnChangeStudentState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Phone"
                                value={studentState?.phone}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="phone"
                                    placeholder=""
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={studentState?.phone}
                                    onChange={handleOnChangeStudentState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Address"
                                value={studentState?.address}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="address"
                                    placeholder=""
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={studentState?.address}
                                    onChange={handleOnChangeStudentState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Email"
                                value={studentState?.email}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="email"
                                    placeholder=""
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={studentState?.email}
                                    onChange={handleOnChangeStudentState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        {/* <Form.Item
                            wrapperCol={{ span: 24 }}
                        >
                            <Button
                                style={{ borderRadius: '15px', backgroundColor: '#a0a0e1' }}
                                type='primary'
                                htmlType='submit'
                                icon={<UserAddOutlined />}
                            >
                                SCAN
                            </Button>
                        </Form.Item> */}
                    </AddNewForm>
                </Col>

                <Col offset={1} span={17}>
                    <Button
                        style={{ borderRadius: '15px', backgroundColor: '#a0a0e1' }}
                        type='primary'
                        onClick={() => scan(studentState?.id)}
                        icon={<ScanOutlined />}
                        disabled={
                            studentState?.id?.length === 0
                            // || studentState?.fullname?.length === 0
                            // || studentState?.phone?.length === 0
                            // || studentState?.address?.length === 0
                            // || studentState?.email?.length === 0
                        }
                    >
                        SCAN
                    </Button>
                    <img src={scanURL} style={{ width: "856px", height: "485px", borderRadius: "20px", marginTop: '20px' }} />
                </Col>
            </Row>
        </Card>
    )
};

export default AddNewPage;

const AddNewForm = styled(Form)`
    .ant-card-body {
        padding: 0px;
    }

    &:where(.css-dev-only-do-not-override-17a39f8).ant-card .ant-card-body {
        padding: 0px;
        border-radius: 0 0 8px 8px;
    }

    .auth-input-add-new {
        height: 45px;
        border-radius: 25px;
        padding: 0px 18px;
        margin-top: 20px; 
    }
    
    .auth-input-add-new .ant-input {
        padding-top: 7px;
    }

    .auth-button-signin {
        height: 50px; 
        width: 100%; 
        border-radius: 25px; 
        margin-bottom: 20px; 
        margin-top: 20px;
    }
`

const ErrorMessage = styled.div`
    text-align: start;
    margin: 5px 0px 0px 20px;
    color: #ff000d;
`
