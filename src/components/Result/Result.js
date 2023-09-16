import PropTypes from 'prop-types';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
const Result = (props) => {
  const [showScoreStatus, setScoreStatus] = useState(false);
  // useState that used to count score
  const [score, setScore] = useState(0);
  const updatedArr = props.finalArray;
  let sum = 0;

  const handleShowScore = () => {
    setScoreStatus(!showScoreStatus);
    updatedArr?.map((item) => {
      if (item.answer === item.choosedOption) {
        sum += 5;
        setScore(sum);
      }
      return '';
    });
  };
  return (
    <>
      <Helmet>
        <title>Result Page</title>
      </Helmet>
      <div className="row m-5"></div>
      <div className="container p-5 bg-dark">
        {showScoreStatus && (
          <h3 className="text-light p-2">Your Score {score}</h3>
        )}
        <div className="row row-cols-2">
          {props.finalArray?.map((item) => {
            return (
              <div key={item.id} className="col">
                {item.answer === item.choosedOption ? (
                  <div
                    className="card text-white bg-success mb-3"
                    style={{ maxWidth: '30rem' }}
                  >
                    <div className="card-header">Correct Answer ✅</div>
                    <div className="card-body">
                      <h5 className="card-title">Selected Option</h5>
                      <p className="card-text">
                        {item.choosedOption === ''
                          ? 'No option selected'
                          : item.choosedOption}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="card text-white bg-danger mb-3"
                    style={{ maxWidth: '30rem' }}
                  >
                    <div className="card-header">Wrong Answer ❌</div>

                    <div className="card-body">
                      <h5 className="card-title">Selected Option</h5>
                      <p className="card-text">
                        {item.choosedOption === ''
                          ? 'No option selected'
                          : item.choosedOption}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button className="btn btn-primary" onClick={handleShowScore}>
          Show Score
        </button>
      </div>
    </>
  );
};

Result.propTypes = {
  finalArray: PropTypes.array,
  Link: PropTypes.string
};

export default Result;
