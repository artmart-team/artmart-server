const app = require('../app')

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`mARTerialize app listening at http://localhost:${port}`)
})