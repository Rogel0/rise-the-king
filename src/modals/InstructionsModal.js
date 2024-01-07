import React from 'react';
import boxImage from "../images/box.png";
import castleImage from "../images/castle.png";
import wallImage from "../images/wall.png";
import kingImage from "../images/player.png";

function InstructionsModal({ showInstructionsModal, closeInstructionsModal }) {
  return (
    <div
      className={`modal fade ${showInstructionsModal ? "show d-block" : ""}`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-scrollable customs-modal">
        <div className="modal-content customs-modal">
          <div className="modal-header">
            <h5 className="modal-title ">Instructions</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeInstructionsModal}
            ></button>
          </div>
          <div className="modal-body">
            <h5>Game Objects:</h5>
            <ul>
              <li>
                <img src={boxImage} className="object-image" alt="Box" />
                <p className="object-p" style={{color: "yellow"}}>
                  <strong style={{color: "red"}}>Box</strong >- The box is an important game object
                  that you can interact with. It can be used to solve puzzles.
                  Use your wits to strategically move and utilize the boxes to
                  progress through the maze and overcome challenges.
                </p>
              </li>
              <li>
                <img
                  src={castleImage}
                  className="object-image"
                  alt="Castle"
                />
                <p className="object-p" style={{color: "yellow"}}>
                  <strong style={{color: "red"}}>Castle</strong> - The castle is your ultimate
                  destination in the game. It represents the goal that you
                  need to reach in order to complete the maze and win the
                  game. Overcome challenges, solve puzzles, and navigate
                  through the maze to reach the majestic castle and claim
                  victory!
                </p>
              </li>
              <li>
                <img src={wallImage} className="object-image" alt="Wall" />
                <p className="object-p" style={{color: "yellow"}}>
                  <strong style={{color: "red"}}>Wall</strong> - The wall is an obstacle that blocks
                  your path in the maze. You cannot pass through it, so you'll
                  need to find alternative routes to navigate around the walls
                  and reach your destination.
                </p>
              </li>
              <li>
                <img src={kingImage} className="object-image" alt="King" />
                <p className="object-p" style={{color: "yellow"}}>
                  <strong style={{color: "red"}}>King</strong> - The king is a powerful character in
                  the game. As the protagonist, you control the king and guide
                  them through the maze. Use the king's abilities and skills
                  to overcome obstacles, solve puzzles, and reach the ultimate
                  goal of the game - the majestic castle.
                </p>
              </li>
             
            </ul>

            <h5>Controllers:</h5>
            <ul>
              <li>
                <p style={{color: "yellow"}}>
                  <strong style={{color: "red"}}>Controller</strong> - The controller allows you to
                  navigate through the maze and control the king's movements.
                  On desktop, you can use the <strong>w, a, s, d</strong> keys
                  or the arrow keys to move the king in different directions.
                  On mobile, you can use the floating controller to control
                  the king's movements.
                </p>
              </li>
              
            </ul>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default InstructionsModal;