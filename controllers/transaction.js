import Transaction from "../models/Transaction.js"

// CPOST/CREATE transaction
export const createTransaction = async (req, res, next)=> {
    try {
        // const transaction = await Transaction.create({
        //     title: req.body.title,
        //     amount: req.body.amount,
        //     type: req.body.type,
        //     category: req.body.category,
        //     date: req.body.date,
        //     user: req.user._id
        // });
        const transaction = await Transaction.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
}

// GET/transactions
export const getTransactions = async(req, res, next)=> {
    try {
        // JWT'den gelen kullanıcının ID'sine ait kayıtları getiriyoruz.
        const transaction = await Transaction.find({
            user: req.user._id
        });
        res.json(transaction);
    } catch (error) {
        next(error)
    }
}

// GET /transaction/:id
// Buradaki kritik nokta: ID'sini bilen herhangi bir kullanıcı, başka kullanıcının transaction'ını görememeli.
export const getTransaction = async(req, res, next)=> {
    try {
        const transaction = await Transaction.findOne({
            // "Bu ID'ye sahip transaction'ı bul ama sadece giriş yapan kullanıcıya aitse getir."
            _id: req.params.id,
            user: req.user._id
        });
        if(!transaction) {
            return res.status(404).json({
                message: 'Transaction not found'
            })
        }
        res.json(transaction)
    } catch (error) {
        next(error)
    }
}

//  GET/monthly-summary
export const monthlySummary = async(req, res, next)=> {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0,0,0,0);

        const startOfNextMonth = new Date(startOfMonth);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const summary = await Transaction.aggregate([
            {
                // "hangi kayıtlar?"
                $match: {
                    user: req.user._id,
                    date: {
                        $gt: startOfMonth,
                        $lt: startOfNextMonth
                    }
                }
            },
            {
                // "nasıl gruplayıp toplayacağız?"
            $group: {
                _id: {
                    category: '$category',
                    type: '$type'
                },
                total: {
                    $sum: '$amount'
                }
              }
            }
        ]);
        res.json(summary);
    } catch (error) {
        next(error)
    }
}

// PUT/transaction/:id - edit
export const updateTransaction = async(req, res, next)=> {
    try {
        const transaction = await Transaction.findOneAndUpdate({
            _id: req.params.id, 
            user: req.user._id
        },
        req.body,
        { new: true}
    );
    if(!transaction) {
        return res.status(404).json({
            message: 'Transaction not found'
        });
    }
    res.json(transaction);
    } catch (error) {
        next(error)
    }
}

// DELETE/transaction/:id - Remove
export const deleteTransaction = async(req, res, next)=> {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if(!transaction) return res.status(404).json({
            message: 'Transaction not found'
        });
        res.json({
            message: 'Transaction deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}
