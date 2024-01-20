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

    const [scanURL, setScanURL] = useState('');
    const scan = () => {
        setScanURL(`${process.env.REACT_APP_API_URL}/video_feed/Nhan`);
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
            <Button
                type="primary"
                style={{ height: '50px', width: '170px', borderRadius: '25px' }}
                onClick={scan}
                danger>
                Scan
            </Button>
            <span>{test}</span>
            <div>
                <img src={scanURL} style={{ width: "60%", height: "60%", borderRadius: "20px" }} />
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

