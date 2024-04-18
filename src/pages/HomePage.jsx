import { Button, Card, Col, List, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {

    const user = useSelector((state) => state.user);
    console.log(user);

    // navigate
    const navigate = useNavigate();

    const navigateSignInPage = () => {
        navigate('/sign-in');
    }
    const navigateAddStudentPage = () => {
        navigate('/add-student');
    }
    const navigateCourseManagementPage = () => {
        navigate('/course-management');
    }
    const navigateStudentManagementPage = () => {
        navigate('/student-management');
    }
    const navigateTeacherManagementPage = () => {
        navigate('/teacher-management');
    }
    const navigateClassAssignmentPage = () => {
        navigate('/class-assignment');
    }
    const navigateClassManagementPage = () => {
        navigate('/class-management');
    }

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Row justify="space-between">
                <Col span={24} style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '30px', fontWeight: '700', color: '#4d4d7f', marginBottom: '10px' }}>FACE ATTENDANCE SYSTEM</div>
                    <div style={{ fontSize: '16px', color: 'grey', marginBottom: '10px' }}>This is website for Administrator to manage the system. Let's {user?.fullname ? "find out!" : "sign in!"}</div>
                </Col>
            </Row>
            {user?.fullname &&
                <div>
                    <Row justify="center" style={{ marginBottom: '20px', marginTop: '50px' }}>
                        <Col>
                            <div style={{ fontSize: '22px', fontWeight: '700', color: '#4d4d7f', marginBottom: '10px' }}>ALL PRIMARY OBJECTS</div>
                            <div style={{ fontSize: '16px', color: 'grey', marginBottom: '10px' }}>These objects are created to interact to each other in the system.</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CardCustom hoverable>
                                <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '10px' }}>
                                    Students Management
                                </div>
                                <div style={{ color: 'grey', marginBottom: '30px' }}>
                                    Adding new student's information and pictures,<br /> following or updating student's information.
                                </div>
                                <Row justify="space-evenly">
                                    <ButtonCustom onClick={navigateAddStudentPage}>
                                        Add
                                    </ButtonCustom>
                                    <ButtonCustom onClick={navigateStudentManagementPage}>
                                        Manage
                                    </ButtonCustom>
                                </Row>
                            </CardCustom>
                        </Col>
                        <Col offset={1}>
                            <CardCustom hoverable>
                                <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '10px' }}>
                                    Courses Management
                                </div>
                                <div style={{ color: 'grey', marginBottom: '30px' }}>
                                    Managing courses by following all courses, adding new and updating specific course.
                                </div>
                                <Row justify="space-evenly">
                                    <ButtonCustom onClick={navigateCourseManagementPage}>
                                        Manage
                                    </ButtonCustom>
                                </Row>
                            </CardCustom>
                        </Col>
                        <Col offset={1}>
                            <CardCustom hoverable>
                                <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '10px' }}>
                                    Teachers Management
                                </div>
                                <div style={{ color: 'grey', marginBottom: '30px' }}>
                                    Adding new teacher to system as well as updating a specific teacher's information.
                                </div>
                                <Row justify="space-evenly">
                                    <ButtonCustom onClick={navigateTeacherManagementPage}>
                                        Manage
                                    </ButtonCustom>
                                </Row>
                            </CardCustom>
                        </Col>
                    </Row>
                    <Row justify="center" style={{ marginBottom: '20px' }}>
                        <Col>
                            <div style={{ fontSize: '22px', fontWeight: '700', color: '#4d4d7f', marginBottom: '10px', marginTop: '40px' }}>ALL CLASSES</div>
                            <div style={{ fontSize: '16px', color: 'grey', marginBottom: '10px' }}>Class is the set of which teacher will be in charge of teaching a number of students in a specific course .</div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Card style={{ border: '2px solid #a0a0e1' }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {
                                            title: 'Class Assignment',
                                            description: "Class assignment is to register a new class including course, teacher and students.",
                                            navigate: () => navigateClassAssignmentPage()
                                        },
                                        {
                                            title: 'Class Management',
                                            description: "Class management is to see all information of the classes.",
                                            navigate: () => navigateClassManagementPage()
                                        },
                                    ]}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={
                                                    <Button
                                                        // type="link"
                                                        style={{ fontWeight: '600', fontSize: '18px', border: '0px' }}
                                                        onClick={item.navigate}
                                                    >
                                                        {item.title}
                                                    </Button>
                                                }
                                                description={
                                                    <span style={{ color: 'grey' }}>
                                                        {item.description}
                                                    </span>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </Card>
    )
};

export default HomePage;

const ButtonCustom = styled(Button)`
    border-radius: 15px;
    background-color: #a0a0e1;
    margin-left: 20px;
    color: #fff;
    padding: 0px 40px;
`
const CardCustom = styled(Card)`
    border: 2px solid #a0a0e1;
    height: 193px;
    width: 345px;
`
