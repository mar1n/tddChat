import { render, screen } from '@testing-library/react';
import App from '../components/App/App';
import { MemoryRouter } from "react-router-dom";

test('renders learn react link', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const element = screen.getByText(/Hello React/i);
  expect(element).toBeInTheDocument();
});
