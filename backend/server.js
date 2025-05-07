import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();
// middlewares
app.use(express.json())
const allowedOrigins = [
    "https://quiet-hummingbird-0c190c.netlify.app", // admin panel
    "https://app.netlify.com" // frontend site
  ];
  
  
  app.use(cors({
    origin: function (origin, callback) {
        
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  }));
  

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, ()=> console.log('Server started on port: ' + port));