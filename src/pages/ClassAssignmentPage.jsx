import { DownOutlined, FieldNumberOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Popconfirm, Row, Select, Table, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FloatingLabelComponent from '../components/FloatingLabelComponent';
import InputFormComponent from '../components/InputFormComponent';
import dayjs from 'dayjs';
import * as ServerService from '../services/ServerService';
import { useQuery } from '@tanstack/react-query';
import TableComponent from '../components/TableComponent';
import * as MessagePopup from '../components/MessagePopupComponent';

const ClassAssignmentPage = () => {

    const [classState, setClassState] = useState({
        id: '',
        year: new Date().getFullYear().toString(),
        semester: '1',
        teacher: '',
        course: '',
        students: [],
        time: [
            {
                day: 'Monday',
                timeIn: '',
                timeOut: '',
            },
            {
                day: 'Tuesday',
                timeIn: '',
                timeOut: '',
            },
            {
                day: 'Wednesday',
                timeIn: '',
                timeOut: '',
            },
            {
                day: 'Thursday',
                timeIn: '',
                timeOut: '',
            },
            {
                day: 'Friday',
                timeIn: '',
                timeOut: '',
            },
            {
                day: 'Saturday',
                timeIn: '',
                timeOut: '',
            },
        ],
    });

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLASS ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // class ID
    const handleOnChangeClassId = (e) => {
        setClassState({
            ...classState,
            id: e.target.value
        });
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TEACHERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // get all teachers
    const getAllTeachers = async () => {
        const res = await ServerService.getAllTeachers();
        return res;
    }
    const queryAllTeachers = useQuery({
        queryKey: ['teachers'],
        queryFn: getAllTeachers
    });
    const { isLoading: isLoadingAllTeachers, data: allTeachers } = queryAllTeachers;

    // handle on change teacher
    const handleOnChangeTeacher = (teacher) => {
        setClassState({
            ...classState,
            teacher: teacher
        });
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COURSES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // get all courses
    const getAllCourses = async () => {
        const res = await ServerService.getAllCourses();
        return res;
    }
    const queryAllCourses = useQuery({
        queryKey: ['courses'],
        queryFn: getAllCourses
    });
    const { isLoading: isLoadingAllCourses, data: allCourses } = queryAllCourses;

    // handle on change course
    const handleOnChangeCourse = (course) => {
        setClassState({
            ...classState,
            course: course
        });
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< YEAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // set up disable year
    const disabledYear = (current) => {
        // disable years before this year
        return current && current < dayjs().startOf('year');
    }
    // handle on change class year
    const onChangeClassYear = (date, dateString) => {
        setClassState({
            ...classState,
            year: dateString
        });
    };

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEMESTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // handle on change class semester
    const handleOnChangeClassSemester = (semester) => {
        setClassState({
            ...classState,
            semester: semester
        });
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TIME IN - TIME OUT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // class schedule columns table
    const classColumns = [
        {
            title: 'Days',
            dataIndex: 'day',
            className: 'class-day',
        },
        // {
        //     title: 'Time In',
        //     dataIndex: 'in',
        //     className: 'class-time-in',
        //     render: (index) => {
        //         return timeInPicker(index);
        //     }
        // },
        // {
        //     title: 'Time Out',
        //     dataIndex: 'out',
        //     className: 'class-time-out',
        //     render: (index) => {
        //         return timeOutPicker(index);
        //     }
        // },
        {
            title: 'Time',
            dataIndex: 'in-out',
            className: 'class-time-in-out',
            render: (index) => {
                return timeInOutRangePicker(index);
            }
        },
    ];
    // time in picker
    // const timeInPicker = () => {
    //     return (
    //         <TimePicker
    //             onChange={setTimeIn}
    //         />
    //     );
    // }
    // const setTimeIn = (time, timeString) => {
    //     const timeUpdate = classState?.time?.map(timeItem => {
    //         if (timeItem?.day === day) {
    //             return {
    //                 ...timeItem,
    //                 timeIn: timeString,
    //             };
    //         }
    //         return timeItem;
    //     });
    //     setClassState((prevState) => ({
    //         ...prevState,
    //         time: timeUpdate,
    //     }));
    // }
    // time out picker
    // const timeOutPicker = () => {
    //     return (
    //         <TimePicker
    //             onChange={setTimeOut}
    //         />
    //     );
    // }
    const [day, setDay] = useState('Monday');
    // const setTimeOut = (time, timeString) => {
    //     const timeUpdate = classState?.time?.map(timeItem => {
    //         if (timeItem?.day === day) {
    //             return {
    //                 ...timeItem,
    //                 timeOut: timeString,
    //             };
    //         }
    //         return timeItem;
    //     });
    //     setClassState((prevState) => ({
    //         ...prevState,
    //         time: timeUpdate,
    //     }));
    // }
    // range time in/out picker 
    const { RangePicker } = TimePicker;
    const timeInOutRangePicker = () => {
        return (
            <RangePicker
                placeholder={['Time In', 'Time Out']}
                onChange={setTimeInOut}
            />
        );
    }
    const setTimeInOut = (time, timeString) => {
        const timeIn = timeString[0];
        const timeOut = timeString[1];
        const timeUpdate = classState?.time?.map(timeItem => {
            if (timeItem?.day === day) {
                return {
                    ...timeItem,
                    timeIn: timeIn,
                    timeOut: timeOut,
                };
            }
            return timeItem;
        });
        setClassState((prevState) => ({
            ...prevState,
            time: timeUpdate,
        }));
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DAY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // class schedule data table
    const [dayData, setDayData] = useState([
        {
            key: '1',
            day: 'Monday',
            isActive: false
        },
        {
            key: '2',
            day: 'Tuesday',
            isActive: false
        },
        {
            key: '3',
            day: 'Wednesday',
            isActive: false
        },
        {
            key: '4',
            day: 'Thursday',
            isActive: false
        },
        {
            key: '5',
            day: 'Friday',
            isActive: false
        },
        {
            key: '6',
            day: 'Saturday',
            isActive: false
        },
    ]);

    // turn isActive of day to true/false
    const handleCheckDay = (e, day) => {
        // turn isActive
        const dayDataUpdate = dayData?.map(dayItem => {
            // clear time in and time out if day is inactive
            if (dayItem.isActive === true) {
                const timeUpdate = classState?.time?.map(timeItem => {
                    if (timeItem?.day === day) {
                        return {
                            ...timeItem,
                            timeIn: '',
                            timeOut: '',
                        };
                    }
                    return timeItem;
                });
                setClassState((prevState) => ({
                    ...prevState,
                    time: timeUpdate,
                }));
            }
            // turn active/inactive when click day button
            if (dayItem?.day === day) {
                return {
                    ...dayItem,
                    isActive: !dayItem.isActive
                };
            }
            return dayItem;
        });
        setDayData(dayDataUpdate);

        // set button background color by add/remove 'style' class
        const btnClassList = e.target.closest('.ant-btn').classList;
        console.log(btnClassList);
        if (btnClassList.contains('unselected-day-button')) {
            btnClassList.remove('unselected-day-button');
            btnClassList.add('selected-day-button');
        } else if (btnClassList.contains('selected-day-button')) {
            btnClassList.remove('selected-day-button');
            btnClassList.add('unselected-day-button');
        }
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STUDENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

    // students selection
    let studentsOptions = [];
    allStudents?.map((student, index) => {
        studentsOptions.push({
            label: `${student?.id} - ${student?.fullname}`,
            value: student?.id
        });
    });
    const [selectedStudentsItems, setSelectedStudentsItems] = useState([]);
    const MAX_STUDENTS_COUNT = 3;
    const suffixStudentsSelection = (
        <>
            <span>
                {selectedStudentsItems.length} / {MAX_STUDENTS_COUNT}
            </span>
            <DownOutlined />
        </>
    );
    useEffect(() => {
        setClassState({
            ...classState,
            students: selectedStudentsItems
        });
    }, [selectedStudentsItems]);

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ADD CLASS BUTTON >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // handle add class
    const addClass = async (classState) => {
        try {
            const res = await ServerService.createClass(classState);
            MessagePopup.success('Add new class successfully');
            setClassState({
                id: '',
                year: new Date().getFullYear().toString(),
                semester: '1',
                teacher: '',
                course: '',
                students: [],
                time: [
                    {
                        day: 'Monday',
                        timeIn: '',
                        timeOut: '',
                    },
                    {
                        day: 'Tuesday',
                        timeIn: '',
                        timeOut: '',
                    },
                    {
                        day: 'Wednesday',
                        timeIn: '',
                        timeOut: '',
                    },
                    {
                        day: 'Thursday',
                        timeIn: '',
                        timeOut: '',
                    },
                    {
                        day: 'Friday',
                        timeIn: '',
                        timeOut: '',
                    },
                    {
                        day: 'Saturday',
                        timeIn: '',
                        timeOut: '',
                    },
                ],
            });
            setSelectedStudentsItems([]);
            setDayData([
                {
                    key: '1',
                    day: 'Monday',
                    isActive: false
                },
                {
                    key: '2',
                    day: 'Tuesday',
                    isActive: false
                },
                {
                    key: '3',
                    day: 'Wednesday',
                    isActive: false
                },
                {
                    key: '4',
                    day: 'Thursday',
                    isActive: false
                },
                {
                    key: '5',
                    day: 'Friday',
                    isActive: false
                },
                {
                    key: '6',
                    day: 'Saturday',
                    isActive: false
                },
            ]);
            // unselect all selected day buttons
            const selectedDayButtons = document.querySelectorAll('button.selected-day-button');
            selectedDayButtons.forEach(function (item) {
                console.log(item.classList);
                item.classList.remove('selected-day-button');
                item.classList.add('unselected-day-button');
            })
        } catch (e) {
            MessagePopup.error('Cannot add new class');
            return;
        }
    }

    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Row justify="center">
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '25px' }}>CLASS ASSIGNMENT</div>
            </Row>
            <Row>
                <Col span={11}>
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
                            style={{ marginBottom: '0px', padding: '0px 20px' }}
                            className='form-item-input'
                        >
                            <FloatingLabelComponent
                                label="Class ID"
                                value={classState?.id}
                                styleBefore={{ left: '17px', top: '31px' }}
                                styleAfter={{ left: '17px', top: '23px' }}
                            >
                                <InputFormComponent
                                    name="name"
                                    placeholder=""
                                    className='input-class-id'
                                    value={classState?.id}
                                    onChange={handleOnChangeClassId}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px', padding: '0px 20px' }}
                            className='form-item-input'
                        >
                            <FloatingLabelComponent
                                label="Class Year"
                                value="hi"
                                styleBefore={{ left: '17px', top: '31px' }}
                                styleAfter={{ left: '17px', top: '23px' }}
                            >
                                <DatePicker
                                    onChange={onChangeClassYear}
                                    picker="year"
                                    defaultValue={dayjs('2024', 'YYYY')}
                                    className='input-year-picker'
                                    style={{ width: '100%' }}
                                    allowClear={false}
                                    disabledDate={disabledYear}
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='form-item-input'
                        >
                            <FloatingLabelComponent
                                label="Class Semester"
                                value="semester"
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <Select
                                    className='input-select-semester'
                                    defaultValue="1"
                                    onChange={handleOnChangeClassSemester}
                                >
                                    <Select.Option value="1">1st Semester (January - May)</Select.Option>
                                    <Select.Option value="2">2nd Semester (August - December)</Select.Option>
                                </Select>
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='form-item-input'
                        >
                            <FloatingLabelComponent
                                label="Teacher"
                                value="teacher"
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <Select
                                    className='input-select-teacher'
                                    defaultValue="Select Teacher"
                                    onChange={handleOnChangeTeacher}
                                    value={classState?.teacher?.length > 0 ? classState?.teacher : "Select Teacher"}
                                >
                                    {allTeachers?.map((teacher, index) => {
                                        return (
                                            <Select.Option value={teacher?.id}>{teacher?.id} - {teacher?.fullname}</Select.Option>
                                        );
                                    })}
                                </Select>
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item
                            label=""
                            validateStatus={"validating"}
                            help=""
                            style={{ marginBottom: '0px' }}
                            className='form-item-input'
                        >
                            <FloatingLabelComponent
                                label="Course"
                                value="course"
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <Select
                                    className='input-select-semester'
                                    defaultValue="Select Course"
                                    onChange={handleOnChangeCourse}
                                    value={classState?.course?.length > 0 ? classState?.course : "Select Course"}
                                >
                                    {allCourses?.map((course, index) => {
                                        return (
                                            <Select.Option value={course?.id}>{course?.id} - {course?.name}</Select.Option>
                                        );
                                    })}
                                </Select>
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item>
                            <FloatingLabelComponent
                                label="Students"
                                value="students"
                                styleBefore={{ left: '37px', top: '31px' }}
                                styleAfter={{ left: '37px', top: '23px' }}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder=""
                                    className='input-select-students'
                                    value={selectedStudentsItems}
                                    onChange={setSelectedStudentsItems}
                                    style={{
                                        width: '100%',
                                    }}
                                    options={studentsOptions}
                                    maxCount={MAX_STUDENTS_COUNT}
                                    suffixIcon={suffixStudentsSelection}
                                    maxTagCount='responsive'
                                />
                            </FloatingLabelComponent>
                        </Form.Item>

                        <Form.Item>
                            <Popconfirm
                                title="Assign class"
                                description="Are you sure to assign this class?"
                                onConfirm={() => addClass(classState)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    style={{ borderRadius: '25px', backgroundColor: '#a0a0e1', width: '100%', height: '45px' }}
                                    type='primary'
                                    disabled={
                                        classState?.id?.length === 0
                                        || classState?.year?.length === 0
                                        || classState?.semester?.length === 0
                                        || classState?.teacher?.length === 0
                                        || classState?.course?.length === 0
                                        || classState?.students?.length === 0
                                    }
                                >
                                    CREATE
                                </Button>
                            </Popconfirm>
                        </Form.Item>
                    </AddNewForm>
                </Col>
                <Col span={12} offset={1}>
                    <Col style={{ margin: '20px 0px' }}>
                        <Row style={{ marginBottom: '20px' }}>
                            <DaySelectionButton
                                className='unselected-day-button'
                                type='default'
                                onClick={(e) => handleCheckDay(e, 'Monday')}
                            >
                                Monday
                            </DaySelectionButton>
                            <DaySelectionButton
                                className='unselected-day-button'
                                type='default'
                                onClick={(e) => handleCheckDay(e, 'Tuesday')}
                            >
                                Tuesday
                            </DaySelectionButton>
                            <DaySelectionButton
                                className='unselected-day-button'
                                type='default'
                                onClick={(e) => handleCheckDay(e, 'Wednesday')}
                            >
                                Wednesday
                            </DaySelectionButton>
                        </Row>
                        <Row>
                            <DaySelectionButton
                                className='unselected-day-button'
                                type='default'
                                onClick={(e) => handleCheckDay(e, 'Thursday')}
                            >
                                Thursday
                            </DaySelectionButton>
                            <DaySelectionButton
                                className='unselected-day-button'
                                type='default'
                                onClick={(e) => handleCheckDay(e, 'Friday')}
                            >
                                Friday
                            </DaySelectionButton>
                            <DaySelectionButton
                                className='unselected-day-button'
                                type='default'
                                onClick={(e) => handleCheckDay(e, 'Saturday')}
                            >
                                Saturday
                            </DaySelectionButton>
                        </Row>
                    </Col>
                    <TableComponent
                        columns={classColumns}
                        data={dayData?.filter(function (classObject) {
                            return classObject.isActive !== false;      // only active class object 
                        })}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setDay(record?.day)
                                }
                            }
                        }}
                        pagination={false}
                    />
                </Col>
            </Row>
        </Card>
    )
};

export default ClassAssignmentPage;

const AddNewForm = styled(Form)`
    .ant-card-body {
        padding: 0px;
    }

    &:where(.css-dev-only-do-not-override-17a39f8).ant-card .ant-card-body {
        padding: 0px;
        border-radius: 0 0 8px 8px;
    }

    .input-class-id, .input-add-new, .input-select-semester, .input-select-teacher, .input-year-picker, .input-select-students {
        height: 45px;
        border-radius: 25px;
        padding: 0px 18px;
        margin-top: 20px; 
    }

    .input-select-semester .ant-select-selector,
    .input-select-students .ant-select-selector,
    .input-select-teacher .ant-select-selector {
        border-radius: 25px;
    }

    .input-select-semester .ant-select-selector .ant-select-selection-item,
    .input-select-students .ant-select-selector .ant-select-selection-item,
    .input-select-teacher .ant-select-selector .ant-select-selection-item {
        text-align: start;
        padding: 7px 0px 0px 7px;
    }
    
    .input-select-semester .ant-select-arrow,
    .input-select-students .ant-select-arrow,
    .input-select-teacher .ant-select-arrow, {
        margin-right: 20px;
    }

    .input-select-students .ant-select-selection-item {
        margin: 15px 0px 0px 7px;
        padding: 0px!important;
    }
    
    .input-add-new .ant-input {
        padding-top: 7px;
    }

    .button-signin {
        height: 50px; 
        width: 100%; 
        border-radius: 25px; 
        margin-bottom: 20px; 
        margin-top: 20px;
    }

    .disabled-row {
        background-color: #dcdcdc;
        pointer-events: none;
    }
`

const DaySelectionButton = styled(Button)`
    &.unselected-day-button {
        border-radius: 25px;
        border: 2px solid #a0a0e1;
        width: 100px;
        height: 35px;
        color: #4d4d7f;
        margin-right: 20px;
    }

    &.selected-day-button {
        border-radius: 25px;
        border: 2px solid #a0a0e1;
        width: 100px;
        height: 35px;
        margin-right: 20px;
        color: #fff;
        background-color: #a0a0e1;
    }
`


