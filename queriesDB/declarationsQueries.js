exports.selectAllQuery = "SELECT * FROM surveys";
exports.findUser = "SELECT * FROM persons WHERE (surname = ?) AND (name = ?) AND (educationGroup = ?)";
exports.createUser ="INSERT INTO persons VALUES (?, ?, ?, ?, ?, ?)";
exports.pasteSurvey = "INSERT INTO surveys VALUES (?, ?, ?)";
exports.getSurveys = "SELECT * FROM surveys";
exports.pasteAnswers = "INSERT INTO answers VALUES (?, ?, ?, ?)";
exports.findUserAnswers = "SELECT * FROM answers WHERE (educationGroup = ?) AND (name = ?) AND (surname = ?)";
exports.deleteUsersAnswers = "DELETE FROM answers WHERE (educationGroup = ?) AND (name = ?) AND (surname = ?)";
exports.getAnswers = "SELECT * FROM answers";
