require('dotenv').config()
const { Telegraf,Markup } = require('telegraf')
const startServer = require('./server/index')
const userController = require('./controllers/user.controller')
const advertisementService = require('./server/services/advertisement.service')
const cityService = require("./server/services/city.service");
const channelService = require('./server/services/channel.service')
const userService = require('./server/services/user.service')

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

    if(accessToMenu){
        return await ctx.reply('menu:', Markup
            .keyboard([
                [Markup.button.webApp('Додати Оголошення', 'https://heroic-profiterole-cc695c.netlify.app'), 'Мої оголошення'],
                ['Канали']
            ])
            .oneTime()
            .resize()
        )
    }


})

bot.hears('Канали', async (ctx)=>{
    const user = await userService.getUserByTelegramId(ctx.update.message.from.id)
    const channels = await channelService.getAllByLeagueId(user.ligaId)
    let channelsList = 'Ваші канали:\n'
    for (let channelsKey in channels) {
        channelsList += `${channels[channelsKey].URL}\n`
    }
    ctx.reply(channelsList)
})

bot.hears('Мої оголошення', async (ctx)=> {
    const advertisements = await advertisementService.getAllByTelegramId(ctx.update.message.from.id)

    for (let advertisementsKey in advertisements) {
        const cityId = advertisements[advertisementsKey].cityId
        const cityName = await cityService.findById(cityId)

        bot.telegram.sendMessage(ctx.update.message.from.id, `Оголошення №${advertisements[advertisementsKey].number}\n` +
            `${advertisements[advertisementsKey].type}: ${cityName.name} USDT trc20\n` +
            `Сума: ${advertisements[advertisementsKey].total}\n` +
            `Частин: ${advertisements[advertisementsKey].rate}\n` +
            `Ставка: ${advertisements[advertisementsKey].part}%\n` +
            `Дійсне до: ${advertisements[advertisementsKey].deadline.toLocaleDateString("en-US", {
                day: "numeric",
                weekday: "short",
                hour: "numeric",
                minute: "numeric"
            })}\n` +
            `${advertisements[advertisementsKey].extraInfo}`,
            Markup.inlineKeyboard([
                Markup.button.callback('Редагувати', 'redact'),
                Markup.button.callback('Скасувати', 'delete')
            ]))
    }
})
startServer()
bot.launch()