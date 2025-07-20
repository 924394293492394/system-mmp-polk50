import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth/Register.css';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        role: 'сотрудник',
        position: '',
        office: ''
    });

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
        <div className="register-page">
            <div className="register-container">
                <h2>Регистрация</h2>
                <form onSubmit={handleRegister}>

                    <input className="form-group"
                        type="text"
                        name="username"
                        placeholder="Логин"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input className="form-group"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-group"
                        type="text"
                        name="position"
                        placeholder="Должность"
                        value={form.position}
                        onChange={handleChange}
                        required
                    />

                    <div className="form-group">
                        <select name="office" value={form.office} onChange={handleChange} required>
                            <option value="">Выберите офис</option>
                            <option value="50">50</option>
                            <option value="57">57</option>
                        </select>

                        <select name="role" value={form.role} onChange={handleChange}>
                            <option value="сотрудник">Сотрудник</option>
                            <option value="бригадир">Бригадир</option>
                            <option value="начальник">Начальник</option>
                            <option value="администратор">Администратор</option>
                        </select>
                    </div>

                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}