import { div, main } from '../helpers/dom';

const indexView = main({ class: 'flex' }, [
  div({ class: 'w-1/2', id: 'shell' }), div({ class: 'w-1/2', id: 'scene' }),
]);

export default indexView;
