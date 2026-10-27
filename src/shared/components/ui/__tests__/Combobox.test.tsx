import { useState } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Combobox } from '../Combobox'

const CITIES = ['Alfenas', 'Vargem Alegre', 'Varginha', 'São José da Varginha']

type Props = Partial<Parameters<typeof Combobox>[0]> & { initialValue?: string }

// Controlled like a form field: the value the parent holds is shown under the field.
const Harness = ({ initialValue = '', onChange, ...props }: Props) => {
  const [value, setValue] = useState(initialValue)
  return (
    <>
      <Combobox
        label='Cidade'
        options={CITIES}
        value={value}
        onChange={next => {
          setValue(next)
          onChange?.(next)
        }}
        noMatchText='Nenhuma cidade'
        resultsText={count => `${count} encontradas`}
        moreResultsText={(shown, total) => `${shown} de ${total}`}
        {...props}
      />
      <output aria-label='valor escolhido'>{value}</output>
      <button type='button'>depois</button>
    </>
  )
}

const field = () => screen.getByRole('combobox', { name: 'Cidade' })
const chosen = () =>
  screen.getByRole('status', { name: 'valor escolhido' }).textContent

describe('Combobox', () => {
  it('suggests the options that match what is typed, ignoring accents', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'sao jose')

    expect(field()).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getAllByRole('option').map(option => option.textContent)
    ).toEqual(['São José da Varginha'])
    expect(screen.getByText('1 encontradas')).toBeInTheDocument()
  })

  it('chooses with the arrows and Enter, without leaving the field', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'varg')
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    expect(field()).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Varginha' }).id
    )
    await userEvent.keyboard('{Enter}')

    expect(chosen()).toBe('Varginha')
    expect(field()).toHaveValue('Varginha')
    expect(field()).toHaveFocus()
    expect(field()).toHaveAttribute('aria-expanded', 'false')
  })

  it('does not submit the form when Enter picks an option', async () => {
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
    render(
      <form onSubmit={event => onSubmit(event.nativeEvent as SubmitEvent)}>
        <Harness />
      </form>
    )

    await userEvent.type(field(), 'alf')
    await userEvent.keyboard('{ArrowDown}{Enter}')

    expect(chosen()).toBe('Alfenas')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('chooses with a click', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'vargem')
    await userEvent.click(screen.getByRole('option', { name: 'Vargem Alegre' }))

    expect(chosen()).toBe('Vargem Alegre')
  })

  it('closes on Escape and keeps the text', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'var')
    await userEvent.keyboard('{Escape}')

    expect(field()).toHaveAttribute('aria-expanded', 'false')
    expect(field()).toHaveValue('var')
  })

  it('counts the exact name typed as chosen when the person leaves the field', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'varginha')
    await userEvent.tab()

    expect(chosen()).toBe('Varginha')
    expect(field()).toHaveValue('Varginha')
  })

  it('leaves nothing chosen when the text matches no option', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'varg')
    await userEvent.tab()

    expect(chosen()).toBe('')
    expect(field()).toHaveValue('varg')
  })

  it('drops the choice as soon as the text is edited', async () => {
    render(<Harness initialValue='Varginha' />)

    await userEvent.type(field(), '{Backspace}')

    expect(chosen()).toBe('')
  })

  it('says so when nothing matches', async () => {
    render(<Harness />)

    await userEvent.type(field(), 'xyz')

    expect(screen.getByText('Nenhuma cidade')).toBeInTheDocument()
    expect(screen.getByText('0 encontradas')).toBeInTheDocument()
  })

  it('shows only the first matches and asks to keep typing', async () => {
    render(<Harness maxResults={2} />)

    await userEvent.type(field(), 'a')

    expect(screen.getAllByRole('option')).toHaveLength(2)
    expect(screen.getByText('2 de 4')).toBeInTheDocument()
  })

  describe('disabled options', () => {
    const isOptionDisabled = (option: string) => option === 'Varginha'

    it('lists them with the reason, marked as unavailable', async () => {
      render(
        <Harness
          isOptionDisabled={isOptionDisabled}
          disabledOptionLabel='já atendida'
        />
      )

      await userEvent.type(field(), 'varg')

      const option = screen.getByRole('option', {
        name: 'Varginha já atendida',
      })
      expect(option).toHaveAttribute('aria-disabled', 'true')
    })

    it('ignores Enter, a click and the exact name typed', async () => {
      render(<Harness isOptionDisabled={isOptionDisabled} />)

      await userEvent.type(field(), 'varginha')
      await userEvent.keyboard('{ArrowDown}{Enter}')
      await userEvent.click(screen.getByRole('option', { name: 'Varginha' }))
      await userEvent.tab()

      expect(chosen()).toBe('')
    })
  })

  it('follows a value cleared from outside, as when another state is chosen', async () => {
    const Parent = () => {
      const [value, setValue] = useState('Varginha')
      return (
        <>
          <Combobox
            label='Cidade'
            options={CITIES}
            value={value}
            onChange={setValue}
            noMatchText=''
            resultsText={() => ''}
            moreResultsText={() => ''}
          />
          <button type='button' onClick={() => setValue('')}>
            limpar
          </button>
        </>
      )
    }
    render(<Parent />)

    await userEvent.click(screen.getByRole('button', { name: 'limpar' }))

    expect(field()).toHaveValue('')
  })

  it('links the hint and the error to the field', () => {
    render(<Harness hint='Escolha da lista' error='Obrigatório' />)

    expect(field()).toHaveAccessibleDescription('Escolha da lista Obrigatório')
    expect(field()).toHaveAttribute('aria-invalid', 'true')
  })
})
