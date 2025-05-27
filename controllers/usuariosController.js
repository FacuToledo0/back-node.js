const fs = require('fs').promises;
const path = './data/usuarios.json';

const getAll = async (req, res) => {
    const data = await fs.readFile(path, 'utf-8');
    res.json(JSON.parse(data));
};

const create = async (req, res) => {
    const data = JSON.parse(await fs.readFile(path, 'utf-8'));
    const nuevo = { id: Date.now().toString(), ...req.body };
    data.push(nuevo);
    await fs.writeFile(path, JSON.stringify(data, null, 2));
    res.json(nuevo);
};

const update = async (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(await fs.readFile(path, 'utf-8'));
    const index = data.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ msg: 'No encontrado' });
    data[index] = { ...data[index], ...req.body };
    await fs.writeFile(path, JSON.stringify(data, null, 2));
    res.json(data[index]);
};

const remove = async (req, res) => {
    const { id } = req.params;
    let data = JSON.parse(await fs.readFile(path, 'utf-8'));
    data = data.filter(u => u.id !== id);
    await fs.writeFile(path, JSON.stringify(data, null, 2));
    res.json({ msg: 'Eliminado' });
};
    
module.exports = { getAll, create, update, remove };
