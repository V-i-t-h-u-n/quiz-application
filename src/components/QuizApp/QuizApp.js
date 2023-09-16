import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import Result from '../Result/Result';
import { Helmet } from 'react-helmet';

const QuizApp = () => {
  // quizQuestion is the question array
  const quizQuestion = [
    {
      id: 1,
      question:
        'Which of the following command is used to create react-js-app ?',
      options: {
        option1: 'npx create-react-app appname',
        option2: 'npm install create-react-app',
        option3: 'npx install create-react-app -g',
        option4: 'install - l create-react-app'
      },
      answer: 'npx create-react-app appname',
      choosedOption: ''
    },
    {
      id: 2,
      question:
        'In React.js which one of the following is used to create a class for Inheritance ?',
      options: {
        option1: 'Create',
        option2: 'Extends',
        option3: 'Inherits',
        option4: 'Delete'
      },
      answer: 'Extends',
      choosedOption: ''
    },
    {
      id: 3,
      question:
        'What is the default port number in which the application run ?',
      options: {
        option1: '3000',
        option2: '8080',
        option3: '5000',
        option4: '3030'
      },
      answer: '3000',
      choosedOption: ''
    },
    {
      id: 4,
      question:
        'Which of the following class in Bootstrap is used to provide a responsive fixed width container?',
      options: {
        option1: '.container-fixed',
        option2: '.container-fluid',
        option3: '.container',
        option4: 'All of the above'
      },
      answer: '.container',
      choosedOption: ''
    }
  ];

  const [submitStatus, setSubmitStatus] = useState(false);

  // state modification is possible in immer hook
  const [updatedArr, setUpdatedArr] = useImmer(quizQuestion);
  // const [choosedOptionArray, setChoosedOptionArray] = useState(quizQuestion);

  // useState used to keeep track the questions when next button is clicked
  const [questionNumber, setQuestionNumber] = useState(quizQuestion[0].id);

  // handler function to get previous question
  const handlePrevButton = () => {
    // setAnswerStatus('incorrect');
    if (questionNumber - 1 >= 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  // handler to validate the answer
  const handleValidateAnswer = (id, choosedOption) => {
    setUpdatedArr((draft) => {
      draft.find((i) => i.id === id).choosedOption = choosedOption;
    });
  };

  // handler function to get next question
  const handleNextButton = (buttonType) => {
    if (buttonType === 'submit') {
      setSubmitStatus(true);
    } else {
      if (questionNumber + 1 <= quizQuestion.length) {
        setQuestionNumber(questionNumber + 1);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Quiz Page</title>
      </Helmet>
      <h1>QuizApp</h1>
      <div>
        {submitStatus ? (
          <Result finalArray={updatedArr} />
        ) : (
          quizQuestion
            .filter((i) => {
              return questionNumber === i.id;
            })
            ?.map((question) => {
              return (
                <div key={question.id} className="bg-dark p-2">
                  <div
                    className="d-flex align-items-center justify-content-center "
                    style={{ height: '72vh' }}
                  >
                    <div className="card" style={{ width: '45rem' }}>
                      <div className="card-header bg-dark p-2 text-dark bg-opacity-10">
                        {questionNumber}
                        {') '}
                        {question.question}
                      </div>
                      <ul className="list-group list-group-flush">
                        <button
                          className="btn"
                          onClick={handleValidateAnswer.bind(
                            this,
                            question.id,
                            question.options.option1
                          )}
                        >
                          <li className="list-group-item ">
                            {question.options.option1}
                          </li>
                        </button>

                        <button
                          className="btn"
                          onClick={handleValidateAnswer.bind(
                            this,
                            question.id,
                            question.options.option2
                          )}
                        >
                          <li className="list-group-item ">
                            {question.options.option2}
                          </li>
                        </button>

                        <button
                          className="btn"
                          onClick={handleValidateAnswer.bind(
                            this,
                            question.id,
                            question.options.option3
                          )}
                        >
                          <li className="list-group-item ">
                            {question.options.option3}
                          </li>
                        </button>

                        <button
                          className="btn"
                          onClick={handleValidateAnswer.bind(
                            this,
                            question.id,
                            question.options.option4
                          )}
                        >
                          <li className="list-group-item ">
                            {question.options.option4}
                          </li>
                        </button>
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    {questionNumber === 1 ? (
                      ' '
                    ) : (
                      <button
                        type="button"
                        className="me-5 btn btn-secondary btn-lg"
                        onClick={handlePrevButton}
                      >
                        Previous
                      </button>
                    )}

                    {questionNumber === quizQuestion.length ? (
                      <button
                        type="button"
                        className="btn btn-danger btn-lg"
                        disabled={submitStatus}
                        onClick={handleNextButton.bind(this, 'submit')} // handleSubmit
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success btn-lg"
                        onClick={handleNextButton.bind(this, 'next')}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default QuizApp;
