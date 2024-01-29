import { Button, Card, Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import InputFormComponent from '../components/InputFormComponent';
import { FieldNumberOutlined, HomeOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, ReadOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
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
        description: ''
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
    }

    // handle add course
    const addCourse = async (courseState) => {
        try {
            await ServerService.createCourse(courseState?.id, courseState?.name, courseState?.description);
            MessagePopup.success('Add new course successfully');
            // refetch courses table
            queryAllCourses.refetch();
            // refresh course information form
            setCourseState({
                id: '',
                name: '',
                description: ''
            });
        } catch (e) {
            MessagePopup.error('Course has already existed');
            return;
        }
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
                description: ''
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
            description: ''
        });
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
                    </AddNewForm>
                    <Row justify="space-between" style={{ marginTop: '20px' }}>
                        <Col span={11}>
                            {courseButtonState === 'create'
                                || (courseState?.id?.length === 0
                                    && courseState?.name?.length === 0
                                    && courseState?.description?.length === 0)
                                ?
                                <Button
                                    style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                    type='primary'
                                    onClick={() => addCourse(courseState)}
                                    disabled={
                                        courseState?.id?.length === 0
                                        || courseState?.name?.length === 0
                                    }
                                >
                                    CREATE
                                </Button>
                                :
                                <Button
                                    style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                    type='primary'
                                    onClick={() => updateCourse(courseState)}
                                    disabled={
                                        courseState?.id?.length === 0
                                        || courseState?.name?.length === 0
                                    }
                                >
                                    UPDATE
                                </Button>
                            }
                        </Col>
                        <Col span={11}>
                            <Button
                                style={{ borderRadius: '25px', border: '2px solid #a0a0e1', width: '100%', height: '45px', color: '#4d4d7f' }}
                                type='default'
                                onClick={() => clearForm()}
                            >
                                CLEAR
                            </Button>
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
                                        description: record?.description
                                    });
                                    // change button 'create' course to button 'update'
                                    setCourseButtonState('update');
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
