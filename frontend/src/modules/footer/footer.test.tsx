import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import Footer from './footer';

beforeEach(() => render(<Footer />));

describe('renders components: ', () => {
  test('self', () => {
    const currentElement = screen.getByTestId('Footer');
    expect(currentElement).toBeInTheDocument();
  });

  test('child elements ', () => {
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Copyright Danppo Github');
  });
});
