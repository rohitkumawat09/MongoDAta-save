let users = [];
let currentId = 1;

export const getAll = () => users;
export const getById = (id) => users.find(u => u.id === id);
export const create = ({ name, email }) => {
  const user = { id: currentId++, name, email };
  users.push(user);
  return user;
};
export const update = (id, { name, email }) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  if (name) user.name = name;
  if (email) user.email = email;
  return user;
};
export const remove = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  return users.splice(index, 1)[0];
};
