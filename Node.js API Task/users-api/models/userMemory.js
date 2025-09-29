let users = [];
let id = 1;

export const getAll = () => users;

export const getById = (userId) => users.find((u) => u.id === userId);

export const create = ({ name, email }) => {
  const newUser = { id: id++, name, email };
  users.push(newUser);
  return newUser;
};

export const update = (userId, { name, email }) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  if (name) user.name = name;
  if (email) user.email = email;
  return user;
};

export const remove = (userId) => {
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;
  const deleted = users.splice(index, 1);
  return deleted[0];
};
