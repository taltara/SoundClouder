import React from 'react';

const LoadingRing = (props) => {

    const { theme } = props;
    return (
        <div className={`loading-ring loading-${theme}`} >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
    )
}

export default LoadingRing;
