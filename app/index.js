import React from 'react';
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LiveGame } from './assignments/liveGame/LiveGame';
import { TriviaChallenge } from './assignments/Quiz/TriviaChallenge';
import { Paint } from './assignments/Paint/Paint';
import { PainterExtra } from './assignments/paint/PainterExtra';

render(<PainterExtra />, document.getElementById('app'));