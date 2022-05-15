import React from 'react';
import { render } from "react-dom";
import { Paint } from './modules/Paint';
import { TriviaChallenge } from "./modules/TriviaChallenge";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LiveGame } from './modules/LiveGame';

render(<LiveGame />, document.getElementById('app'));