const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(require('../knexfile')[environment]);

exports.getAll = () => knex('posts').orderBy('created_at', 'desc');
exports.getById = (id) => knex('posts').where({ id }).first();
exports.create = (post) => knex('posts').insert(post);
exports.update = (id, post) => knex('posts').where({ id }).update(post);
exports.delete = (id) => knex('posts').where({ id }).del();
exports.getLatest = (limit) => knex('posts').orderBy('created_at', 'desc').limit(limit);
