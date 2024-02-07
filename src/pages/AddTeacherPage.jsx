import { Card, Row } from 'antd';
import React from 'react';

const AddTeacherPage = () => {
    return (
        <Card style={{ margin: '30px 100px', borderRadius: '15px', padding: '0px 30px' }}>
            <Row justify="center">
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#4d4d7f', marginBottom: '25px' }}>TEACHER INFORMATION</div>
            </Row>
            
        </Card>
    )
};

export default AddTeacherPage;
