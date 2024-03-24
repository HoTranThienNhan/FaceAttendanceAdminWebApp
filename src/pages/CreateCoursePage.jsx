import { Button, Card, Col, Form, Popconfirm, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import InputFormComponent from '../components/InputFormComponent';
import { FieldNumberOutlined, ReadOutlined, SnippetsOutlined } from '@ant-design/icons';
import FloatingLabelComponent from '../components/FloatingLabelComponent';
import styled from 'styled-components';
import * as ServerService from '../services/ServerService';
import * as MessagePopup from '../components/MessagePopupComponent';
import TableComponent from '../components/TableComponent';
import { useQuery } from '@tanstack/react-query';

const CreateCoursePage = () => {

    const [courseState, setCourseState] = useState({
        id: '',
        name: '',
        description: '',
        active: 1,
    });

    // course button state
    const [courseButtonState, setCourseButtonState] = useState('create');
    useEffect(() => {
        // change course button to create when clear form
        if (courseState?.id?.length === 0 && courseState?.name?.length === 0 && courseState?.description?.length === 0) {
            setCourseButtonState('create');
        }
    }, [courseState]);

    // handle on change input
    const handleOnChangeCourseState = (e) => {
        setCourseState({
            ...courseState,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'id') {
            setErrorMessage('');
        }
    }

    // handle add course
    const [errorMessage, setErrorMessage] = useState('');
    const addCourse = async (courseState) => {
        await ServerService.createCourse(courseState?.id, courseState?.name, courseState?.description, courseState?.active)
            .then(res => {
                MessagePopup.success('Add new course successfully');
                // refetch courses table
                queryAllCourses.refetch();
                // refresh course information form
                setCourseState({
                    id: '',
                    name: '',
                    description: '',
                    active: 1,
                });
            })
            .catch(err => {
                setErrorMessage(err.message);
                MessagePopup.error('Course has already existed');
                return;
            });
    }

    // update course
    const updateCourse = async (courseState) => {
        try {
            await ServerService.updateCourse(courseState?.id, courseState?.name, courseState?.description);
            MessagePopup.success('Update course successfully');
            // refetch courses table
            queryAllCourses.refetch();
            // refresh course information form
            setCourseState({
                id: '',
                name: '',
                description: '',
                active: 1,
            });
        } catch (e) {
            MessagePopup.error('Cannot update course');
            return;
        }
    }

    // clear form
    const clearForm = () => {
        setCourseState({
            id: '',
            name: '',
            description: '',
            active: 1,
        });
        setErrorMessage('');
    }

    // courses table
    const courseColumns = [
        {
            title: 'Course ID',
            dataIndex: 'id',
            className: 'course-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            className: 'course-name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Course Description',
            dataIndex: 'description',
            className: 'course-description',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Course Active',
            dataIndex: 'active',
            className: 'course-active',
            render: (isActive) => {
                return renderActiveField(isActive);
            }
        },
    ];
    const getAllCourses = async () => {
        const res = await ServerService.getAllCourses();
        return res;
    }
    const queryAllCourses = useQuery({
        queryKey: ['courses'],
        queryFn: getAllCourses
    });
    const { isLoading: isLoadingAllCourses, data: allCourses } = queryAllCourses;

    // active field in table
    const renderActiveField = (isActive) => {
        return (
            <Form>
                <Popconfirm
                    placement='topRight'
                    title="Activate/Inactivate The Course"
                    description={<span>Do you really want to<br />do this process?</span>}
                    onConfirm={() => handleActiveCourseConfirm()}
                    onCancel={handleActiveCourseCancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        className='courses-active'
                        checked={isActive}
                    />
                </Popconfirm>
            </Form>
        );
    }
    const handleActiveCourseConfirm = async () => {
        try {
            // switch course status
            if (courseState?.active === 1) {
                courseState.active = 0;
            } else {
                courseState.active = 1;
            }
            await ServerService.updateStatusCourse(courseState?.id, courseState?.active);
            MessagePopup.success('Update status course successfully');
            // refetch courses table
            queryAllCourses.refetch();
        } catch (e) {
            MessagePopup.error('Cannot update status course');
            return;
        }

    }
    const handleActiveCourseCancel = () => {

    }

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Row justify="space-between">
                <Col span={6} style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '15px' }}>COURSE INFORMATION</div>
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
                                label="Course ID"
                                value={courseState?.id}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="id"
                                    placeholder=""
                                    prefix={<FieldNumberOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={courseState?.id}
                                    onChange={handleOnChangeCourseState}
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
                                label="Course Name"
                                value={courseState?.name}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="name"
                                    placeholder=""
                                    prefix={<ReadOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={courseState?.name}
                                    onChange={handleOnChangeCourseState}
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
                                label="Description"
                                value={courseState?.description}
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="description"
                                    placeholder=""
                                    prefix={<SnippetsOutlined className="site-form-item-icon" />}
                                    className='auth-input-add-new'
                                    value={courseState?.description}
                                    onChange={handleOnChangeCourseState}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        {errorMessage?.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    </AddNewForm>
                    <Row justify="space-between" style={{ marginTop: '20px' }}>
                        <Col span={11}>
                            {courseButtonState === 'create'
                                || (courseState?.id?.length === 0
                                    && courseState?.name?.length === 0
                                    && courseState?.description?.length === 0)
                                ?
                                <Popconfirm
                                    title="Create course"
                                    description="Are you sure to create this course?"
                                    onConfirm={() => addCourse(courseState)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                        type='primary'
                                        disabled={
                                            courseState?.id?.length === 0
                                            || courseState?.name?.length === 0
                                        }
                                    >
                                        CREATE
                                    </Button>
                                </Popconfirm>
                                :
                                <Popconfirm
                                    title="Update course"
                                    description="Are you sure to update this course?"
                                    onConfirm={() => updateCourse(courseState)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                        type='primary'
                                        disabled={
                                            courseState?.id?.length === 0
                                            || courseState?.name?.length === 0
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
                </Col>
                <Col span={16} style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '30px' }}>ALL COURSES</div>
                    <TableComponent
                        columns={courseColumns}
                        data={allCourses}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    // set the selected course information to the form
                                    setCourseState({
                                        id: record?.id,
                                        name: record?.name,
                                        description: record?.description,
                                        active: record?.active,
                                    });
                                    // change button 'create' course to button 'update'
                                    setCourseButtonState('update');
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

export default CreateCoursePage;

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
