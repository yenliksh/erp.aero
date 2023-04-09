import db from "../models/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const { file: File } = db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function upload(req, res) {
  try {
    let name = req.filename;
    let index = name.lastIndexOf(".");
    let extention = name.slice(index + 1);
    await File.create({
      name: `${name}`,
      extention,
      mimetype: req.file.mimetype,
      size: req.file.size,
      fileId: `${req.userId}`,
    });
    return res.status(200).send(`${req.file}`);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.toString(),
    });
  }
}

export async function list(req, res) {
  try {
    const limit = req.body.list_size || 10;
    const offset = req.body.page ? req.body.page * limit : 0;
    const files = await File.findAll({
      where: { fileId: req.userId },
      limit,
      offset,
    });
    return res.status(200).send(JSON.stringify(files));
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.toString(),
    });
  }
}

export async function getFile(req, res) {
  try {
    const id = req.params.id;
    const files = await File.findAll({
      where: { id },
    });
    return res.status(200).send(JSON.stringify(files));
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.toString(),
    });
  }
}

export async function deleteFile(req, res) {
  try {
    const id = req.params.id;
    await File.destroy({
      where: { id },
    });
    return res.status(200).send("File deleted");
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.toString(),
    });
  }
}

export async function downloadFile(req, res) {
  try {
    const id = req.params.id;
    const file = await File.findOne({
      where: { id },
    });
    res.sendFile(
      path.join(__dirname, "../uploads/") + `${file.name}`,
      { dotfiles: "deny" },
      (err) => {
        if (err) {
          res.sendStatus(404);
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.toString(),
    });
  }
}

export async function updateFile(req, res) {
  try {
    const id = req.params.id;
    let name = req.filename;
    let index = name.lastIndexOf(".");
    let extention = name.slice(index + 1);
    await File.update(
      {
        name: `${name}`,
        extention,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
      { where: { id } }
    );
    return res.status(200).send("File updated");
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.toString(),
    });
  }
}
