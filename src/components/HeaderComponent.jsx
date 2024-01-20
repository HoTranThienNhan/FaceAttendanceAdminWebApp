import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../redux/slices/userSlice';
import { Col, Row } from 'antd';
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

   // navigate
   const navigateHomePage = () => {
      navigate('/');
   }
   const navigateSignInPage = () => {
      navigate('/signin');
   }
   const navigateScannerPage = () => {
      navigate('/scanner');
   }
   const navigateAddNewPage = () => {
      navigate('/addnew');
   }

   return (
      <div style={{ margin: '30px 100px' }}>
         <Row justify="space-between" style={{ backgroundColor: '#a0a0e1', padding: '25px 80px', borderRadius: '15px', textAlign: 'center' }}>
            <Col style={{ color: '#fff', fontWeight: '700' }}>
               <div style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => navigateHomePage()}>FACE ATTENDANCE SYSTEM</div>
            </Col>
            {user?.fullname
               ?
               <Col style={{ color: '#fff', fontWeight: '700', width: '600px' }}>
                  <Row justify='end'>
                     <Col span={4} style={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => navigateAddNewPage()} >
                        Add New
                     </Col>
                     <Col span={4} style={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => navigateScannerPage()} >
                        Scanner
                     </Col>
                     <Col span={4} offset={4} style={{ fontSize: '16px' }}>
                        <Row justify="space-between" style={{ width: '80px' }}>
                           <Col>{user?.fullname}</Col>
                           <Col><LogoutOutlined onClick={() => handleSignOut()} style={{ fontSize: '22px' }} /></Col>
                        </Row>
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
