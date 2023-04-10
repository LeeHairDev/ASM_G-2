import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import User from '../models/user';
import { signInSchema, signUpSchema } from '../Schemas/auth';
import  dotenv  from 'dotenv';

dotenv.config();
const SignUp = async(req,res) =>{
  try {
    const { name, email, password, cofirmPassword } = req.body;
    const { error } = signUpSchema.validate(req.body, {abortEarly: false});
    if (error){
      const errors = error.details.map(err => err.message);
      return res.status(400).json({
        message: errors,
      })
    }
    // Kiểm tra tồn tại email

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      });
    }
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = await User.create({
       name,
       email,
       password: hashedPassword,
     });
     user.password = undefined;
     const Token = jwt.sign({_id: user._id}, process.env.KEY , {expiresIn: 60 * 60})
     return res.status(201).json({
       message: "Đăng ký thành công",
       accessToken: Token,
       user,
      });
      
      
  } catch (error) {
    
  }
}

const SignIn = async (req, res) => {
  try {
    const {email, password } = req.body;
    const { error } = signInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Kiểm tra tồn tại email

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const checkPass = await bcrypt.compare(password, user.password); // compare vừa mã hóa vừa so sánh pas nhập có trùng với db không
    if (!checkPass) {
      return res.status(400).json({
        message: " Sai mật khẩu rồi"
      });
    }

    user.password = undefined;
    const Token = jwt.sign({ _id: user._id }, process.env.KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(201).json({
      message: "Đăng nhập thành công",
      accessToken: Token,
      user,
    });
  } catch (error) {}
};

export { SignUp, SignIn }




