require("dotenv").config();
const express = require("express");
const app = express();

const roleRouter = require("./routers/role.router");
const permissionRouter = require("./routers/permission.router");
const rolepermissionRouter = require("./routers/role_permission.router");
const userRouter = require("./routers/user.router");
const messageRouter = require("./routers/mensagem.router");
const sellerRouter = require("./routers/vendedor.router");
const paymentRouter = require("./routers/pagamento.router");
const categoryRouter = require("./routers/categoria.router");
const productRouter = require("./routers/produto.router");
const imageRouter = require("./routers/imagem.router");
const buyRouter = require("./routers/compra.router");

app.use(express.json());

app.use("/api/roles", roleRouter);
app.use("/api/permissions", permissionRouter);
app.use("/api/roles_permissions", rolepermissionRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/images", imageRouter);
app.use("/api/shopping", buyRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("O servidor está correr na porta : ", process.env.APP_PORT);
});