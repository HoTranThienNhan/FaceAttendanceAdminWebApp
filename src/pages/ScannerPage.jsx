import { Button } from 'antd';
import * as ServerService from '../services/ServerService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScannerPage = () => {

    const [test, setTest] = useState("");

    const getTest = async () => {
        const res = await ServerService.getTest();
        if (res) {
            setTest(res?.hi);
        }
    }

    // navigate
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }

    return (
        <div>
            <Button
                type="primary"
                style={{ height: '50px', width: '170px', borderRadius: '25px' }}
                onClick={getTest}
                danger>
                Get Test
            </Button>
            <span>{test}</span>
            <div>
                <img src={`${process.env.REACT_APP_API_URL}/video_feed/Nhan`} style={{ width: "60%", height: "60%", borderRadius: "20px" }} />
            </div>
            <div>
                <Button
                    type="primary"
                    style={{ height: '40px', width: '170px', borderRadius: '25px' }}
                    onClick={handleNavigateHomePage}
                    danger>
                    Back To Home
                </Button>
            </div>
        </div>
    )
};

export default ScannerPage;

