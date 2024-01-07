import React from "react";
// import aboutUsImage from "../images/my-image.jpg";

function AboutUsModal({ showAboutUsModal, closeAboutUsModal }) {
  return (
    <div
      className={`modal fade ${
        showAboutUsModal ? "show d-block" : ""
      } d-flex align-items-center justify-content-center`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable customs-modal">
        <div className="modal-content customs-modal">
          <div className="modal-header">
            <h5 className="modal-title">About Us</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeAboutUsModal}
            ></button>
          </div>
          <div className="modal-body">
            {/* <img
              src={aboutUsImage}
              alt="About Us"
              style={{
                width: "50%",
                height: "200px",
                marginBottom: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            /> */}
            <h5
              style={{ color: "red", fontSize: "20px", marginBottom: "10px"  }}
            >
              Game:
            </h5>
            <p
              style={{ color: "yellow", fontSize: "16px", marginBottom: "20px" }}
            >
              This game is a maze game developed as a part of a project.
            </p>
            <h5
              style={{ color: "red", fontSize: "20px", marginBottom: "10px" }}
            >
              Developers:
            </h5>
            <p
              style={{ color: "yellow", fontSize: "16px", marginBottom: "20px" }}
            >
              Rogel Gerodiaz - Lead Developer, UI/UX Developer, and Team Lead
            </p>
            <p
              style={{ color: "yellow", fontSize: "16px", marginBottom: "20px" }}
            >
              Ace Lapan - Front End Developer
            </p>
            <p
              style={{ color: "yellow", fontSize: "16px", marginBottom: "20px" }}
            >
              Marc Angelo Arnaldo - Front End Developer
            </p>
            <p
              style={{ color: "yellow", fontSize: "16px", marginBottom: "20px" }}
            >
              John Gaylord Mantal - UI Analyst
            </p>
            <h5
              style={{ color: "red", fontSize: "20px", marginBottom: "10px" }}
            >
              Responsibilities:
            </h5>
            <p
              style={{ color: "yellow", fontSize: "16px", marginBottom: "20px" }}
            >
                As the development team, they were responsible for all aspects of
                the game, including design, development, and testing. Rogel
                Gerodiaz was the lead developer, UI/UX developer, and team lead,
                while Ace Lapan and Marc Angelo Arnaldo contributed as front-end developers.
                John Gaylord Mantal played a crucial role as the UI analyst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsModal;
