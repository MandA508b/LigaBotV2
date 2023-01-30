require('dotenv').config()
const { Telegraf,Markup } = require('telegraf')
const startServer = require('./server/index')
const userController = require('./controllers/user.controller')
const advertisementService = require('./server/services/advertisement.service')
const cityService = require("./server/services/city.service");

const bot = new Telegraf(`${process.env.BOT_TOKEN}`)

bot.start(async (ctx) => {
    const registration = await userController.start(ctx.update.message.from)
    if(registration)
        ctx.reply("Вітаю! Ви успішно зареєстровані як користувач!")
    else
        ctx.reply("Ви вже зареєстровані!")
    ctx.reply('Спробуйте ввести /menu')

})



bot.command('menu', async (ctx) => {
    const accessToMenu = await userController.accessToMenu(ctx.update.message.from.id)

         return await ctx.reply('menu:',Markup
            .keyboard([
                [Markup.button.webApp('Додати Оголошення', 'https://heroic-profiterole-cc695c.netlify.app'),'Мої оголошення'],
                ['Канали']
            ])
            .oneTime()
            .resize()
        )


})

bot.hears('Канали', ctx=>{
    ctx.reply('2')
})

bot.hears('Мої оголошення', async (ctx)=>{
    const advertisements = await advertisementService.getAllByTelegramId(ctx.update.message.from.id)
    const cityId = advertisements[0].cityId
    const cityName = await cityService.findById(cityId)

    for (let advertisementsKey in advertisements) {
        bot.telegram.sendMessage(ctx.update.message.from.id, `Оголошення №${advertisements[advertisementsKey].number}\n`+
            `${advertisements[advertisementsKey].type}: ${cityName.name} USDT trc20\n`+
            `Сума: ${advertisements[advertisementsKey].total}\n`+
            `Частин: ${advertisements[advertisementsKey].rate}\n`+
            `Ставка: ${advertisements[advertisementsKey].part}%\n`+
            `Дійсне до: ${advertisements[advertisementsKey].deadline.toLocaleDateString("en-US",{ day: "numeric", weekday: "short", hour: "numeric", minute: "numeric"})}\n`+
            `${advertisements[advertisementsKey].extraInfo}`);
    }
})


startServer()
bot.launch()