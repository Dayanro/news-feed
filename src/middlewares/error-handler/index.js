
export const errorHandler = (error, req,res,next) => { 
    const status =error.status
    const message = error.message
    res.status(status).json(message)
}