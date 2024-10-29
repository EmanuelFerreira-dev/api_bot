import { createBot, createFlow, MemoryDB, createProvider } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";


const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx (async (bot, req,res)=> {
        const body = req.body
        const phone = body.phone
        const message = body.message
        
        await bot.sendMessage(phone, message, {})
        res.end('esto es del server')
    }))

    await createBot({
        flow: createFlow([]),
        database: new MemoryDB(),
        provider
    })

}

main()