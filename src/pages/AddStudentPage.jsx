import { ClearOutlined, HomeOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, QuestionCircleOutlined, ReloadOutlined, ScanOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Card, Col, Form, Image, Popconfirm, Radio, Row, Tour } from 'antd';
import * as MessagePopup from '../components/MessagePopupComponent';
import FloatingLabelComponent from '../components/FloatingLabelComponent';
import InputFormComponent from '../components/InputFormComponent';
import { styled } from "styled-components";
import FaceAttendanceCameraBackground from '../assets/images/face-attendance-camera-background.png';
import * as ServerService from '../services/ServerService';
import { useMutationHook } from '../hooks/useMutationHook';
import { useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import { containsNumber, isValidEmail, isValidPhoneNumber } from '../utils';


const AddStudentPage = () => {
    const user = useSelector((state) => state.user);

    const [studentState, setStudentState] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        email: '',
        gender: 'male',
    });

    const [studentStateError, setStudentStateError] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        email: '',
        gender: 'male',
    });

    // scan
    const [scanURL, setScanURL] = useState(FaceAttendanceCameraBackground);
    const [errorMessage, setErrorMessage] = useState('');
    const [isScanned, setIsScanned] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const scan = async (newuser) => {
        if (containsNumber(studentState?.fullname) === true) {
            MessagePopup.error('Invalid student full name');
            setErrorMessage('Student full name cannot contain number.');
        } else if (isValidPhoneNumber(studentState?.phone) === false) {
            MessagePopup.error('Invalid student phone');
            setErrorMessage('Student phone can contain only 10-11 digits.');
        } else if (isValidEmail(studentState?.email) === false) {
            MessagePopup.error('Invalid student email');
            setErrorMessage('Student email format is invalid.');
        } else {
            // create user folder in server
            await ServerService.createScan(newuser)
                .then(res => {
                    MessagePopup.warning('Please wait a few seconds for preparing camera');
                    // parse student state object to query string
                    const queryString = new URLSearchParams(studentState).toString();
                    // streaming 
                    setScanURL(`${process.env.REACT_APP_API_URL}/video_feed?${queryString}`);
                    setIsScanned(true);
                })
                .catch(err => {
                    setErrorMessage(err.message);
                    MessagePopup.error('Student ID has already been scanned');
                    return;
                });
        }
    }

    // add
    const mutation = useMutationHook(
        (studentId) => {
            setIsAdded(true);
            const res = ServerService.addNew(studentId);
            return res;
        }
    );
    const { data, isLoading, isSuccess, isError } = mutation;
    const handleAddStudent = async (studentId) => {
        mutation.mutate(studentId);
    }
    useEffect(() => {
        if (isSuccess) {
            MessagePopup.success("Add new student successfully");
        } else if (isError) {
            MessagePopup.error('Cannot add new student');
        }
    }, [isSuccess, isError])

    // refresh
    const refreshScan = async (newuser) => {
        setScanURL(FaceAttendanceCameraBackground);
        try {
            await ServerService.refreshScan(newuser);
            MessagePopup.success('Refresh student successfully');
        } catch (e) {
            MessagePopup.error('Student ID has not been scanned yet');
            return;
        }
        resetImage();
        setIsScanned(false);
        setIsAdded(false);
    }
    const [reloadImage, setReloadImage] = useState(1);
    const resetImage = () => {
        setReloadImage(Math.random());
    }

    // clear
    const clear = () => {
        setStudentState({
            id: '',
            fullname: '',
            phone: '',
            address: '',
            email: '',
            gender: 'male',
        });
        setScanURL(FaceAttendanceCameraBackground);
        resetImage();
        setIsScanned(false);
        setIsAdded(false);
    }

    // handle on change input
    const handleOnChangeStudentState = (e) => {
        setStudentState({
            ...studentState,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'id') {
            setErrorMessage('');
        }
    }
    // useEffect(() => {
    //     // navigate back to home page if already signed in 
    //     if (user?.fullname) {
    //         handleNavigateHomePage();
    //     }
    // }, [user]);

    // Help Tour
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const [openHelpTour, setOpenHelpTour] = useState(false);
    const helpTourSteps = [
        {
            title: 'STUDENT INFORMATION',
            description: 'Filling in all the student information.',
            target: () => ref1.current,
        },
        {
            title: 'SCAN',
            description: 'After filling in the student information form, you can start scanning face with the camera.',
            target: () => ref2.current,
        },
        {
            title: 'ADD',
            description: 'By the time you finish your scanned face, you can store these face data to the system.',
            target: () => ref3.current,
        },
        {
            title: 'REFRESH SCAN',
            description: 'If there are any problems while scanning face, this helps you to re-scan face.',
            target: () => ref4.current,
        },
        {
            title: 'CLEAR',
            description: 'This button is to help you clear student form in order to add another student',
            target: () => ref5.current,
            nextButtonProps: {
                children: "Got it"
            }
        },
    ];

    // navigate
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Breadcrumb
                items={[
                    {

                        title: <span style={{ cursor: 'pointer' }} onClick={handleNavigateHomePage}>Home</span>,
                    },
                    {
                        title: 'Add Student',
                    },
                ]}
            />
            <Row>
                <Col span={6} style={{ marginTop: '40px' }} ref={ref1}>
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
                                    prefix={<IdcardOutlined className="site-form-item-icon" />}
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
                                    prefix={<PhoneOutlined className="site-form-item-icon" />}
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
                                    prefix={<HomeOutlined className="site-form-item-icon" />}
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
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={studentState?.email}
                                    onChange={handleOnChangeStudentState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Row justify="start" style={{ marginTop: '20px' }}>
                            <Col>
                                <span style={{ fontWeight: '600' }}>Gender:</span> &ensp;
                                <CustomRadio
                                    onChange={handleOnChangeStudentState}
                                    value={studentState?.gender}
                                    name="gender"
                                >
                                    <Button style={{ borderRadius: '25px', marginRight: '10px' }}>
                                        <Radio value="male">Male</Radio>
                                    </Button>
                                    <Button style={{ borderRadius: '25px' }}>
                                        <Radio value="female">Female</Radio>
                                    </Button>
                                </CustomRadio>
                            </Col>
                        </Row>
                    </AddNewForm>

                    {errorMessage?.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
                </Col>

                <Col offset={1} span={17}>
                    <Row>
                        <Col offset={5}>
                            <Button
                                style={{ borderRadius: '15px', backgroundColor: '#a0a0e1' }}
                                type='primary'
                                onClick={() => scan(studentState?.id)}
                                icon={<ScanOutlined />}
                                ref={ref2}
                                disabled={
                                    studentState?.id?.length === 0
                                    || studentState?.fullname?.length === 0
                                    || studentState?.phone?.length === 0
                                    || studentState?.address?.length === 0
                                    || studentState?.email?.length === 0
                                    || isScanned === true
                                }
                            >
                                SCAN
                            </Button>
                            <Button
                                style={{ borderRadius: '15px', backgroundColor: '#a0a0e1', marginLeft: '20px' }}
                                type='primary'
                                onClick={() => handleAddStudent(studentState?.id)}
                                icon={<UserAddOutlined />}
                                ref={ref3}
                                disabled={
                                    studentState?.id?.length === 0
                                    || studentState?.fullname?.length === 0
                                    || studentState?.phone?.length === 0
                                    || studentState?.address?.length === 0
                                    || studentState?.email?.length === 0
                                    || isScanned === false
                                    || isAdded === true
                                }
                            >
                                ADD
                            </Button>
                            <Popconfirm
                                title="Refresh scan"
                                description="Are you sure to refresh this student scan?"
                                onConfirm={() => refreshScan(studentState?.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    style={{ borderRadius: '15px', backgroundColor: '#a0a0e1', marginLeft: '20px' }}
                                    type='primary'
                                    icon={<ReloadOutlined />}
                                    ref={ref4}
                                    disabled={
                                        studentState?.id?.length === 0
                                        || studentState?.fullname?.length === 0
                                        || studentState?.phone?.length === 0
                                        || studentState?.address?.length === 0
                                        || studentState?.email?.length === 0
                                        || isScanned === false
                                    }
                                >
                                    REFRESH SCAN
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title="Clear"
                                description="Are you sure to clear this student information?"
                                onConfirm={() => clear()}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    style={{ borderRadius: '15px', backgroundColor: '#a0a0e1', marginLeft: '20px' }}
                                    type='primary'
                                    icon={<ClearOutlined />}
                                    ref={ref5}
                                    disabled={isAdded === false}
                                >
                                    CLEAR
                                </Button>
                            </Popconfirm>
                        </Col>
                        <Col offset={3}>
                            <Button
                                style={{ borderRadius: '15px', color: '#4d4d7f', border: '1px solid #9c93ed' }}
                                onClick={() => setOpenHelpTour(true)}
                            >
                                HELP <QuestionCircleOutlined />
                            </Button>
                            <Tour
                                open={openHelpTour}
                                onClose={() => setOpenHelpTour(false)} steps={helpTourSteps}
                            />
                        </Col>
                    </Row>

                    <LoadingComponent isLoading={isLoading}>
                        <Image
                            src={scanURL}
                            style={{ width: "856px", height: "485px", borderRadius: "20px", marginTop: '20px' }}
                            draggable="false"
                            preview={false}
                            key={reloadImage}
                        />
                    </LoadingComponent>
                </Col>
            </Row>
        </Card>
    )
};

export default AddStudentPage;

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
    margin: 15px 0px 0px 20px;
    color: #ff000d;
`

const CustomRadio = styled(Radio.Group)`
    .ant-radio-wrapper-checked {
        color: #1677c3;
    }
`
