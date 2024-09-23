import { useRef, useState } from "react";
import QUESTION_ARRAY from "../questions";
import QuizTimer from "./QuizTimer";
import Summary from "./Summary";

export default function Quiz() {
  const answers = useRef();
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const activeQuiz =
    selectedAnswer !== "" && userAnswers.length > 0
      ? userAnswers.length - 1
      : userAnswers.length;
  function handleSkip() {
    setUserAnswers((prev) => [...prev, null]);
  }

  if (userAnswers.length === QUESTION_ARRAY.length) {
    return <Summary key={userAnswers} userAnswers={userAnswers} />;
  }

  if (!answers.current) {
    answers.current = [...QUESTION_ARRAY[activeQuiz].answers.map((e) => e)];
    answers.current.sort((a, b) => Math.random() - 0.5);
  }

  function handleSelect(e) {
    setSelectedAnswer("selected");
    setUserAnswers((prev) => {
      const status =
        e === QUESTION_ARRAY[activeQuiz].answers[0] ? "correct" : "wrong";
      return [...prev, { ans: e, answersArray: answers.current, status }];
    });
    setTimeout(() => {
      if (e === QUESTION_ARRAY[activeQuiz].answers[0]) {
        setSelectedAnswer("correct");
      } else {
        setSelectedAnswer("wrong");
      }
    }, 0.5 * 1000);
    setTimeout(() => {
      setSelectedAnswer("");
      answers.current = undefined;
    }, 1 * 1000);
  }
  return (
    <div id="quiz">
      <div id="question">
        <QuizTimer
          key={activeQuiz}
          val={10 * 1000}
          status={selectedAnswer}
          oneTimeEnd={handleSkip}
        />
        <h2>{QUESTION_ARRAY[activeQuiz].text}</h2>
        <ul id="answers">
          {answers.current.map((e) => {
            let classes = "";
            let compare =
              userAnswers.length > activeQuiz
                ? userAnswers[activeQuiz].ans
                : "";

            if (e === compare) {
              classes = selectedAnswer;
            }
            return (
              <li key={e} className="answer">
                <button
                  className={classes}
                  onClick={() => handleSelect(e)}
                  disabled={selectedAnswer}
                >
                  {e}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
