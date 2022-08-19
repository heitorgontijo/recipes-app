import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '../pages/Login'
import userEvent from '@testing-library/user-event'
// import renderWithRouter from '../tests/helpers/renderWithRouter'

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
it('Testa se o botão redireciona para /foods', () => {
    render(<Login />)
    const input = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')

    userEvent.type(input, 'email@test.com');
    userEvent.type(password, '12345678');
    const btn = screen.getByTestId('login-submit-btn')
    expect(btn).toBeEnabled();
    // userEvent.click(btn);
    // expect()
    
})

})