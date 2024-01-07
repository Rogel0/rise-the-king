import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style/App.css";
import "./style/FloatingController.css"
import Menu from './Menu';
import backgroundMusic from './music/background.mp3';
import { IoVolumeMute } from "react-icons/io5";
import { FaVolumeUp } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { usePlayer } from "./Player";
import MobileControls from "./MobileControl";
import {
  useLevel,
  levels,
  findPlayerPosition,
  EMPTY,
  WALL,
  BOX,
  DESTINATION,
  PLAYER,
  BOX_ON_DESTINATION,
  PLAYER_ON_DESTINATION,
} from "./Level";




function App() {
  const { level, isLevelComplete, nextLevel, setIsLevelComplete, isGameEnded, setGameEnded, setCompletionMessage } = useLevel();
  const { playerPosition, movePlayer } = usePlayer(level);
  const [table, setTable] = useState(levels[level]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const audioRef = useRef();
  const [isMuted, setIsMuted] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
 


const Controls = () => {
  const handleMove = (direction) => {
    let event = new KeyboardEvent('keydown', { 'key': direction });
    handleKeyDown.current(event);
  };

  if (isMobile) {
    return <MobileControls handleMove={handleMove}/>;
  } else {
    return (
      <div>
        <p className="">Use arrow keys or w,a,s,d to move</p>
      </div>
    );
  }
};

function getCellClass(cell, i, j, level) {
  let cellClass = "";

  if (playerPosition.x === j && playerPosition.y === i) {
    cellClass = "player";
  } else {
    switch (cell) {
      case EMPTY:
        cellClass = "empty";
        break;
      case WALL:
        cellClass = "wall";
        break;
      case BOX:
        cellClass = "box";
        break;
      case DESTINATION:
        cellClass = "destination";
        break;
      case BOX_ON_DESTINATION:
        cellClass = "box-on-destination";
        break;
      case PLAYER_ON_DESTINATION:
        cellClass = "player-on-destination";
        break;
      default:
        cellClass = "";
    }
  }

  return `${cellClass} level${level}`;
}


  useEffect(() => {
    if (table !== levels[level]) {
      setTable(levels[level]);
      movePlayer(findPlayerPosition(levels[level]));
    }
  }, [level, movePlayer, table]);

  

  const moveBox = useCallback((oldX, oldY, newX, newY, prevCell, nextCell) => {
    setTable((prevTable) => {
      let newTable = [...prevTable];
      newTable[oldY][oldX] =
        prevCell === BOX_ON_DESTINATION ? DESTINATION : EMPTY;
      newTable[newY][newX] =
        nextCell === DESTINATION ? BOX_ON_DESTINATION : BOX;
      return newTable;
    });
  }, []);

  const handleKeyDown = useRef();
  handleKeyDown.current = useCallback(
    (event) => {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
      let N = levels[level][0].length;
      

      if (!isGameActive || hasWon) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          newY--;
          break;
        case "ArrowDown":
          newY++;
          break;
        case "ArrowLeft":
          newX--;
          break;
        case "ArrowRight":
          newX++;
          break;
        case "w":
          newY--;
          break;
        case "s":
          newY++;
          break;
        case "a":
          newX--;
          break;
        case "d":
          newX++;
          break;
        default:
          return;
      }

      const movePlayerTo = (newX, newY, prevCell, nextCell) => {
        movePlayer({ x: newX, y: newY });
        setTable((prevTable) => {
          let newTable = [...prevTable];
          newTable[playerPosition.y][playerPosition.x] =
            prevCell === PLAYER_ON_DESTINATION ? DESTINATION : EMPTY;
          newTable[newY][newX] =
            nextCell === DESTINATION ? PLAYER_ON_DESTINATION : PLAYER;
          return newTable;
        });
      };

      if (newX >= 0 && newX < N && newY >= 0 && newY < N) {
        let nextCell = table[newY][newX];
      
        if (
          nextCell === DESTINATION &&
          table[playerPosition.y][playerPosition.x] === BOX
        ) {
          let newTable = [...table];
          newTable[newY][newX] = BOX_ON_DESTINATION;
          setTable(newTable);
        } else if (nextCell === EMPTY || nextCell === DESTINATION) {
          let prevCell = table[playerPosition.y][playerPosition.x];
          movePlayerTo(newX, newY, prevCell, nextCell);
        } else if (nextCell === BOX || nextCell === BOX_ON_DESTINATION) {
          let boxNewX = newX + (newX - playerPosition.x);
          let boxNewY = newY + (newY - playerPosition.y);
          let boxNextCell = table[boxNewY][boxNewX];
      
          if (boxNextCell === EMPTY || boxNextCell === DESTINATION) {
            moveBox(newX, newY, boxNewX, boxNewY, nextCell, boxNextCell);
            let prevCell = table[playerPosition.y][playerPosition.x];
            movePlayerTo(newX, newY, prevCell, nextCell);
          }
        }
      }
    },
    [playerPosition, table, movePlayer, moveBox, level, isGameActive, hasWon]
  );

  useEffect(
    () => {
      const isWin = () => {
        for (let row of table) {
          for (let cell of row) {
            if (cell === BOX || cell === DESTINATION) {
              return false;
            }
          }
        }
        return true;
      };

      if (isWin()) {
        setIsLevelComplete(true);
        setHasWon(true);
      }
    },
    [table, setIsLevelComplete]
  );

  useEffect(() => {
    const handleKeyDownEvent = (event) => handleKeyDown.current(event);
    window.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, []);

  const goToNextLevel = async () => {
    if (isLevelComplete) {
      await nextLevel();
      setIsLevelComplete(false);
      setIsGameActive(true); 
      setHasWon(false);
    
      // Check if the current level is the last one
      if (level >= levels.length - 1) {
        setGameEnded(true);
        setCompletionMessage("You've completed all levels!");
      }
    }
    
  };

  const startGame = () => {
    setIsMenuOpen(false);
  };

  if (isMenuOpen) {
    return <Menu onStart={startGame} />;
  }

  // Function to restart the level
  // const restartLevel = () => {
  //   resetLevel();
  //   setIsLevelComplete(false);
  //   setHasWon(false);
  //   setTable(levels[level]);
  //   movePlayer(findPlayerPosition(levels[level]));
  // };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !audioRef.current.muted;
    if (!audioRef.current.muted && audioRef.current.paused) {
      audioRef.current.play();
    }
  };

  return (
    <div className={`App level${level}`}>
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop />
      <div className="buttons">
        <button className="customize-icon" onClick={toggleMute}>
          {isMuted ? <IoVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
        <button className="customize-icon">
         <IoSettings size={24}/>
        </button>
        <button className="customize-icon">
        <IoMdHome size={24}/>
        </button>
      </div>
      <div className="settings-button-game">
        
      </div>
      <div>
        
      </div>
      <Controls/>
      <div><p className="level-name">Level: {level + 1}</p></div>
      {table.map((row, i) => (
        <div className={`row level${level}`} key={i}>
          {row.map((cell, j) => (
            <div key={j} className={`cell level${level} ${getCellClass(cell, i, j, level)}`} />
          ))}
        </div>
      ))}
      <br></br>
      <div className="finish-level-container">
      {hasWon && !isGameEnded && <p className="finish-level">You finished Level {level + 1}</p>}
      </div>
      <div>
        {isLevelComplete && level < levels.length - 1 && (
  <button className="next-level-button" onClick={goToNextLevel}>Next Level</button>
)}
      </div>
      
      <div>
    </div>
    </div>
  );
}

export default App;
