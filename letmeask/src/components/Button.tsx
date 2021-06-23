import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> //HTMLButtonElement é a tipagem do botão

export function Button(props: ButtonProps) {
  return (
    <button {...props} >{props.children}</button>
  );
}