const express = require('express')
const router = express.Router()
const schedulerModel = require('./model')

router.post('/create', async (req, res) => {

    const name = req.body.username;
    if (name.length == 0) {
        res.render('index', context =
        {
            'error': 'Please fill a name'
        }
        )
    }
    else {
        const exist = await schedulerModel.find({ username: name });
        console.log(exist);
        if (exist.length != 0) {
            res.render('index', context =
            {
                'error': 'Name Already Taken'
            }
            )
        }
        else {

            const createNew = await new schedulerModel({
                username: name,
                events: []
            }).save()

            res.json({
                'status': 'success',
                'user Id': createNew.id
            })

        }
    }

})


router.post( '/auth' , async (req,res)=>{

    const name = req.body.username;
    if (name.length == 0) {
        res.render('index', context =
        {
            'error': 'Please fill a name'
        }
        )
    }
    else {
        const exist = await schedulerModel.find({ username: name });
        if (exist.length == 0) {
            res.render('index', context =
            {
                'error': 'No user of this name exists'
            }
            )
        }
        else{
            res.redirect(`/api/${exist[0].username}`)
        }
    }

})


router.get('/:name' , async (req,res)=>{
    
    const name = req.params.name;
    const exist = await schedulerModel.find({ username: name });
        if (exist.length == 0) {
           res.status(400).json({
               'error' : 'Please enter a valid user name'
           })
        }
        else{
            res.render('scheduler' , context = exist[0] )
        }


})

router.post('/:name/create', async (req,res)=>{

    let { date,from,to,room,note } = req.body
    
    let [year,month,day] = date.split('-') 
    let [hourFrom,minFrom] = from.split(':')
    let [hourTo,minTo] = to.split(':')
    --month;
    let fromDate = Date.UTC(year,month,day,hourFrom,minFrom);
    let toDate = Date.UTC(year,month,day,hourTo,minTo);
    
    let user = await schedulerModel.findOne({ username : req.params.name })
    
    let flag = 0;
    user.events.map(event=>{
        if( fromDate >= event.from && fromDate <= event.to ){
            flag = 1;
        }
        if( toDate >= event.from && toDate <= event.to ){
            flag = 1;
        }
        return event;
    })

    if( flag == 0 ){

        if(note.length==0) note= 'Event'
        let newEvent = {
            description : note,from : fromDate,to : toDate , room : 'R' + room
        }

        user.events.push(newEvent);

        let updatedUser = await user.save()

        res.redirect(`/api/${user.username}/list`)
    }
    else{

        res.render('scheduler',context = { 'error' : 'The Time Clashes with one of the Meetings ' , 'events' : user.events , 'username' : user.username })

    }
    


})

router.get('/:name/list', async (req,res)=>{
    
    let user = await schedulerModel.findOne({ username : req.params.name })

    res.render('list',context=user)
})

router.get('/:name/create', async (req,res)=>{
    
    let user = await schedulerModel.findOne({ username : req.params.name })

    res.render('scheduler',context=user)
})


module.exports = router