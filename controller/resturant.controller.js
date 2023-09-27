const Resturant = require("../model/schema")


// now we are creating first api endpoint , which is adding resturant in our restful api
exports.addresturant = async (req, res) => {
    const resturantobj = {
        name: req.body.name,
        description: req.body.description,
        Category: req.body.Category,
        imageURL: req.body.imageURL,
        location: req.body.location,
        phone: req.body.phone,
        rating: req.body.rating,
    }

    try {
        const resturant = await Resturant.create(resturantobj);
        res.status(200).send(resturant);
    } catch (error) {
        console.log("error while creatiing resturant", error.message);
        res.status(500).send("error occured, while creating resturant")
    }
}


// 2nd apiendpoint for getting all the resturant from collection
exports.getallresturant = async (req, res) => {
    try {
        const restutantdata = {};
        const resturant = await Resturant.find(restutantdata);
        res.status(200).send({
            resturant,
            message: "all resturant fetched"
        })
    } catch (err) {
        console.log("some error occured , while fetching resturant ", err.message);
        res.status(500).send("some error occured while fetching data ");
    }
}


// 3rd api endpoint , which is fetch all categories of resturant
exports.getcategories = async (req, res) => {
    try {
        const categories = await Resturant.distinct('Category');
        res.status(200).send(categories);
    } catch (err) {
        console.log("error occured while fetching categories", err.message);
        res.status(500).send("error while fetching catoegires")
    }
}


// 4th fetching dinein or takeout resturant
exports.fetchingdineinortakeout = async (req, res) => {
    const { categoryname } = req.params;
    try {
        const categories = await Resturant.find({
            Category: categoryname
        })
        res.status(200).send(categories);
    } catch (err) {
        console.log("error while , getting slected category data", err.message);
        res.status(500).send("error occured while getting particulat category resturant");
    }
}

// 5th find particular resturant (using resturant id )
exports.getresturantbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const resturant = await Resturant.findById({ _id: id })
        if (resturant) {
            res.status(200).send({ resturant });
        } else {
            res.status(404).send({
                message: "No resturant found with this id"
            })
        }
    } catch (error) {
        console.log("error while fetching resturant by id", error.message)
        res.status(500).send({
            message: "some error occur while fetching resturant"
        })

    }
}

// find resturant by rating value code starts here 
exports.resturantbyrating = async (req, res) => {
    const { ratingvalue } = req.params;

    const resturant = await Resturant.find({ rating: { $lte: ratingvalue } })
    //   $gte stands for greater than equal to 
    //   $lte stands for less than equal to 
    try {
        res.status(200).send({ resturant })

    } catch (error) {
        console.log("error while finding rating of restiurant", error.message)
        res.status(400).send({
            message: "error while fetching rating"
        })
    }
}


// update resturant by id code starts here 
exports.updateresturant = async (req, res) => {
    const { id } = req.params;
    const { name, description, Category, imageURL, location, phone, rating } = req.body
    if (!name || !description || !Category || !imageURL || !location || !phone || !rating) {
        return res.status(400).send({
            message: "write something to update"
        })
    }
    try {
        const resturantobj = {
            name: req.body.name,
            description: req.body.description,
            Category: req.body.Category,
            imageURL: req.body.imageURL,
            location: req.body.location,
            phone: req.body.phone,
            rating: req.body.rating,
        }
        const resturant = await Resturant.findByIdAndUpdate(
            id,
            resturantobj,
            {
                new: true
            })
        if (resturant) {
            res.status(200).send({
                resturant,
                message: "resturant updated succesfully"
            })
        } else {
            res.status(400).send({
                message: "no resturant found with id "
            })
        }
    } catch (err) {
        console.log("error while updating the resturant ", err.message)
        res.status(500).send({
            message: "some error while updating "
        })
    }
}


// Delete a resturant by id
exports.deletearesturant = async (req, res) => {
    const { id } = req.params;
    try {
        const resturant = await Resturant.findByIdAndDelete(id)
        res.status(200).send({
            message: "resturant deleted successfully"
        })
    } catch (error) {
        res.status(400).send({
            message: "error occour while deleting the resturant "
        })
        console.log("error occur while the resturant by id ", error.mesaage)
    }
}

// delete all resturant 
exports.deleteallresturant = async (req, res) => {
    try {
        const result = await Resturant.deleteMany({});
        const deleteCount = result.deletedCount; // Use deletedCount to get the number of deleted documents

        if (deleteCount > 0) {
            res.status(200).send({
                acknowledge: true,
                deleteCount: deleteCount,
                message: `${deleteCount} restaurant(s) deleted successfully`
            });
        } else {
            res.status(200).send({
                acknowledge: true,
                deleteCount: deleteCount,
                message: "No restaurants to delete"
            });
        }
    } catch (err) {
        console.log("Error while deleting the restaurant", err.message);
        res.status(500).send({
            message: "Error while deleting the restaurant"
        });
    }
};
