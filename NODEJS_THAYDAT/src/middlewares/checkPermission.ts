import User from "../models/user";
import jwt from "jsonwebtoken";
import  dotenv from 'dotenv';

dotenv.config();
export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization){
            console.log("Bạn chưa đăng nhâp");
            return res.status(401).json({
              message: "Không tồn tại authorization",
            });
        }
        const token = req.headers.authorization.split(" ")[1];

        const { _id } = jwt.verify(token, process.env.KEY);

        const user = await User.findById(_id)
        if (!user) {
            console.log("Không tồn tại người dùng này");
            return res.status(400).json({ 
                message: "Không tồn tại người dùng này"
            });
        }

        if (user.role != "admin"){
            console.log("Bạn không có quyền truy cập Admin");
            return res.status(400).json({
              message: "Bạn không có quyền truy cập Admin",
            });
        }

        next();
    } catch (error) {
        return res.status(404).json({
          message: error.message,
        });
    }
}
