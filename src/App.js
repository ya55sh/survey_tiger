import logo from './survey_tiger_logo.png';
import './App.css';
import {Button} from 'reactstrap';
import {Switch, Route, Link, useHistory} from 'react-router-dom';
import CreateSurvey from './components/createSurvey';
import TakeSurvey from './components/takeSurvey';
import ConfirmSurvey from './components/confirmSurvey';
import {useDispatch} from 'react-redux';
import {createSurvey} from './store/surveySlice';
import {unwrapResult} from '@reduxjs/toolkit';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectToNewSurvey = () => {
    // dispatch the action for creating a new survey
    // console.log("action", surveySlice.actions.createSurvey({random: 32}));

    dispatch(createSurvey())
      .then(unwrapResult)
      .then((newSurveyId) => history.push('/create/' + newSurveyId));

    // equivalent to below line
    // dispatch({ type: 'surveys/crateSurvey', payload: })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/create/:surveyId">
          <CreateSurvey />
        </Route>
        <Route path="/confirm/:surveyId">
          <ConfirmSurvey />
        </Route>
        <Route path="/take">
          <TakeSurvey />
        </Route>
        <Route path="/">
          <Button className="survey-page-btn " onClick={redirectToNewSurvey}>
            Create Survey
          </Button>
          <Link to="/take">
            <Button className="survey-page-btn ">Take Survey</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
