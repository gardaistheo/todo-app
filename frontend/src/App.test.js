import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  fetch.resetMocks();
});

test('affiche le titre de la page', async () => {
  fetch.mockResponseOnce(JSON.stringify([]));
  render(<App />);
  expect(screen.getByText('Ma Todo List')).toBeInTheDocument();
});
