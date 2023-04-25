
import React from 'react';
import SamuraiJSApp from "./App";
import {createRoot} from "react-dom/client";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SamuraiJSApp/>);
  root.unmount();
});

// import * as React from "react"
// import { render, screen } from '@testing-library/react';
// import App from './App';
// import MainApp from "./App";
//
// test('renders learn react link', () => {
//   render(<MainApp />);
//   const linkElement = screen.getByText(/learn-react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<MainApp />, div)
//   ReactDOM.un
// })