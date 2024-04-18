import { Button, Card, Col, Divider, Input, Modal, Row, Space } from 'antd';
import React, { useRef, useState } from 'react';
import * as ServerService from '../services/ServerService';
import TableComponent from '../components/TableComponent';
import { useQuery } from '@tanstack/react-query';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const ClassManagementPage = () => {

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

    // class columns
    const classColumns = [
        {
            title: 'Class ID',
            dataIndex: 'id',
            className: 'class-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            ...getColumnSearchProps('id')
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
            ...getColumnSearchProps('teacherid')
        },
        {
            title: 'Teacher Name',
            dataIndex: 'teachername',
            className: 'class-teacher-name',
            sorter: (a, b) => a.teachername.localeCompare(b.teachername),
            ...getColumnSearchProps('teachername')
        },
        {
            title: 'Course ID',
            dataIndex: 'courseid',
            className: 'class-course-id',
            sorter: (a, b) => a.courseid.localeCompare(b.courseid),
            ...getColumnSearchProps('courseid')
        },
        {
            title: 'Course Name',
            dataIndex: 'coursename',
            className: 'class-course-name',
            sorter: (a, b) => a.coursename.localeCompare(b.coursename),
            ...getColumnSearchProps('coursename')
        },
        {
            title: 'Students',
            dataIndex: 'students',
            className: 'class-students',
            render: (index, record) => {
                return (
                    <Button onClick={() => showStudentsModal(record?.id, record?.teacherid, record?.teachername, record?.courseid, record?.coursename)}>
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
    const [selectedTeacher, setSelectedTeacher] = useState({
        id: '',
        name: ''
    });
    const [selectedCourse, setSelectedCourse] = useState({
        id: '',
        name: ''
    });
    const showStudentsModal = async (classid, teacherid, teachername, courseid, coursename) => {
        const res_all_students = await ServerService.getAllStudentsByClass(classid);
        setAllStudentsByClass(res_all_students);
        setSelectedClassId(classid);
        setSelectedTeacher({
            id: teacherid,
            name: teachername
        });
        setSelectedCourse({
            id: courseid,
            name: coursename
        });
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
                <div style={{ fontSize: '22px', marginBottom: '7px', fontWeight: '600' }}>
                    Class ID: {selectedClassId}
                </div>
                <div style={{ fontSize: '18px', marginBottom: '7px', fontWeight: '600' }}>
                    Teacher: {selectedTeacher?.id} - {selectedTeacher?.name}
                </div>
                <div style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '600' }}>
                    Course: {selectedCourse?.id} - {selectedCourse?.name}
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
                <div style={{ fontSize: '22px', marginBottom: '7px', fontWeight: '600' }}>
                    Class ID: {selectedClassId}
                </div>
                <div style={{ fontSize: '18px', marginBottom: '7px', fontWeight: '600' }}>
                    Teacher: {selectedTeacher?.id} - {selectedTeacher?.name}
                </div>
                <div style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '600' }}>
                    Course: {selectedCourse?.id} - {selectedCourse?.name}
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
