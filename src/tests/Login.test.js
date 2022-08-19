import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '../pages/Login'

describe('Testa componente Login', () => {
it('Testa se input de e-mail está sendo renderizado', () => {
    render(<Login />)
    const input = screen.getByTestId('email-input')
    expect(input).toBeInTheDocument()

})
it('Testa se input de password está sendo renderizado', () => {
    render(<Login />)
    const password = screen.getByTestId('password-input')
    expect(password).toBeInTheDocument()

})
it('Testa se o botão está sendo renderizado', () => {
    render(<Login />)
    const login = screen.getByTestId('login-submit-btn')
    expect(login).toBeInTheDocument()
})

})