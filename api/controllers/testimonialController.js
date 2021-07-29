/**
 * Author: Deep Patel.
 * Created On: 2021-07-20
 * Controller for Testimonials Controller.
 */

const testimonialModel = require('../models/testimonialModel');

/**
 * Method to get all the details of the testimonials lists.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * The List is returned containing all the testimonials details 
 * If having error returns error status.
 */

const list = (req, res) => {
    let data = req['body']
    return testimonialModel.find({ 'userId': data.userId }, function (error, document) {
        if (error) {
            return res.status(400).json({
                result: [],
                message: error,
                success: false
            })
        } else {
            return res.status(200).json({
                data: document,
                message: "",
                success: true
            })
        }
    })
};

/**
 * Method to get details of the specific testimonials lists.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * Testimonial Id is automated value generated by MongoDB.
 * The testimonial with that specific id is fatched  
 * If having error returns false with error status.
 */
const get = (req, res) => {
    testimonialModel.findById(req.params.id, function (err, doc) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found!',
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Testimonial found!',
            data: doc
        })
    });
};

/**
 * Method to update the details of specific testimonials lists.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * Testimonial Id is automated value generated by MongoDB.
 * The testimonial with that specific id is updated  
 * If having error returns false with error status.
 */
const update = (req, res) => {
    testimonialModel.findById(req.params.id, function (err, testimonials) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Project not found!'
            })
        }

        if(req.body && req.body.project){
            testimonials.project = req.body.project;
        }
        if(req.body && req.body.client){
            testimonials.client = req.body.client;
        }
        if(req.body && req.body.feedback){
            testimonials.feedback = req.body.feedback;
        }
        testimonials.save();
        return res.status(200).json({
            success: true,
            message: 'Project updated!',
        })
    });
};


/**
 * Method to delete the details of specific testimonials from the lists.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * Testimonial Id is automated value generated by MongoDB.
 * The testimonial with that specific id is deleted  
 * If having error returns false with error status.
 */
const remove = (req, res) => {
    if(req.body && req.body._id){
        testimonialModel.findOneAndRemove({'_id': req.body._id}, function(error, result)
        {
            if (error) {
                return res.status(400).json({
                    result: [],
                    message: error,
                    success: false
                })
            } 
            else {
                return res.status(200).json({
                    message: "Success",
                    success: true
                })  
        }
        });
    }
};

/**
 * Method to add all the details of the testimonials lists.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * Testimonial Id is automated value generated by MongoDB.
 * The testimonial with is added to the list of all testimonials 
 * If having error returns error status.
 */
const add = async (req, res) => {
    
    const testimonials = new testimonialModel();

    if(req.body && req.body.project){
        testimonials.project = req.body.project;
    }
    if(req.body && req.body.client){
        testimonials.client = req.body.client;
    }
    if(req.body && req.body.feedback){
        testimonials.feedback = req.body.feedback;
    }
    if(req.body && req.body.userId){
        testimonials.userId = req.body.userId;
    }
    testimonials.save(function(error, document) {
        if (error) {
            return res.status(400).json({

            })
        } else {
            return res.status(200).json({
                result: document,
                status: true
            })
        }
    });
};


module.exports = {
    list,
    get,
    add,
    update,
    remove
};
