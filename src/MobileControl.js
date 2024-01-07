import React from 'react';
import { CiCircleChevLeft,CiCircleChevRight, CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

const MobileControls = ({ handleMove }) => {
  return (
    <div className="mobile-controls">
      <button className="up-down-buttons" onClick={() => handleMove('ArrowUp')}><CiCircleChevUp size={70} color='blue'/></button>
      <div className="left-right-buttons">
        <button onClick={() => handleMove('ArrowLeft')} className="left-button"><CiCircleChevLeft size={70} color='blue'/></button>
        <button onClick={() => handleMove('ArrowRight')} className="right-button"><CiCircleChevRight size={70} color='blue'/></button>
      </div>
      <button className="up-down-buttons" onClick={() => handleMove('ArrowDown')}><CiCircleChevDown size={70} color='blue'/></button>
    </div>
  );
};

export default MobileControls;