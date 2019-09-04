import React from 'react';
import ReactDOM from 'react-dom';
import App from './InstagramApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InstagramApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
