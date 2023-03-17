import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import Title from './title';

// beforeEach(() => render(<Title />));

const titleValue = 'test title';

describe('renders components:', () => {
  test('self', () => {
    render(<Title value={titleValue} size='m' />);
    const currentElement = screen.getByTestId('title');
    expect(currentElement).toBeInTheDocument();
    expect(currentElement).toHaveTextContent(titleValue);
  });

  describe('test size param:', () => {
    test('medium ', () => {
      render(<Title value={titleValue} size='m' />);
      const currentElement = screen.getByTestId('title');
      expect(currentElement).toMatchSnapshot();
    });
    test('3xl ', () => {
      render(<Title value={titleValue} size='3xl' />);
      const currentElement = screen.getByTestId('title');
      expect(currentElement).toMatchSnapshot();
    });
  });
  describe('test bold param:', () => {
    test('normal ', () => {
      render(<Title value={titleValue} size='m' />);
      const currentElement = screen.getByTestId('title');
      expect(currentElement).toMatchSnapshot();
    });
    test('bold ', () => {
      render(<Title value={titleValue} size='m' bold />);
      const currentElement = screen.getByTestId('title');
      expect(currentElement).toMatchSnapshot();
    });
  });
});
