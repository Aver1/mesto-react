import React from 'react';

function Login (props) {

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs((prev) => ({
        ...prev,
        [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
        return;
    }

    props.handleLogin(inputs.email, inputs.password)
        .catch((err) => {
          console.log(`Error: ${err}`);
        })
  }

  return (
    <section className="authorization">
      <h2 className="authorization__header">Вход</h2>
      <form className="authorization__form" name="register-form" onSubmit={handleSubmit} noValidate>
        <input className="authorization__input" type="email" minLength="2" maxLength="40" placeholder="Email" onChange={handleChange} value={inputs.email || ''} name="email" required/>
        <input className="authorization__input" type="password" minLength="2" maxLength="40" placeholder="Пароль" onChange={handleChange} value={inputs.password || ''} name="password" required/>
        <button className="authorization__submit" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;