import express from 'express'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'

const app = express()
app.use(morgan('combined'))

const privateKey = `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIFPrAguiZ1AjrA2EU/hsBgyEbLOBFoiB8vz4x/fJSs5SoAcGBSuBBAAK
oUQDQgAEu4trkUwgGwVm6N6SG/p6ujSV6nMh3GIu1VMa47tx7tiiQibXa8XBlenX
4OTb5wcrrF8U5n2e3dowhQa56rK7Wg==
-----END EC PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEu4trkUwgGwVm6N6SG/p6ujSV6nMh3GIu
1VMa47tx7tiiQibXa8XBlenX4OTb5wcrrF8U5n2e3dowhQa56rK7Wg==
-----END PUBLIC KEY-----`

app.get('/jwt/:token', (req, res) => {
    if (req.params.token !== '1234') {
        return  res.status(401).json({code: 'unauthorized'})
    }
    res.status(200).json({jwt: jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'ES256'})})
})

app.listen(3000, () => console.log('running graphql server on port 3000'))