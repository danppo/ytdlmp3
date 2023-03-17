import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import Header from './header';

const resetQuestions = () => {};

beforeEach(() => render(<Header resetQuestions={resetQuestions} />));

describe('renders components: ', () => {
  test('self', () => {
    const currentElement = screen.getByTestId('Header');
    expect(currentElement).toBeInTheDocument();
  });

  test('child elements ', () => {
    const menuButton = screen.getByTestId('menuButton');
    expect(menuButton).toBeInTheDocument();
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    const colorSwitcher = screen.getByTestId('colorSwitcher');
    expect(colorSwitcher).toBeInTheDocument();
  });
});
