import { Card, Col, Row } from 'antd';
import React from 'react';
import TableComponent from '../components/TableComponent';
import * as ServerService from '../services/ServerService';
import { useQuery } from '@tanstack/react-query';

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

    // student table columns
    const studentColumns = [
        {
            title: 'Student ID',
            dataIndex: 'id',
            className: 'student-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            className: 'student-full-name',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
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
    ];

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '15px' }}>STUDENTS MANAGEMENT</div>
            <Row>
                <Col>
                    <TableComponent
                        columns={studentColumns}
                        data={allStudents}
                    />
                </Col>
            </Row>
        </Card>
    )
};

export default StudentManagementPage;
