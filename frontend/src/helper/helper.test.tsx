import { copyStringToClipboard } from './helpers';

describe('renders components: ', () => {
  const execCommand = jest.fn();
  document.execCommand = execCommand;

  test('uses jest-dom', () => {
    document.body.innerHTML = `
    `;
    copyStringToClipboard('test');
    expect(execCommand.mock.calls.length).toBe(1);
  });
});
