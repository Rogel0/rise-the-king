import React, { useRef, useState } from "react";
import "./style/Menu.css";
import backgroundMusic from "./music/background.mp3";
import { IoVolumeMute } from "react-icons/io5";
import { FaVolumeUp } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import InstructionsModal from "./modals/InstructionsModal";
import AboutUsModal from "./modals/AboutUsModal";

function Menu({ onStart }) {
  const audioRef = useRef();
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !audioRef.current.muted;
    if (!audioRef.current.muted && audioRef.current.paused) {
      audioRef.current.play();
    }
  };

  const openAboutUsModal = () => {
    setShowAboutUsModal(true);
  };

  const closeAboutUsModal = () => {
    setShowAboutUsModal(false);
  };

  const openInstructionsModal = () => {
    setShowInstructionsModal(true);
  };

  const closeInstructionsModal = () => {
    setShowInstructionsModal(false);
  };

  const startGame = () => {
    setIsLoading(true);
    setShowModal(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    setTimeout(onStart, 2000);
  };

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div className="menu">
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop />
      <div className="mute-button-game">
        <button className="customize-icon" onClick={toggleMute}>
          {isMuted ? <IoVolumeMute size={30} /> : <FaVolumeUp size={24} />}
        </button>
        <button className="customize-icon">
          <IoSettings size={24} />
        </button>
      </div>
      <div className="settings-button-game"></div>
      <h1 className="welcome-text">
        Welcome to the <br></br> Rise The King
      </h1>
      <button className="btnStartGame" onClick={startGame}>
        Start Game
      </button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="centered-modal "
      >
        <Modal.Body style={override}>
          {isLoading ? (
            <ClipLoader color="#000" loading={isLoading} size={150} />
          ) : (
            "The game has loaded"
          )}
        </Modal.Body>
      </Modal>
      <button onClick={openInstructionsModal} className="btnInstructions">
        Instructions
      </button>
      <InstructionsModal
        showInstructionsModal={showInstructionsModal}
        closeInstructionsModal={closeInstructionsModal}
      />
      <button onClick={openAboutUsModal} className="btnInstructions">
        About Us
      </button>
      {showAboutUsModal && (
        <AboutUsModal
          showAboutUsModal={showAboutUsModal}
          closeAboutUsModal={closeAboutUsModal}
        />
      )}
    </div>
  );
}

export default Menu;
