import { Breadcrumb, Button, Card, Col, Drawer, Form, Image, Input, Popconfirm, Radio, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../components/TableComponent';
import * as ServerService from '../services/ServerService';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { FormOutlined, HomeOutlined, IdcardOutlined, LeftOutlined, MailOutlined, PhoneOutlined, ReloadOutlined, ScanOutlined, SearchOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import InputFormComponent from '../components/InputFormComponent';
import FloatingLabelComponent from '../components/FloatingLabelComponent';
import { useMutationHook } from '../hooks/useMutationHook';
import * as MessagePopup from '../components/MessagePopupComponent';
import LoadingComponent from '../components/LoadingComponent';
import ImageNotFound from '../assets/images/404-image-not-found.png';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

const StudentManagementPage = () => {

    // get all students
    const getAllStudents = async () => {
        const res = await ServerService.getAllStudents();
        return res;
    }
    const queryAllStudents = useQuery({
        queryKey: ['students'],
        queryFn: getAllStudents
    });
    const { isLoading: isLoadingAllStudents, data: allStudents } = queryAllStudents;

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

    // student table columns
    const studentColumns = [
        {
            title: 'Student ID',
            dataIndex: 'id',
            className: 'student-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            ...getColumnSearchProps('id')
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            className: 'student-full-name',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            ...getColumnSearchProps('fullname')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            className: 'student-phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            className: 'student-address',
            sorter: (a, b) => a.address.localeCompare(b.address),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: 'student-email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            className: 'student-gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
        },
        {
            title: 'Update',
            dataIndex: 'update',
            className: 'student-update',
            render: (_, record) => {
                return (
                    <FormOutlined onClick={() => handleUpdateStudent(record)} style={{ fontSize: '20px' }} />
                );
            }
        },
    ];
    const [studentImage, setStudentImage] = useState('');
    const handleUpdateStudent = async (record) => {
        showDrawer();
        const res = await ServerService.getStudentImage(record?.id);
        setStudentImage(res?.img);
        setStudentState({
            id: record?.id,
            fullname: record?.fullname,
            phone: record?.phone,
            address: record?.address,
            email: record?.email,
            gender: record?.gender
        });
    }

    // drawer
    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onCloseDrawer = () => {
        setOpenDrawer(false);
        setScanURL(ImageNotFound);
        setStudentImage('');
    };

    // update student form
    const [studentState, setStudentState] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        email: '',
        gender: 'male'
    });
    // handle on change input
    const handleOnChangeStudentState = (e) => {
        setStudentState({
            ...studentState,
            [e.target.name]: e.target.value
        });
    }

    // update student information
    const mutation = useMutationHook(
        (studentState) => {
            const id = studentState?.id;
            const fullname = studentState?.fullname;
            const phone = studentState?.phone;
            const address = studentState?.address;
            const email = studentState?.email;
            const gender = studentState?.gender;
            const res = ServerService.updateStudent(id, fullname, phone, address, email, gender);
            return res;
        }
    );
    const { data, isLoading, isSuccess, isError } = mutation;
    const updateStudent = async (studentState) => {
        mutation.mutate(studentState);
    }
    useEffect(() => {
        if (isSuccess) {
            MessagePopup.success("Update student successfully");
            queryAllStudents.refetch();
        } else if (isError) {
            MessagePopup.error('Cannot update student');
        }
    }, [isSuccess, isError])

    // update scanner
    const [scanURL, setScanURL] = useState(ImageNotFound);
    const rescan = async (studentId) => {
        try {
            await ServerService.rescan(studentId);
            MessagePopup.success('Re-scan successfully');
        } catch (e) {
            MessagePopup.error('Student ID cannot be re-scanned');
            return;
        }
        // parse student state object to query string
        const queryString = new URLSearchParams(studentState).toString();
        // streaming 
        setScanURL(`${process.env.REACT_APP_API_URL}/video_feed?${queryString}`);
    }

    // readd
    const mutationReadd = useMutationHook(
        (studentId) => {
            const res = ServerService.readd(studentId);
            return res;
        }
    );
    const { data: dataReadd, isLoading: isLoadingReadd, isSuccess: isSuccessReadd, isError: isErrorReadd } = mutationReadd;
    const handleReaddStudent = async (studentId) => {
        mutationReadd.mutate(studentId);
    }
    useEffect(() => {
        if (isSuccessReadd) {
            MessagePopup.success("Re-add student successfully");
        } else if (isErrorReadd) {
            MessagePopup.error('Cannot re-add student');
        }
    }, [isSuccessReadd, isErrorReadd])

    // navigate
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 20px' }}>
            <Breadcrumb
                items={[
                    {

                        title: <span style={{ cursor: 'pointer' }} onClick={handleNavigateHomePage}>Home</span>,
                    },
                    {
                        title: 'Student Management',
                    },
                ]}
            />
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '15px' }}>STUDENTS MANAGEMENT</div>
            <Row style={{ border: '2px solid #cebdf561' }}>
                <WrapperStudentManagement span={24}>
                    <TableComponent
                        columns={studentColumns}
                        data={allStudents}
                    />
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onCloseDrawer}
                        open={openDrawer}
                        getContainer={false}
                    >
                        <Row justify="start" style={{ marginBottom: '10px' }}>
                            <Col span={2}>
                                <Button type="link" style={{ fontSize: '16px' }} onClick={onCloseDrawer}>
                                    <LeftOutlined />Back
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '15px' }}>
                                    STUDENT INFORMATION
                                </div>
                                <Image
                                    src={studentImage}
                                    style={{ width: "100px", height: "100px", borderRadius: "10px", marginTop: '5px' }}
                                    draggable="false"
                                    preview={false}
                                />
                                <UpdateStudentForm
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
                                        className='auth-form-item-update'
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
                                                className='auth-input-update'
                                                value={studentState?.id}
                                                onChange={handleOnChangeStudentState}
                                                disabled={true}
                                            />
                                        </FloatingLabelComponent>
                                    </Form.Item>

                                    <Form.Item
                                        label=""
                                        validateStatus={"validating"}
                                        help=""
                                        style={{ marginBottom: '0px' }}
                                        className='auth-form-item-update'
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
                                                className='auth-input-update'
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
                                        className='auth-form-item-update'
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
                                                className='auth-input-update'
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
                                        className='auth-form-item-update'
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
                                                className='auth-input-update'
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
                                        className='auth-form-item-update'
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
                                                className='auth-input-update'
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

                                    <Popconfirm
                                        title="Update Student Information"
                                        description="Are you sure to update student information?"
                                        onConfirm={() => updateStudent(studentState)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px', marginTop: '20px' }}
                                            type='primary'
                                            disabled={
                                                studentState?.id?.length === 0
                                                || studentState?.fullname?.length === 0
                                                || studentState?.phone?.length === 0
                                                || studentState?.address?.length === 0
                                                || studentState?.email?.length === 0
                                            }
                                        >
                                            UPDATE
                                        </Button>
                                    </Popconfirm>
                                </UpdateStudentForm>
                            </Col>
                            <Col span={17} style={{ marginLeft: '30px' }}>
                                <Popconfirm
                                    title="Re-scan"
                                    description="Are you sure to re-scan this student?"
                                    onConfirm={() => rescan(studentState?.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        style={{ borderRadius: '15px', backgroundColor: '#a0a0e1' }}
                                        type='primary'
                                        icon={<ScanOutlined />}
                                        disabled={
                                            studentState?.id?.length === 0
                                            || studentState?.fullname?.length === 0
                                            || studentState?.phone?.length === 0
                                            || studentState?.address?.length === 0
                                            || studentState?.email?.length === 0
                                        }
                                    >
                                        RE-SCAN
                                    </Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="Re-add"
                                    description="Are you sure to re-add this student?"
                                    onConfirm={() => handleReaddStudent(studentState?.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        style={{ borderRadius: '15px', backgroundColor: '#a0a0e1', marginLeft: '20px' }}
                                        type='primary'
                                        icon={<UserAddOutlined />}
                                        disabled={
                                            studentState?.id?.length === 0
                                            || studentState?.fullname?.length === 0
                                            || studentState?.phone?.length === 0
                                            || studentState?.address?.length === 0
                                            || studentState?.email?.length === 0
                                        }
                                    >
                                        RE-ADD
                                    </Button>
                                </Popconfirm>
                                <LoadingComponent isLoading={isLoadingReadd}>
                                    <Image
                                        src={scanURL}
                                        style={{ width: "856px", height: "485px", borderRadius: "20px", marginTop: '20px' }}
                                        draggable="false"
                                        preview={false}
                                    // key={reloadImage}
                                    />
                                </LoadingComponent>
                            </Col>
                        </Row>
                    </Drawer>
                </WrapperStudentManagement>
            </Row>
        </Card>
    )
};

export default StudentManagementPage;

const WrapperStudentManagement = styled(Col)`
    position: relative;
    height: 650px;
    padding: 48;
    overflow: hidden;

    .ant-drawer-content-wrapper {
        width: 100%!important;
    }
`

const UpdateStudentForm = styled(Form)`
    .ant-card-body {
        padding: 0px;
    }

    &:where(.css-dev-only-do-not-override-17a39f8).ant-card .ant-card-body {
        padding: 0px;
        border-radius: 0 0 8px 8px;
    }

    .auth-input-update {
        height: 45px;
        border-radius: 25px;
        padding: 0px 18px;
        margin-top: 20px; 
    }
    
    .auth-input-update .ant-input {
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

const CustomRadio = styled(Radio.Group)`
    .ant-radio-wrapper-checked {
        color: #1677c3;
    }
`
