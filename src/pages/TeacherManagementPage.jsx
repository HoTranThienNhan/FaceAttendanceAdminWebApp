import { Breadcrumb, Button, Card, Col, Form, Input, Popconfirm, Radio, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FloatingLabelComponent from '../components/FloatingLabelComponent';
import InputFormComponent from '../components/InputFormComponent';
import { ContactsOutlined, HomeOutlined, IdcardOutlined, LockOutlined, MailOutlined, PhoneOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import InputPasswordComponent from '../components/InputPasswordComponent';
import * as ServerService from '../services/ServerService';
import { useMutationHook } from '../hooks/useMutationHook';
import * as MessagePopup from '../components/MessagePopupComponent';
import TableComponent from '../components/TableComponent';
import { useQuery } from '@tanstack/react-query';
import { containsNumber, isValidEmail, isValidPhoneNumber } from '../utils';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

const TeacherManagementPage = () => {
    const [teacherState, setTeacherState] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        email: '',
        gender: 'male',
        username: '',
        password: '',
        role: '',
    });

    // handle on change input
    const handleOnChangeTeacherState = (e) => {
        setTeacherState({
            ...teacherState,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'id') {
            setErrorMessage('');
        }
    }
    const handleOnChangeTeacherPassword = (e) => {
        setTeacherState({
            ...teacherState,
            password: e
        });
    }

    // add teacher
    const [errorMessage, setErrorMessage] = useState('');
    const handleAddTeacher = (teacherState) => {
        if (containsNumber(teacherState?.fullname) === true) {
            MessagePopup.error('Invalid teacher full name');
            setErrorMessage('Teacher full name cannot contain number.');
        } else if (isValidPhoneNumber(teacherState?.phone) === false) {
            MessagePopup.error('Invalid teacher phone');
            setErrorMessage('Teacher phone can contain only 10-11 digits.');
        } else if (isValidEmail(teacherState?.email) === false) {
            MessagePopup.error('Invalid teacher email');
            setErrorMessage('Teacher email format is invalid.');
        } else if (teacherState?.username?.length < 5) {
            MessagePopup.error('Invalid teacher username');
            setErrorMessage('Teacher username contains at least 5 characters.');
        } else if (teacherState?.password?.length < 8) {
            MessagePopup.error('Invalid teacher password');
            setErrorMessage('Teacher password contains at least 8 characters.');
        } else {
            mutation.mutate(teacherState);
        }
    }
    const mutation = useMutationHook(
        (teacherState) => {
            const res = ServerService.addTeacher(teacherState)
                .then(res => {
                    MessagePopup.success("Add new teacher successfully");
                    // refetch teachers table
                    queryAllTeachers.refetch();
                    // refresh teacher information form
                    setTeacherState({
                        id: '',
                        fullname: '',
                        phone: '',
                        address: '',
                        email: '',
                        gender: 'male',
                        username: '',
                        password: '',
                        role: '',
                    });
                })
                .catch(err => {
                    setErrorMessage(err.message);
                    MessagePopup.error('Cannot add new teacher');
                    return;
                });
            return res;
        }
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    // search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearchTable = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleResetSearch = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchTable(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchTable(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleResetSearch(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => { close(); }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // teachers table
    const teacherColumns = [
        {
            title: 'Teacher ID',
            dataIndex: 'id',
            className: 'teacher-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            ...getColumnSearchProps('id')
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            className: 'teacher-fullname',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            ...getColumnSearchProps('fullname')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            className: 'teacher-phone',
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            className: 'teacher-address',
            sorter: (a, b) => a.address.localeCompare(b.address),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: 'teacher-email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            ...getColumnSearchProps('email')
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            className: 'teacher-gender',
            render: (text, record) => {
                if (text === 'male') {
                    return <span>Male</span>;
                } else if (text === 'female') {
                    return <span>Female</span>;
                }
            },
            filters: [
                {
                    text: 'Male',
                    value: 'male',
                },
                {
                    text: 'Female',
                    value: 'female',
                },
            ],
            onFilter: (value, record) => record.gender === value,
            filterMultiple: false
        },
        {
            title: 'Username',
            dataIndex: 'username',
            className: 'teacher-username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            ...getColumnSearchProps('username')
        },
        {
            title: 'Role',
            dataIndex: 'rolename',
            className: 'teacher-rolename',
            filters: [
                {
                    text: 'Teacher',
                    value: 'Teacher',
                },
                {
                    text: 'Admin',
                    value: 'Admin',
                },
            ],
            onFilter: (value, record) => record.rolename === value,
            filterMultiple: false
        },
    ];
    const getAllTeachers = async () => {
        const res = await ServerService.getAllUsers();
        return res;
    }
    const queryAllTeachers = useQuery({
        queryKey: ['teachers'],
        queryFn: getAllTeachers
    });
    const { isLoading: isLoadingAllTeachers, data: allTeachers } = queryAllTeachers;

    // update teacher
    const handleUpdateTeacher = async (teacherState) => {
        await ServerService.updateTeacher(teacherState)
            .then(res => {
                MessagePopup.success('Update teacher successfully');
                // refetch teachers table
                queryAllTeachers.refetch();
                // refresh teacher information form
                setTeacherState({
                    id: '',
                    fullname: '',
                    phone: '',
                    address: '',
                    email: '',
                    gender: 'male',
                    username: '',
                    password: '',
                    role: '',
                });
                setErrorMessage('');
            })
            .catch(err => {
                setErrorMessage(err.message);
                MessagePopup.error('Cannot update teacher');
                return;
            });
    }

    // teacher button state
    const [teacherButtonState, setTeacherButtonState] = useState('create');
    useEffect(() => {
        // change teacher button to create when clear form
        if (teacherState?.id?.length === 0
            && teacherState?.fullname?.length === 0
            && teacherState?.phone?.length === 0
            && teacherState?.address?.length === 0
            && teacherState?.email?.length === 0
            && teacherState?.username?.length === 0
            && teacherState?.password?.length === 0
            && teacherState?.role?.length === 0
        ) {
            setTeacherButtonState('create');
        }
    }, [teacherState]);

    // clear form
    const clearForm = () => {
        setTeacherState({
            id: '',
            fullname: '',
            phone: '',
            address: '',
            email: '',
            gender: 'male',
            username: '',
            password: '',
            role: '',
        });
        setErrorMessage('');
    }

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
                        title: 'Teacher Management',
                    },
                ]}
            />
            <Row justify="space-between">
                <Col span={24}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '15px' }}>TEACHER INFORMATION</div>
                </Col>
            </Row>
            <AddNewForm
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Row justify="start">
                    <Col span={10}>
                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Teacher ID"
                                value={teacherState?.id}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="id"
                                    placeholder=""
                                    prefix={<IdcardOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={teacherState?.id}
                                    onChange={handleOnChangeTeacherState}
                                    disabled={teacherButtonState === 'update' ? true : false}
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
                                value={teacherState?.fullname}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="fullname"
                                    placeholder=""
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={teacherState?.fullname}
                                    onChange={handleOnChangeTeacherState}
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
                                value={teacherState?.phone}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="phone"
                                    placeholder=""
                                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={teacherState?.phone}
                                    onChange={handleOnChangeTeacherState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '20px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Address"
                                value={teacherState?.address}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="address"
                                    placeholder=""
                                    prefix={<HomeOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={teacherState?.address}
                                    onChange={handleOnChangeTeacherState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        {/* <Form.Item> */}
                        <Row justify="start">
                            <Col>
                                &emsp; <span style={{ fontWeight: '600' }}>Gender:</span> &ensp;
                                <CustomRadio
                                    onChange={handleOnChangeTeacherState}
                                    value={teacherState?.gender}
                                    name="gender"
                                >
                                    <Button style={{ borderRadius: '25px', marginRight: '20px' }}>
                                        <Radio value="male">Male</Radio>
                                    </Button>
                                    <Button style={{ borderRadius: '25px' }}>
                                        <Radio value="female">Female</Radio>
                                    </Button>
                                </CustomRadio>
                            </Col>
                        </Row>
                        {/* </Form.Item> */}
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='auth-form-item-add-new'
                        >
                            <FloatingLabelComponent
                                label="Email"
                                value={teacherState?.email}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="email"
                                    placeholder=""
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={teacherState?.email}
                                    onChange={handleOnChangeTeacherState}
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
                                label="Username"
                                value={teacherState?.username}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="username"
                                    placeholder=""
                                    prefix={<ContactsOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={teacherState?.username}
                                    onChange={handleOnChangeTeacherState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        {teacherButtonState === 'create' &&
                            <Form.Item
                                label=""
                                validateStatus={"validating"}
                                help=""
                                style={{ marginBottom: '0px' }}
                                className='auth-form-item-add-new'
                            >
                                <FloatingLabelComponent
                                    label="Password"
                                    value={teacherState?.password}
                                    styleBefore={{ left: '37px', top: '31px' }}
                                    styleAfter={{ left: '37px', top: '23px' }}
                                >
                                    <InputPasswordComponent
                                        placeholder=""
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        className='auth-input-add-new'
                                        value={teacherState?.password}
                                        onChange={handleOnChangeTeacherPassword}
                                    />
                                </FloatingLabelComponent>
                            </Form.Item>
                        }

                        {errorMessage?.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}

                        <Form.Item>
                            <Row justify="space-between" style={{ marginTop: '20px' }}>
                                <Col span={11}>
                                    {teacherButtonState === 'create'
                                        || (teacherState?.id?.length === 0
                                            && teacherState?.fullname?.length === 0
                                            && teacherState?.phone?.length === 0
                                            && teacherState?.address?.length === 0
                                            && teacherState?.email?.length === 0
                                            && teacherState?.username?.length === 0
                                            && teacherState?.password?.length === 0)
                                        ?
                                        <Popconfirm
                                            title="Create teacher"
                                            description="Are you sure to create this teacher?"
                                            onConfirm={() => handleAddTeacher(teacherState)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                                type='primary'
                                                disabled={
                                                    teacherState?.id?.length === 0
                                                    || teacherState?.fullname?.length === 0
                                                    || teacherState?.phone?.length === 0
                                                    || teacherState?.address?.length === 0
                                                    || teacherState?.email?.length === 0
                                                    || teacherState?.username?.length === 0
                                                    || teacherState?.password?.length === 0
                                                }
                                            >
                                                CREATE
                                            </Button>
                                        </Popconfirm>
                                        :
                                        <Popconfirm
                                            title="Update teacher"
                                            description="Are you sure to update this teacher?"
                                            onConfirm={() => handleUpdateTeacher(teacherState)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                                type='primary'
                                                disabled={
                                                    teacherState?.id?.length === 0
                                                    || teacherState?.fullname?.length === 0
                                                    || teacherState?.phone?.length === 0
                                                    || teacherState?.address?.length === 0
                                                    || teacherState?.email?.length === 0
                                                    || teacherState?.username?.length === 0
                                                    || teacherState?.password?.length === 0
                                                }
                                            >
                                                UPDATE
                                            </Button>
                                        </Popconfirm>
                                    }
                                </Col>
                                <Col span={11}>
                                    <ButtonClear
                                        type='default'
                                        onClick={() => clearForm()}
                                    >
                                        CLEAR
                                    </ButtonClear>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
            </AddNewForm>
            <Row>
                <Col span={24} style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '30px' }}>ALL TEACHERS</div>
                    <TableComponent
                        columns={teacherColumns}
                        data={allTeachers}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    // // set the selected teacher information to the form
                                    setTeacherState({
                                        id: record?.id,
                                        fullname: record?.fullname,
                                        phone: record?.phone,
                                        address: record?.address,
                                        email: record?.email,
                                        username: record?.username,
                                        gender: record?.gender,
                                        role: record?.rolename,
                                    });
                                    // // change button 'create' teacher to button 'update'
                                    setTeacherButtonState('update');
                                    setErrorMessage('');
                                }
                            }
                        }}
                    />
                </Col>
            </Row>
        </Card>
    )
};

export default TeacherManagementPage;

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

const ButtonClear = styled(Button)`
    border-radius: 25px;
    border: 2px solid #a0a0e1;
    width: 100%;
    height: 45px;
    color: #4d4d7f;
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