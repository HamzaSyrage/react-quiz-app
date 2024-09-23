import TROPHY from "../assets/quiz-complete.png";
import QUESTION_ARRAY from "../questions";
export default function Summary({ userAnswers }) {
  const correctNum = userAnswers.reduce((a, b) => {
    if (b !== null && b.status === "correct") {
      return a + 1;
    } else return a;
  }, 0);
  const wrongNum = userAnswers.reduce((a, b) => {
    if (b !== null && b.status === "wrong") {
      return a + 1;
    } else return a;
  }, 0);
  const skippedNum = userAnswers.reduce((a, b) => {
    if (!b) {
      return a + 1;
    } else return a;
  }, 0);
  return (
    <>
      <div id="summary">
        <img src={TROPHY} alt="trophy img" />
        <h2>Quiz End</h2>
        <div id="summary-stats">
          <span>
            <div className="number user-answer correct">
              {" "}
              {((correctNum / userAnswers.length) * 100).toFixed(0)}%
            </div>
            <div className="text user-answer correct">correct number</div>
          </span>
          <span>
            <div className="number user-answer wrong">
              {" "}
              {((wrongNum / userAnswers.length) * 100).toFixed(0)}%
            </div>
            <div className="text user-answer wrong">wrong number</div>
          </span>
          <span>
            <div className="number user-answer skipped">
              {" "}
              {((skippedNum / userAnswers.length) * 100).toFixed(0)}%
            </div>
            <div className="text user-answer skipped">skipped number</div>
          </span>
        </div>
        <div id="question">
          <ol>
            {userAnswers.map((question, questionIndex) => (
              <li key={questionIndex}>
                <div>
                  <h3>{questionIndex + 1}</h3>
                  <ul id="answers">
                    <div
                      id="question-overviews"
                      className={
                        question && question.status
                          ? `user-answer ${question.status}`
                          : "user-answer skipped"
                      }
                    >
                      {question && question.status
                        ? question.status
                        : " skipped"}
                    </div>
                    <h2 className="question">
                      {QUESTION_ARRAY[questionIndex].text}
                    </h2>
                    {question !== null &&
                      question.answersArray.map((answers) => (
                        <li key={answers} className="answer finished">
                          <button
                            className={
                              answers === question.ans
                                ? `user-answer  ${question.status}`
                                : ""
                            }
                            disabled
                          >
                            {answers}
                          </button>
                        </li>
                      ))}
                    {!question &&
                      QUESTION_ARRAY[questionIndex].answers.map((e) => (
                        <li key={e} className="answer finished">
                          <button className={"skipped"} disabled>
                            {e}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
