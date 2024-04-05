import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import cherry from "../assets/img/cherry.png";
import dog from "../assets/img/dog.png";
import dolphin from "../assets/img/dolphin.png";
import fire from "../assets/img/fire.png";
import globe from "../assets/img/globe.png";
import hat from "../assets/img/hat.png";
import lock from "../assets/img/lock.png";
import party from "../assets/img/party.png";
import piano from "../assets/img/piano.png";
import pizza from "../assets/img/pizza.png";
import sunflower from "../assets/img/sunflower.png";
import umbrella from "../assets/img/umbrella.png";
import back from "../assets/img/Back.png";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import swing from "../assets/audio/swing.mp3";
import correctGuess from "../assets/audio/correct.mp3";
import wrongGuess from "../assets/audio/wrong.mp3";

const Tab = () => {
  const [firstArray, setFirstArray] = useState(null);

  const [correct, setCorrect] = useState([]);

  const audioRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const handleClose = () => setShow(false);

  const [score, setScore] = useState({ red: 0, blue: 0 });

  const [userToPlayNext, setUserToPlayNext] = useState(false);

  const [clicked, setClicked] = useState([]);

  const [winner, setWinner] = useState("");

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const loadArrayN1 = () => {
    const finalArray = [];
    const arrayOfSrcs = [
      cherry,
      dog,
      dolphin,
      fire,
      globe,
      hat,
      lock,
      party,
      piano,
      pizza,
      sunflower,
      umbrella,
      cherry,
      dog,
      dolphin,
      fire,
      globe,
      hat,
      lock,
      party,
      piano,
      pizza,
      sunflower,
      umbrella,
    ];

    // shuffle dell'array
    const shuffledArray = shuffleArray(arrayOfSrcs);

    for (let i = 0; i < shuffledArray.length; i++) {
      finalArray.push({
        name: shuffledArray[i].slice(16, -4),
        url: shuffledArray[i],
        id: i,
      });
    }

    setFirstArray(finalArray);
  };

  const evaluateClick = (item) => {
    let tempArray = [];

    if (
      correct.includes(item.name) ||
      clicked.some((card) => card.id === item.id)
    ) {
      console.log("Already clicked");
      wrongRef.current.play();
    } else {
      if (clicked.length <= 0) {
        tempArray.push(item);
        setClicked(tempArray);
      }
      if (clicked.length === 1) {
        tempArray.push(...clicked, item);

        setClicked(tempArray);
      }

      if (tempArray.length === 2) {
        if (tempArray[0].name === tempArray[1].name) {
          setCorrect([...correct, item.name]);
          correctRef.current.play();
          if (!userToPlayNext) {
            setScore({ ...score, red: score.red + 1 });
          } else {
            setScore({ ...score, blue: score.blue + 1 });
          }
          tempArray = [];
          setTimeout(() => {
            setClicked(tempArray);
          }, 1000);
        } else {
          tempArray = [];
          wrongRef.current.play();
          setTimeout(() => {
            setClicked(tempArray);
            audioRef.current.play();
            setUserToPlayNext(!userToPlayNext);
          }, 1000);
        }
      }
    }
    audioRef.current.play();
  };

  const checkEndgame = () => {
    if (correct.length > 0) {
      if (correct.length === 12) {
        if (score.blue > score.red) {
          setWinner("Blue");
          setShowWinner(true);
        } else if (score.blue < score.red) {
          setWinner("Red");
          setShowWinner(true);
        } else if (score.blue === score.red) {
          setWinner("Draw");
          setShowWinner(true);
        }
      }
    }
  };

  const setBGCard = (item) => {
    const clickedIds = clicked.map((click) => click.id);
    const correctIds = correct.map((correct) => correct);
    if (clickedIds.includes(item.id)) {
      return item.url;
    } else if (correctIds.includes(item.name)) {
      return item.url;
    } else {
      return back;
    }
  };
  useEffect(() => {
    if (!firstArray) {
      loadArrayN1();
    }
    checkEndgame();
  }, [correct, clicked]);

  useEffect(() => {
    audioRef.current = new Audio(swing);
    correctRef.current = new Audio(correctGuess);
    wrongRef.current = new Audio(wrongGuess);
  }, []);

  return (
    <Container fluid className="p-0">
      {showWinner && (
        <Confetti width={1000} numberOfPieces={200} tweenDuration={2000} />
      )}

      <Row
        className={`flex-column align-items-center py-5 pt-2 pt-md-5 justify-content-center ${
          !userToPlayNext ? "redtoblue" : "bluetored"
        }`}
      >
        <div>
          <h1 className="text-center text-white mb-4">Memory Game!</h1>
        </div>
        {firstArray && (
          <div className="d-flex flex-wrap justify-content-around  rounded-4 board-game">
            {firstArray.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`d-flex align-items-center mb-3 pointer card-wrapper`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => {
                    evaluateClick(item, i);
                  }}
                >
                  <img src={setBGCard(item, item.id)} className="card-img" />
                </div>
              );
            })}
          </div>
        )}
      </Row>
      <Row style={{ backgroundColor: "#FFFFFF" }} className="mt-4">
        <Col className="score-tab pb-5">
          <div className="text-center">
            <h1>Score</h1>
            <div className="d-flex justify-content-center">
              <h4>Red: {score.red}</h4>
              <h4 className="mx-5">|</h4>
              <h4>Blue: {score.blue}</h4>
            </div>
          </div>
          <div className="text-center mt-5">
            <Button
              className="shadow-btm rounded-4"
              onClick={() => {
                setShow(true);
              }}
            >
              Restart
            </Button>
          </div>
        </Col>
      </Row>
      {/* WARNING MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to restart the game?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary rounded-4 shadow-btm"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            variant="danger rounded-4 shadow-btm"
            onClick={() => {
              window.location.reload();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* WARNING MODAL */}
      {/* WINNER MODAL */}
      <Modal
        show={showWinner}
        onHide={() => {
          setShowWinner(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Woooooooooo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {winner === "Draw"
            ? "We have a draw here!"
            : `And the winner is... ${winner}`}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger rounded-4 shadow-btm"
            onClick={() => {
              window.location.reload();
            }}
          >
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
      {/* WINNER MODAL */}
    </Container>
  );
};

export { Tab };
