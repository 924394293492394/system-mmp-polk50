const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role, position, office } = req.body;

    if (!username || !password || !role || !position || !office) {
      return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const validRoles = ['сотрудник', 'бригадир', 'начальник', 'администратор'];
    const validOffices = [50, 57];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Недопустимая роль' });
    }

    if (!validOffices.includes(Number(office))) {
      return res.status(400).json({ message: 'Офис должен быть 50 или 57' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role,
      position,
      office: Number(office)
    });

    await user.save();
    res.status(201).json({ message: 'Регистрация прошла успешно' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Неверный пароль' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
};
 