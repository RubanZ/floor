const fastify = require('fastify')({
    logger: true
})
const nodemailer = require('nodemailer')

fastify.register(require('fastify-cors'), {})

fastify.post('/email', async (request, response) => {
    try {
        const email = request.body.email
        const name = request.body.name
        const phone = request.body.number
        if (!email) {
            response.send({"error": "Email is not received"})
        }
        console.log(email, name, phone)
        let emailAccount = await nodemailer.createTestAccount()
        let trasnporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: '88schmakov88@gmail.com',
                pass: 'q20047878'
            }
        })
        await trasnporter.sendMail({
            from: '"Company title here"',
            to: `${request.body.email}`,
            subject: 'Text',
            text: `Some text`
        })
        response.send({"result": "success"})
    } catch (e) {
        console.log(e)
        response.send({"error": e})
    }

})

fastify.listen((3001, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
}))