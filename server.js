import express, { static as staticMiddleware } from 'express'
const app = express()
const port = 3000

app.use(staticMiddleware('public'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})