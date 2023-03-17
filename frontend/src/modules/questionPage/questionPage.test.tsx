import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import QuestionPage from './questionPage';
import { notDeepStrictEqual } from 'assert';

beforeEach(() => render(<QuestionPage />));

const startGame = () => {
  const nextQuestionButton = screen.getByTestId('nextQuestion');
  fireEvent.click(nextQuestionButton);
};

describe('renders components: ', () => {
  test('self', () => {
    const currentElement = screen.getByTestId('QuestionPage');
    expect(currentElement).toBeInTheDocument();
  });

  test('child elements ', () => {
    const headerElement = screen.getByTestId('Header');
    expect(headerElement).toBeInTheDocument();
    const questionElement = screen.getByTestId('Questions');
    expect(questionElement).toBeInTheDocument();
    const footerElement = screen.getByTestId('Footer');
    expect(footerElement).toBeInTheDocument();
  });
});

describe('test state intergration: ', () => {
  describe('reset: ', () => {
    test('dont unless started', () => {
      const resetButton = screen.getByTestId('menuButton-reset');
      const menuButton = screen.getByTestId('menuButton');
      fireEvent.click(menuButton);

      const QuestionCardContent = screen.getByTestId('questionCardContent');

      fireEvent.click(resetButton);

      expect(QuestionCardContent).toHaveTextContent('Press the button for the first question');
    });

    test('game started', () => {
      const resetButton = screen.getByTestId('menuButton-reset');
      const menuButton = screen.getByTestId('menuButton');
      startGame();

      const QuestionCardContent = screen.getByTestId('questionCardContent');
      expect(QuestionCardContent).not.toHaveTextContent(
        'The questions and filters have been reset'
      );
      expect(QuestionCardContent).not.toHaveTextContent('Press the button for the first question');

      fireEvent.click(menuButton);
      fireEvent.click(resetButton);

      expect(QuestionCardContent).toHaveTextContent('The questions and filters have been reset');
    });
  });

  describe('skip: ', () => {
    test('skip', () => {
      startGame();

      const skipButton = screen.getByTestId('skipButton');
      fireEvent.click(skipButton);

      const historyButton = screen.getByTestId('historyButton');
      fireEvent.click(historyButton);

      const questionCards = screen.getAllByTestId('historyQuestionCard');
      expect(questionCards).toHaveLength(1);

      const qCardText = screen.getAllByTestId('questionCardContent');

      const qCardAnswerNow = screen.getAllByTestId('answeredNow');
      expect(qCardText[0]).toHaveStyle('color: var(--chakra-colors-red-400)');
      fireEvent.click(qCardAnswerNow[0]);
      expect(qCardText[0]).toHaveStyle('color: var(--chakra-colors-chakra-body-text)');
    });
  });

  describe('clipboard: ', () => {
    test('skip', () => {
      const mockExecCommand = jest.fn();
      Object.defineProperty(global.document, 'execCommand', { value: mockExecCommand });

      startGame();

      const clipboard = screen.getByTestId('clipboard');

      fireEvent.click(clipboard);
      const toast = screen.getByText('Copied to clipboard.');
      expect(toast).toBeTruthy();
      expect(mockExecCommand).toBeCalled();
    });
  });

  describe('filter: ', () => {
    test('deselect current Category', () => {
      startGame();

      const catBadge = screen.getByTestId('catBadge');

      const filterButton = screen.getByTestId('FilterButton');
      fireEvent.click(filterButton);

      const catCheckbox = screen.getAllByTestId('catCheckbox');
      let catOfQuestion;

      catCheckbox.forEach((i) => {
        if (i.textContent === catBadge.textContent) {
          catOfQuestion = i.textContent;
          fireEvent.click(i);
          console.log(i.childNodes);
        }
      });

      const catClose = screen.getByTestId('catClose');
      fireEvent.click(catClose);

      expect(catBadge.textContent).not.toBe(catOfQuestion);
    });

    test('deselect current Category', () => {
      startGame();

      const filterButton = screen.getByTestId('FilterButton');
      fireEvent.click(filterButton);

      const catCheckbox = screen.getAllByTestId('catCheckbox');

      catCheckbox.forEach((i) => {
        fireEvent.click(i);
        expect(i).not.toHaveAttribute('data-checked');
      });

      const catClose = screen.getByTestId('catClose');
      expect(catClose).toBeDisabled();
      const noCatsWarning = screen.getByTestId('noCats');
      expect(noCatsWarning).toHaveTextContent('One category must be selected');

      const selectAll = screen.getByTestId('selectAll');
      fireEvent.click(selectAll);
      fireEvent.click(filterButton);

      expect(catClose).not.toBeDisabled();
      catCheckbox.forEach((i) => {
        expect(i).toHaveAttribute('data-checked');
      });
    });

    test('run out of questions', () => {
      startGame();

      const filterButton = screen.getByTestId('FilterButton');
      fireEvent.click(filterButton);

      const catCheckbox = screen.getAllByTestId('catCheckbox');

      catCheckbox.forEach((i) => {
        fireEvent.click(i);
        expect(i).not.toHaveAttribute('data-checked');
      });

      const catClose = screen.getByTestId('catClose');
      expect(catClose).toBeDisabled();
      const noCatsWarning = screen.getByTestId('noCats');
      expect(noCatsWarning).toHaveTextContent('One category must be selected');

      const selectAll = screen.getByTestId('selectAll');
      fireEvent.click(selectAll);
      fireEvent.click(filterButton);

      expect(catClose).not.toBeDisabled();
      catCheckbox.forEach((i) => {
        expect(i).toHaveAttribute('data-checked');
      });
    });
  });
});
