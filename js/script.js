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
        },
        info: {
            steam: {},
            twitch: {}
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
            // setTimeout(connect, 5000)
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

    function createAchiv(config, stats, name = '') {
        let container = document.getElementById('info-topachiv')
        let topdbd = document.getElementById('topdbd')
        let desc = document.getElementById('desc')

        while (container.firstElementChild) container.removeChild(container.firstElementChild)
        while (topdbd.firstElementChild) topdbd.removeChild(topdbd.firstElementChild)

        if (Object.keys(stats.steam).length == 0 && Object.keys(stats.onteh).length == 0) {
            document.getElementById('bp-value').innerText = 'bloodpoints...'
            document.getElementById('hs-value').innerText = 'playtime...'

            for (let i = 0; i < 2; i++) {
                let achiv = document.createElement('div')
                achiv.className = 'topachiv'

                let achivImg = document.createElement('div')
                achivImg.className = 'topachiv-img'
                achivImg.style.backgroundImage = 'url(../web/img/topachiv-nm2.png)'
                achiv.appendChild(achivImg)

                let achivHover = document.createElement('div')
                achivHover.className = 'topachiv-hover'
                achiv.appendChild(achivHover)

                container.appendChild(achiv)
            }
            for (let i = 0; i < 5; i++) {
                let topachiv = document.createElement('div')
          
                topachiv.className = 'topdbd topnm'
    
                let tophover = document.createElement('div')
                tophover.className = 'hover'
                topachiv.appendChild(tophover)
    
                topdbd.appendChild(topachiv)
            }
        } else {
            document.getElementById('bp-value').innerText = stats.steam['DBD_BloodwebPoints'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            document.getElementById('hs-value').innerText = stats['playtime'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' h'

            let i = 0
            for (let a of config.achiv) {
                for (let b of a) {
                    if (i == 0) {
                        let achiv = document.createElement('div')
                        achiv.className = 'topachiv'
                        achiv.id = b
    
                        let achivImg = document.createElement('div')
                        achivImg.className = 'topachiv-img'
                        achivImg.style.backgroundImage = 'url(' + stats.onteh[b].imgUrl +')'
                        achiv.appendChild(achivImg)
    
                        let achivHover = document.createElement('div')
                        achivHover.className = 'topachiv-hover'
                        achiv.appendChild(achivHover)
    
                        container.appendChild(achiv)
                    } else {
                        let topachiv = document.createElement('div')
    
                        let status = ''
                        if (stats.onteh[b].status > 0) status = 'topup'
                        else if (stats.onteh[b].status < 0) status = 'topdw'
                        else status = 'topnm'
    
                        topachiv.id = b
                        topachiv.className = 'topdbd ' + status
    
                        let tophover = document.createElement('div')
                        tophover.className = 'hover'
                        topachiv.appendChild(tophover)
    
                        let topdbdImg = document.createElement('div')
                        topdbdImg.className = 'topdbd-img'
                        topdbdImg.style.backgroundImage = 'url(../web/img/achievements/'+ stats.onteh[b].steamId + '.png)'
                        tophover.appendChild(topdbdImg)
    
                        topdbd.appendChild(topachiv)
                    }
                }
                i++
            }

            if (container.firstElementChild !== null) {
                container.firstElementChild.lastElementChild.style.backgroundImage = 'url(../web/img/topstats-hover-4x4.png)'
                // createDesc(desc,container.firstElementChild.id,stats,config,name)
            }

            for (let a of container.children) {
                a.onmousedown = () => {
                    for (let c of container.children) c.lastElementChild.style.background = ''
                    for (let c of topdbd.children) c.firstElementChild.style.background = ''
                    a.lastElementChild.style = 'background-image: url(../web/img/topstats-hover-4x4.png); background-size: contain;'
    
                    // createDesc(desc,a.id,stats,config,name)
                }
            }
    
            for (let a of topdbd.children) {
                a.onmousedown = () => {
                    for (let c of container.children) c.lastElementChild.style.background = ''
                    for (let c of topdbd.children) c.firstElementChild.style.background = ''
                    a.firstElementChild.style = 'background-image: url(../web/img/topstats-hover.png); background-size: contain;'
    
                    // createDesc(desc,a.id,stats,config,name)
                }
            }
        }
    }

    socket.addEventListener('message',(m) => {
        let msg = JSON.parse(m.data)

        // char
        charSetup(msg.data.config.main, false)

        // achiv
        createAchiv(msg.data.config, msg.data.stats, msg.data.info.steam.name)

        // ranks
        // rankSetup(msg.data.stats.steam, false)
    })

    // char
    charSetup(msgMain.data.config.main)

    // achiv
    createAchiv(msgMain.data.config, msgMain.data.stats, msgMain.data.info.steam.name)
}