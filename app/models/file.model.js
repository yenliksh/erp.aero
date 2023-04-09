export default (sequelize, Sequelize) => {
  const File = sequelize.define("files", {
    name: {
      type: Sequelize.STRING,
    },
    extention: {
      type: Sequelize.STRING,
    },
    mimetype: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return File;
};
