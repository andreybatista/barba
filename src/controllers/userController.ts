import { Request, Response } from 'express';
import { connection } from '../db';
import { User, UserRow } from '../models/User';

export const createUser = (req: Request, res: Response): void => {
  const { name, email, password } = req.body;

  const user: User = { name, email, password };

  connection.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const newUser: User = { id: result.insertId, ...user };

    res.status(201).json(newUser);
  });
};

export const getAllUsers = (req: Request, res: Response): void => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const users: User[] = results.map((row: UserRow) => {
      const { id, name, email, password } = row;
      return { id, name, email, password };
    });

    res.json(users);
  });
};

export const getUserById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);

  connection.query('SELECT * FROM users WHERE id = ?', id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const row: UserRow = results[0];
    const user: User = { id: row.id, name: row.name, email: row.email, password: row.password };

    res.json(user);
  });
};
