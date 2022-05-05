import React from 'react';
import { Link } from "react-router-dom";

function Register (props) {

  const [state, setState] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = state;
    props.handleRegister(password, email)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="authorization">
      <h2 className="authorization__header">Регистрация</h2>
      <form className="authorization__form" name="register-form" onSubmit={handleSubmit} noValidate>
        <input className="authorization__input" type="email" minLength="2" maxLength="40" placeholder="Email" name="email" value={state.email || ''} onChange={handleChange} required/>
        <input className="authorization__input" type="password" minLength="2" maxLength="40" placeholder="Пароль" name="password" value={state.password || ''} onChange={handleChange} required/>
        <button className="authorization__submit" type="submit">Зарегистрироваться</button>
      </form>
      <div className="authorization__login-container">
        <p className="authorization__login-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="authorization__login-link">Войти</Link>
      </div>
    </section>
  )
}

export default Register;