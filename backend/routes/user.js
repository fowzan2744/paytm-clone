const express = require('express');
const router = express.Router();

const { User , Account} = require("../db");

const zod = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const  { authMiddleware } = require("../middleware");


const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post('/signup', async (req, res) => { 
  const body = req.body;
  const {success}= signupSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  const existingUser = await User.findOne({ email: body.email });

  if (existingUser) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  const user = await User.create({
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  const userId = user._id;

  const account = await Account.create({
    userId: userId,
    balance: 200,
  });

  const token = jwt.sign({ userId}, process.env.JWT_SECRET);
  return res.status(201).json({
    message: 'User created successfully',
    token,
  });

});




const signinBody = zod.object({
  email: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})



const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully",
        id: req.userId
    })
})



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/me', async (req, res) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = bearerHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET).userId;
        const user = await User.findById(decodedToken);

        if (!user) {
            res.json
            return res.status(404).json({ message: 'User not found',
                token: decodedToken
             });
        }

        res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});



module.exports = router;