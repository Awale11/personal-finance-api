import User from '../models/Users.js'

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

// new user POST
 export const createUser = async (req, res) => {
  const user = new User(req.body);

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

// UPDATE User PUT
export const updatedUser = async(req, res) => {
    const { id } = req.params;

    try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});

        if(!updatedUser) {
            return res.status(404).send('User not found')
        }
        res.json(updatedUser)
    }catch (err) {
        res.status(500).send('Server error')
    }
}

// DELETE User

export const deleteUser = async(req, res)=> {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).send('User not found')
        }
        res.json(`User with id ${id} deleted`)
    } catch (error) {
        res.status(500).send('Server error')
    }
}

// searching 1 single User

export const getUserInfo = async(req, res)=> {
    const userInfo = await User.findById(req.params.id)

    if(!userInfo) return res.status(404).send('User not found');

    res.json(userInfo)
}

// REGISTER NEW USER
export const register = async (req, res, next)=> {

    let { name, password, email } = req.body;

    try {
        email = email.toLowerCase();
        const exists = await User.findOne({email})

        if (exists) return res.status(400).json({ message: 'Email already in use'});

        const user = await User.create({ name, password, email });
 
        const token = generateToken(user_id)
        res.status(201).json({ token })

    } catch (error) {
        console.log("error", err)
        next(err)
    }
}