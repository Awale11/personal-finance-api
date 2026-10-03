import User from '../models/Users.js';
import Transaction from '../models/Transaction.js';

export const getOverView = async (req, res, next)=> {
    try {
        const totalUsers = await User.countDocuments();
        
        const topSpendingCategories = await Transaction.aggregate([
            {
                $match: { type: 'expense'}
            },
            {
                $group : {
                    _id: '$category',
                    totalSpent: {
                        $sum: '$amount'
                    }
                }
            },
            {
                $sort: {totalSpent: -1}
            }
        ]);

          return res.status(200).json({
            success: true,
            totalUsers,
            topSpendingCategories
        })

    } catch (error) {
        next(error)
    }
}