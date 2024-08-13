import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import OneZone from './OneZone';
const FindZone = ({ setZone }) => {
    const client = axios.default;
    const [length, setLength] = useState(10);
    const [lastTop, setLastTop] = useState(0);
    const [zones, setZones] = useState(null);
    const ref = useRef(null);

    const scroll = () => {
        const container = ref.current;

        const { scrollTop, scrollHeight, clientHeight } = container;

        if (Math.abs(scrollTop - lastTop) < 5 && (scrollTop + clientHeight >= scrollHeight - 10)) {
            setLength(length + 6);
        }
        setLastTop(scrollTop);
    }

    useEffect(() => {
        client.get('http://localhost:7001/api/getZones')
            .then((response) => {
                setZones(response.data);
            })
    }, []);

    return (
        <>
            {zones?.length > 0 && <div className="flex flex-col px-80 py-5 max-h-[790px]  overflow-y-auto items-center space-y-10" ref={ref} onScroll={scroll}>
                {Array.from({ length: Math.min(length, zones.length) }, (_, index) => (
                    <div key={index} className="flex flex-shrink-0 bg-gray-300 h-[100px] w-full items-center">
                        <OneZone zone={zones[index]} setZone={setZone} />
                    </div>
                ))}

                <div className="flex justify-center">
                    {zones && length > zones.length && <p>—— 到此为止了 ——</p>}
                </div>
            </div>}

            <div className="flex items-center justify-center w-full">
                {zones?.length == 0 && <p>暂无分区 ˉ▽ˉ</p>}
            </div>
        </>
    );
};

export default FindZone;