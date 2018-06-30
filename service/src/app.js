import express from 'express'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'

const app = express()
app.use(morgan('combined'))

const publicKey = `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEu4trkUwgGwVm6N6SG/p6ujSV6nMh3GIu
1VMa47tx7tiiQibXa8XBlenX4OTb5wcrrF8U5n2e3dowhQa56rK7Wg==
-----END PUBLIC KEY-----`

app.use(bearerToken())
app.get('/book', (req, res) => {
    if (!jwt.verify(req.token, publicKey)) {
        return res.status(403).json({'code': 'forbidden'})
    }
    res.status(200).json({title: 'wonderland'})
})

app.listen(3001, () => console.log('running graphql server on port 3000'))