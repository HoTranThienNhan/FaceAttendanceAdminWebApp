import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../redux/slices/userSlice';
import { Col, Dropdown, Row, Space } from 'antd';
import * as MessagePopup from '../components/MessagePopupComponent';


const HeaderComponent = () => {
   const user = useSelector((state) => state.user);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSignOut = () => {
      dispatch(resetUser());
      navigate('/');
      MessagePopup.success("Sign out successfully");
   }

   // navigate items
   const navStudentItems = [
      {
         key: '1',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => navigateAddStudentPage()}>
               Add Student
            </a>
         ),
      },
      {
         key: '2',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => navigateStudentManagementPage()}>
               Student Management
            </a>
         ),
      },
   ];
   const navCourseItems = [
      {
         key: '1',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => navigateCreateCoursePage()}>
               Course Management
            </a>
         ),
      },
   ];
   const navClassItems = [
      {
         key: '1',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => navigateClassAssignmentPage()}>
               Class Assignment
            </a>
         ),
      },
      {
         key: '2',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => navigateClassManagementPage()}>
               Class Management
            </a>
         ),
      },
   ];
   const navTeacherItems = [
      {
         key: '1',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => navigateAddTeacherPage()}>
               Teacher Management
            </a>
         ),
      },
   ];
   const navUsernameItems = [
      {
         key: '1',
         label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => handleSignOut()}>
               Log Out
            </a>
         ),
      },
   ];

   // navigate
   const navigateHomePage = () => {
      navigate('/');
   }
   const navigateSignInPage = () => {
      navigate('/sign-in');
   }
   const navigateAddStudentPage = () => {
      navigate('/add-student');
   }
   const navigateCreateCoursePage = () => {
      navigate('/create-course');
   }
   const navigateStudentManagementPage = () => {
      navigate('/student-management');
   }
   const navigateAddTeacherPage = () => {
      navigate('/add-teacher');
   }
   const navigateClassAssignmentPage = () => {
      navigate('/class-assignment');
   }
   const navigateClassManagementPage = () => {
      navigate('/class-management');
   }

   return (
      <div style={{ margin: '30px 100px' }}>
         <Row justify="space-between" style={{ backgroundColor: '#a0a0e1', padding: '25px 80px', borderRadius: '15px', textAlign: 'center' }}>
            <Col span={6} style={{ color: '#fff', fontWeight: '700' }}>
               <div style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => navigateHomePage()}>FACE ATTENDANCE SYSTEM</div>
            </Col>
            {user?.fullname
               ?
               <Col span={18} style={{ color: '#fff', fontWeight: '700', width: '600px' }}>
                  <Row justify='end'>
                     <Col span={4}>
                        <Dropdown
                           menu={{
                              items: navStudentItems,
                           }}
                           arrow={{
                              pointAtCenter: true,
                           }}
                        >
                           <span style={{ fontSize: '16px', cursor: 'pointer', color: '#fff', fontWeight: '700' }}>
                              Students
                           </span>
                        </Dropdown>
                     </Col>
                     <Col span={4}>
                        <Dropdown
                           menu={{
                              items: navCourseItems,
                           }}
                           arrow={{
                              pointAtCenter: true,
                           }}
                        >
                           <span style={{ fontSize: '16px', cursor: 'pointer', color: '#fff', fontWeight: '700' }}>
                              Courses
                           </span>
                        </Dropdown>
                     </Col>
                     <Col span={4}>
                        <Dropdown
                           menu={{
                              items: navClassItems,
                           }}
                           arrow={{
                              pointAtCenter: true,
                           }}
                        >
                           <span style={{ fontSize: '16px', cursor: 'pointer', color: '#fff', fontWeight: '700' }}>
                              Classes
                           </span>
                        </Dropdown>
                     </Col>
                     <Col span={4}>
                        <Dropdown
                           menu={{
                              items: navTeacherItems,
                           }}
                           arrow={{
                              pointAtCenter: true,
                           }}
                        >
                           <span style={{ fontSize: '16px', cursor: 'pointer', color: '#fff', fontWeight: '700' }}>
                              Teachers
                           </span>
                        </Dropdown>
                     </Col>
                     <Col span={4} offset={2}>
                        <Dropdown
                           menu={{
                              items: navUsernameItems,
                           }}
                           arrow={{
                              pointAtCenter: true,
                           }}
                        >
                           <Col style={{ fontSize: '16px', cursor: 'pointer', color: '#fff', fontWeight: '700' }}><UserOutlined /> {user?.fullname}</Col>
                        </Dropdown>
                     </Col>
                  </Row>
               </Col>
               :
               <Col style={{ color: '#fff', fontWeight: '700' }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => navigateSignInPage()}>Sign In</div>
               </Col>
            }
         </Row>
      </div>
   )
};

export default HeaderComponent;
