'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

//        console.log('data : {"facebook": {<facebook_message>}}')

> >  	var facebook_message = [ 
		  {
> > > >     attachment :{
> > > >       type :"template",
> > > >       payload :{
> > > >         template_type :"generic",
> > > >         elements :[
> > > >           {
> > > >             title :"Classic Grey T-Shirt",
> > > >             image_url :"http://petersapparel.parseapp.com/img/item101-thumb.png",
> > > >             subtitle :"Soft gray cotton t-shirt is back in style",
> > > >             buttons :[
> > > >               {
> > > >                 type :"web_url",
> > > >                 url :"https://petersapparel.parseapp.com/view_item?item_id=101",
> > > >                 title :"View Item"
> > > >               },
> > > >               {
> > > >                 type :"web_url",
> > > >                 url :"https://petersapparel.parseapp.com/buy_item?item_id=101",
> > > >                 title :"Buy Item"
> > > >               },
> > > >               {
> > > >                 type :"postback",
> > > >                 title :"Bookmark Item",
> > > >                 payload :"USER_DEFINED_PAYLOAD_FOR_ITEM101"
> > > >               }              
> > > >             ]
> > > >           }
> > > >         ]
> > > >       }
> > > >     }
> > >     }
		]

        return res.json({
            speech: speech,
            displayText: speech,
            data : {"facebook": facebook_message},
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});