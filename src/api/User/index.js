import backend from '../../mockBackend';

getById.operation = 'READ';
getById.byId = true;
export function getById(id) => {
  return backend.user.getById(id);
}

getByIds.operation = 'READ';
getByIds.byIds = true;
export function getByIds(ids) => {
  return backend.user.getByIds(ids);
}

getAll.operation = 'READ';
export function getAll() {
  return backend.user.getAll();
}