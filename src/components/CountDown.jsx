import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';


export default function CountDown({ initialCount, onCountDownEnd }) {

    const [ count, setCount ] = useState(initialCount || 5);

    useEffect(()=> {
        const timeOutId = setTimeout(() => {
            if (count == 1) {
                onCountDownEnd();
            } else {
                setCount(count - 1);
            }
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [count]);

    return <div className="countDownLightBox">
        <div className="countDown" key={count}>
            { count }
        </div>
    </div>;
}

CountDown.propTypes = {
    initialCount: PropTypes.number,
    onCountDownEnd: PropTypes.func,
};