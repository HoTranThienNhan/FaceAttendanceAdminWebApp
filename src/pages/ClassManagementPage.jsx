import { Button, Card, Col, Divider, Modal, Row } from 'antd';
import React, { useState } from 'react';
import * as ServerService from '../services/ServerService';
import TableComponent from '../components/TableComponent';
import { useQuery } from '@tanstack/react-query';
import { EllipsisOutlined } from '@ant-design/icons';

const ClassManagementPage = () => {

    // class columns
    const classColumns = [
        {
            title: 'Class ID',
            dataIndex: 'id',
            className: 'class-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            className: 'class-year',
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            className: 'class-semester',
        },
        {
            title: 'Teacher ID',
            dataIndex: 'teacherid',
            className: 'class-teacher-id',
            sorter: (a, b) => a.teacherid.localeCompare(b.teacherid),
        },
        {
            title: 'Teacher Name',
            dataIndex: 'teachername',
            className: 'class-teacher-name',
            sorter: (a, b) => a.teachername.localeCompare(b.teachername),
        },
        {
            title: 'Course ID',
            dataIndex: 'courseid',
            className: 'class-course-id',
            sorter: (a, b) => a.courseid.localeCompare(b.courseid),
        },
        {
            title: 'Course Name',
            dataIndex: 'coursename',
            className: 'class-course-name',
            sorter: (a, b) => a.coursename.localeCompare(b.coursename),
        },
        {
            title: 'Students',
            dataIndex: 'students',
            className: 'class-students',
            render: (index, record) => {
                return (
                    <Button onClick={() => showStudentsModal(record?.id)}>
                        <EllipsisOutlined style={{ fontSize: '22px' }} />
                    </Button>
                );
            }
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            className: 'class-schedule',
            render: (index, record) => {
                return (
                    <Button onClick={() => showScheduleModal(record?.id)}>
                        <EllipsisOutlined style={{ fontSize: '22px' }} />
                    </Button>
                );
            }
        },
    ];
    // get all classes
    const getAllClasses = async () => {
        const res = await ServerService.getAllClasses();
        return res;
    }
    const queryAllClasses = useQuery({
        queryKey: ['classes'],
        queryFn: getAllClasses
    });
    const { isLoading: isLoadingAllClasses, data: allClasses } = queryAllClasses;

    // students modal
    const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
    const [allStudentsByClass, setAllStudentsByClass] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const showStudentsModal = async (classid) => {
        const res_all_students = await ServerService.getAllStudentsByClass(classid);
        setAllStudentsByClass(res_all_students);
        setSelectedClassId(classid);
        setIsStudentsModalOpen(true);
    };
    const handleStudentsModalOk = () => {
        setIsStudentsModalOpen(false);
    };
    const handleStudentsModalCancel = () => {
        setIsStudentsModalOpen(false);
    };

    // schedule modal
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [allClassTime, setAllClassTime] = useState();
    const showScheduleModal = async (classid) => {
        const res_all_class_time = await ServerService.getClassTimeByClassId(classid);
        setAllClassTime(res_all_class_time);
        setSelectedClassId(classid);
        setIsScheduleModalOpen(true);
    };
    const handleScheduleModalOk = () => {
        setIsScheduleModalOpen(false);
    };
    const handleScheduleModalCancel = () => {
        setIsScheduleModalOpen(false);
    };

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Row justify="center">
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '25px' }}>CLASS MANAGEMENT</div>
            </Row>
            <Row>
                <Col span={24}>
                    <TableComponent
                        columns={classColumns}
                        data={allClasses}
                        pagination={false}
                    />
                </Col>
            </Row>

            {/* Students Modal */}
            <Modal
                open={isStudentsModalOpen}
                onOk={handleStudentsModalOk}
                onCancel={handleStudentsModalCancel}
                width={600}
            >
                <div style={{ fontSize: '20px', marginBottom: '20px', fontWeight: '600' }}>
                    Class ID: {selectedClassId}
                </div>
                <Divider />
                <div style={{ fontSize: '18px', marginBottom: '5px', fontWeight: '600' }}>
                    Students List:
                </div>
                {allStudentsByClass?.map((student, index) => {
                    return (
                        <div style={{ fontSize: '16px', marginBottom: '5px' }}>
                            {student?.id} - {student?.fullname}
                        </div>
                    );
                })}
                <Divider />
                <div style={{ fontSize: '18px' }}>
                    <span style={{ fontWeight: '600' }}>Total: </span>
                    {allStudentsByClass?.length > 0 ? allStudentsByClass?.length : 0} {allStudentsByClass?.length > 1 ? ' students' : ' student'}
                </div>
            </Modal>

            {/* Schedule Modal */}
            <Modal
                open={isScheduleModalOpen}
                onOk={handleScheduleModalOk}
                onCancel={handleScheduleModalCancel}
                width={600}
            >
                <div style={{ fontSize: '20px', marginBottom: '20px', fontWeight: '600' }}>
                    Class ID: {selectedClassId}
                </div>
                <Divider />
                <div style={{ fontSize: '18px', marginBottom: '50px', padding: '0px 30px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        Class Time Table
                    </div>
                    <TableComponent
                        columns={[
                            {
                                title: 'Day',
                                dataIndex: 'day',
                                className: 'class-day',
                            },
                            {
                                title: 'Time In',
                                dataIndex: 'timein',
                                className: 'class-timein',
                            },
                            {
                                title: 'Time Out',
                                dataIndex: 'timeout',
                                className: 'class-timeout',
                            },
                        ]}
                        data={allClassTime}
                        pagination={false}
                    />
                </div>
            </Modal>

        </Card>
    )
};

export default ClassManagementPage;
