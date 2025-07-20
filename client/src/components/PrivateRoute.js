import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuth(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/auth/verify', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    setIsAuth(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuth(false);
                }
            } catch (err) {
                console.error('Ошибка при проверке токена:', err);
                localStorage.removeItem('token');
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (loading) return <div>Проверка авторизации...</div>;

    return isAuth ? children : <Navigate to="/login" />;
}