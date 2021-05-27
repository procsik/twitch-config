let lastUpdateText = '* - last Steam statistics update: '
let msgIn = {
    mode: null,
    type: null,
    data: {
        config: {
            main: {},
            achiv: []
        },
        stats: {
            onteh: {},
            steam: {}
        }
    }
}

document.addEventListener("load", start())

function start() {
    // const twitch = window.Twitch.ext
    // let context

    let sTwitch = new Object({
        token: 'auth.token',
        context: 'context',
        data: {}
    })

    // twitch.onContext((ctx) => {
    //     context = ctx
    // })

    // twitch.onAuthorized((auth) => {
    
    //     // token = auth.token
    //     // userId = auth.userId
    //     // channelId = auth.channelId

    //     let secureTwitch = new Object()
    //     secureTwitch.token = auth.token
    //     secureTwitch.context = context
    //     secureTwitch.data = {}

    //     connect(secureTwitch)

    // })

    connect(sTwitch)

    function connect(msg) {
             
        let socket = new WebSocket('ws://localhost/')
        // let socket = new WebSocket('wss://twitch-app.cyber-vologda.ru/')

        socket.addEventListener('open', () => {
            socket.send(JSON.stringify(msg))
        })
    
        socket.addEventListener('close', () => {
            socket = null
            setTimeout(connect, 5000)
        })
        main(msgIn, socket)
    }
}

function main(msgMain, socket) {

    function charSetup(main, offline = true) {
        if (offline) {
            document.getElementById('ip-1').style.backgroundImage = ""
        } else {
            document.getElementById('ip-1').style.backgroundImage = "url(../web/img/characters/char-"+ main.id +".png)"
        }
    }

    socket.addEventListener('message',(m) => {
        let msg = JSON.parse(m.data)

        // char
        charSetup(msg.data.config.main, false)

        // achiv
        achivSetup(msg.data.stats, msg.data.config, false, msg.data.info.steam.name)

        // motiv

        // ranks
        rankSetup(msg.data.stats.steam, false)

        //save
        document.getElementById('button').onclick = () => saveSettings(socket, '', false)
    })

    // char
    charSetup(msgMain.data.config.main)
}