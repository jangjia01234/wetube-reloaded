// const express = require("express"); 최신 문법으로 바꾸면 ->
// import express from "express";
// console.log("how are u?");
// 마지막 두 줄은 아래와 같이 줄일 수 있다.
// app.listen(4000, () => console.log("Server listening on port 4000 🚀"));

import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use("logger");

///여기부터
//아래 내용은 button.addEventListener("click", handleClick);과 비슷함!

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
