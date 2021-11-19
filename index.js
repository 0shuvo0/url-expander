const express = require('express')
const app = express()
const request = require('request')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get("/expand", (req, res) => {
    let shortUrl = req.query.shortUrl
    if(!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl
    request({
        url: shortUrl,
        method: "HEAD",
        followAllRedirects: true
    },
    (err, response, body) => {
        if (err) {
            console.log(err)
            res.send("Error")
        } else {
            res.send(response.request.href)
        }
    })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})