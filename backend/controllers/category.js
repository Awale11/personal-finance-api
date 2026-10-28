const categories = [
    "Health",
    "Sport",
    "Food",
    "Salary",
    "Shopping",
    "Education",
    "Bils"
];

export const getCategories = async(req, res, next)=> {
    try {
        res.json(categories);
    } catch (error) {
        next(error);
    }
}