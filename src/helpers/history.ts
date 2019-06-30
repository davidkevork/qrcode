import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function redirect(to: string) {
  history.push(to);
}
