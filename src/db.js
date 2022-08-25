import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // 현재 이 강의를 듣고 계신분들은 아마 mongoose 6.x 으로 설치하셨을텐데
  // useNewUrlParser, userUnifiedTopology 는 기본값이 true로
  // useFindAndModify 는 기본값이 false로 되었어서 니꼬쌤이 db.js에 적은 것들 안하셔도 됩니다.
  // useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
