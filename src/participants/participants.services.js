const participantsController = require('./participants.controller')


const getAllParticipants = (req, res) => {
    participantsController.findAllParticipants()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getParticipantsById = (req, res) => {

    const id = req.params.conversation_id
    participantsController.findConversationById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const postParticipants = (req ,res) => {
    const {title, imageUrl, participantId} = req.body
    const ownerId = req.user.id 
    participantsController.createparticipants({title, imageUrl, participantId, ownerId})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message, fields: {
                title: 'string',
                imageUrl: 'string',
                participantId: 'UUID'
            }})
        })
}

const patchParticipants = (req, res) => {
    const id = req.params.participants_id
    const { title, imageUrl } = req.body
    participantsController.updateparticipants(id, {title, imageUrl})
        .then(data => {
            if(data){
                res.status(200).json({message: `participants with id: ${id} updated succesfully!`})
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deleteParticipants = (req, res) => {
    const id = req.params.participants_id
    participantsController.removeparticipants(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        }) 
}

module.exports = {
    getAllParticipants,
    postParticipants,
    getParticipantsById,
    patchParticipants,
    deleteParticipants
}