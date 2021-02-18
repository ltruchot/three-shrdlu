import { Option, some, none } from '@effect-ts/core/Option';

export const append = (root: HTMLElement, nodes: HTMLElement[]): void => {
  nodes.forEach((node) => root.appendChild(node));
};

export const byId = (id: string): Option<HTMLElement> => {
  const el = document.getElementById(id);
  return el ? some(el) : none;
};

type StringMap = { [key: string]: string; }
type FnHtmlEl = (tag: string) => (attrs?: StringMap, children?: HTMLElement[]) => HTMLElement;
const htmlEl: FnHtmlEl = (tag) => (attrs = {}, children = []) => {
  const newTag = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => newTag.setAttribute(key, value));
  append(newTag, children);
  return newTag;
};
export const div = htmlEl('div');
export const main = htmlEl('main');
