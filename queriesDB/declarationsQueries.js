exports.selectAllQuery = "SELECT * FROM surveys";
exports.findUser = "SELECT * FROM persons WHERE (surname = ?) AND (name = ?) AND (educationGroup = ?)";
exports.createUser ="INSERT INTO persons VALUES (?, ?, ?, ?, ?, ?)";
//exports.pasteAnswers = "INSERT INTO";
exports.pasteSurvey = "INSERT INTO surveys VALUES (?, ?, ?)";
exports.getSurveys = "SELECT * FROM surveys";
