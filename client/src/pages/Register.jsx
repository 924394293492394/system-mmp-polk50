import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'сотрудник' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert('Регистрация успешна, войдите');
      navigate('/login');
    } else {
      alert(data.message || 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Регистрация</h2>
      <input type="text" name="username" placeholder="Логин" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="сотрудник">Сотрудник</option>
        <option value="бригадир">Бригадир</option>
        <option value="начальник">Начальник</option>
        <option value="администратор">Администратор</option>
      </select>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}