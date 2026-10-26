import { useState } from 'react'

import { UI_CONTENT } from '@shared/data/uiContent'

import { EyeIcon, EyeOffIcon } from './icons'
import { TextField, type TextFieldProps } from './TextField'

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'endAdornment'>

export const PasswordField = (props: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={isVisible ? 'text' : 'password'}
      endAdornment={
        // A real button with a fixed name and aria-pressed: the screen reader says
        // "Mostrar senha, botão, pressionado / não pressionado".
        <button
          type='button'
          aria-pressed={isVisible}
          aria-label={UI_CONTENT.showPassword}
          onClick={() => setIsVisible(visible => !visible)}
          className='flex h-12 w-12 items-center justify-center rounded-lg text-slate-600 hover:text-slate-900'
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  )
}
