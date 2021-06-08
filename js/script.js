const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let lastUpdateText = '* Last update: '

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
        // token: 'auth.token',
        // context: 'context',
        // mode: 'viewer',
        // data: {}
        token: {
            role: 'broadcaster',
            opaque_user_id: 'U160635646',
            channel_id: 160635646,
            user_id: 160635646
        },
        context: {
            mode: 'viewer'
        },
        type: 'onload'
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
    function changeMainInDesc(m, offline = false) {
        let desc = document.getElementById('desc')
        let main = document.getElementById('main-k') || document.getElementById('main-c') || document.getElementById('main-dbd')

        if (main) desc.removeChild(main)
    
        let newMain = document.createElement('div')
        newMain.className = 'main border'

        if (offline) {
            newMain.id = 'main-dbd'
            while (desc.firstElementChild) desc.removeChild(desc.firstElementChild)

            document.getElementById('last-update').innerText = ''

            let msg = document.createElement('div')
            msg.className = 'offline-msg'
            msg.innerHTML = 'The streamer is not currently broadcasting this game or the application is not available and is waiting for a connection to the server...'
            desc.appendChild(msg)

        }
        else newMain.id = m.includes('killer') ? 'main-k' : 'main-c'

        desc.insertBefore(newMain, desc.firstElementChild)
    }

    function charSetup(main, offline = true) {
        if (offline) {
            document.getElementById('ip-1').style.backgroundImage = ""
        } else {
            document.getElementById('ip-1').style.backgroundImage = "url(../web/img/characters/char-"+ main.charid +".png)"
        }

        if (Object.keys(main).length > 0) changeMainInDesc(main.role)
        else changeMainInDesc(main.role, true)
    }

    function createDesc(desc, nameId, stats, config, name = '') {
        while (desc.firstChild) desc.removeChild(desc.firstChild)

        let lastUpdateValue = new Date((stats.timeupdate ? stats.timeupdate : 0) * 1000)
        lastUpdate = lastUpdateValue.getUTCDate() + ' ' + 
            months[lastUpdateValue.getUTCMonth()] + ' ' + 
            lastUpdateValue.getUTCFullYear() + ' ' +
            lastUpdateValue.getUTCHours() + ':' +
            lastUpdateValue.getUTCMinutes() + ':' +
            lastUpdateValue.getUTCSeconds() + ' UTC'       

        let main = document.createElement('div')
        main.id = config.main.role == 'mainkiller' ? 'main-k' : 'main-c'
        main.className = 'main border'

        let msg = document.createElement('div')
        let message = stats.onteh[nameId].desc

        let spanPlayer = "<span id='sPlayer'>" + name + " </span>"

        let classPos = ''
        if (stats.onteh[nameId].status > 0) classPos = 'posUp'
        else if ((stats.onteh[nameId].status < 0)) classPos = 'posDown'
        else classPos = 'posNm'

        msg.innerHTML = spanPlayer + message
            .replace('{value}',"<span id='sValue'>" + 
                stats.onteh[nameId].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "</span> " + 
                "<span id='cValueText'>(текущее значение <span id='cValue'>" + stats.steam[stats.onteh[nameId].steamId].toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "</span>*)</span>")
            .replace('{place}',"<span id='sPos' class='" + classPos + "'>" + stats.onteh[nameId].position.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " </span>")

        document.getElementById('last-update').innerText = lastUpdateText + lastUpdate

        desc.appendChild(main)
        desc.appendChild(msg)
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
                achiv.className = 'topachiv topachiv-empty'

                let topachivHover = document.createElement('div')
                topachivHover.className = 'topachiv-hover'
                achiv.appendChild(topachivHover)

                container.appendChild(achiv)
                // let achiv = document.createElement('div')
                // achiv.className = 'topachiv'

                // let achivImg = document.createElement('div')
                // achivImg.className = 'topachiv-img'
                // achivImg.style.backgroundImage = 'url(../web/img/topachiv-nm2.png)'
                // achiv.appendChild(achivImg)

                // let achivHover = document.createElement('div')
                // achivHover.className = 'topachiv-hover'
                // achiv.appendChild(achivHover)

                // container.appendChild(achiv)
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

                        let status = ''
                        if (stats.onteh[b].status > 0) status = 'topachiv-up'
                        else if (stats.onteh[b].status < 0) status = 'topachiv-dw'
                        else status = 'topachiv-nm'

                        achiv.id = b
                        // achiv.className = 'topachiv ' + status 
                        achiv.className = 'topachiv topachiv-empty'

                        let topachivHover = document.createElement('div')
                        topachivHover.className = 'topachiv-hover'
                        achiv.appendChild(topachivHover)

                        let topachivImg = document.createElement('div')
                        topachivImg.className = 'topachivdbd-img'
                        topachivImg.style.backgroundImage = 'url(../web/img/achievements/'+ stats.onteh[b].steamId + '.png)'
                        topachivHover.appendChild(topachivImg)

                        container.appendChild(achiv)
                        // let achiv = document.createElement('div')
                        // achiv.className = 'topachiv'
                        // achiv.id = b
    
                        // let achivImg = document.createElement('div')
                        // achivImg.className = 'topachiv-img'
                        // achivImg.style.backgroundImage = 'url(' + stats.onteh[b].imgUrl +')'
                        // achiv.appendChild(achivImg)
    
                        // let achivHover = document.createElement('div')
                        // achivHover.className = 'topachiv-hover'
                        // achiv.appendChild(achivHover)
    
                        // container.appendChild(achiv)
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
                createDesc(desc,container.firstElementChild.id,stats,config,name)
            }

            for (let a of container.children) {
                a.onmousedown = () => {
                    for (let c of container.children) c.lastElementChild.style.background = ''
                    for (let c of topdbd.children) c.firstElementChild.style.background = ''
                    a.lastElementChild.style = 'background-image: url(../web/img/topstats-hover-4x4.png); background-size: contain;'
    
                    createDesc(desc,a.id,stats,config,name)
                }
            }
    
            for (let a of topdbd.children) {
                a.onmousedown = () => {
                    for (let c of container.children) c.lastElementChild.style.background = ''
                    for (let c of topdbd.children) c.firstElementChild.style.background = ''
                    a.firstElementChild.style = 'background-image: url(../web/img/topstats-hover.png); background-size: contain;'
    
                    createDesc(desc,a.id,stats,config,name)
                }
            }
        }
    }

    function getRank(rank) {
        if (rank === undefined) return '20'
        else {
            if (rank < 3) return '20'
            else if (rank < 6) return '19'
            else if (rank < 10) return '18'
            else if (rank < 14) return '17'
            else if (rank < 18) return '16'
            else if (rank < 22) return '15'
            else if (rank < 26) return '14'
            else if (rank < 30) return '13'
            else if (rank < 35) return '12'
            else if (rank < 40) return '11'
            else if (rank < 45) return '10'
            else if (rank < 50) return '09'
            else if (rank < 55) return '08'
            else if (rank < 60) return '07'
            else if (rank < 65) return '06'
            else if (rank < 70) return '05'
            else if (rank < 75) return '04'
            else if (rank < 80) return '03'
            else if (rank < 85) return '02'
            else return '01'
        }
    }

    function rankSetup(stats = {}, offline = true) {
        if (offline) {
            document.getElementById('rank-k').style.backgroundImage = "url(../web/img/ranks/K20.png)"
            document.getElementById('rank-c').style.backgroundImage = "url(../web/img/ranks/C20.png)"
        } else {
            document.getElementById('rank-k').style.backgroundImage = "url(../web/img/ranks/K" + getRank(stats['DBD_KillerSkulls']) + ".png)"
            document.getElementById('rank-c').style.backgroundImage = "url(../web/img/ranks/C" + getRank(stats['DBD_CamperSkulls']) + ".png)"
        }
    }

    socket.addEventListener('message',(m) => {
        let msg = JSON.parse(m.data)

        // char
        charSetup(msg.data.config.main, false)

        // achiv
        createAchiv(msg.data.config, msg.data.stats, msg.data.info.steam.name)

        // ranks
        rankSetup(msg.data.stats.steam, false)
    })

    // char
    charSetup(msgMain.data.config.main)

    // achiv
    createAchiv(msgMain.data.config, msgMain.data.stats, msgMain.data.info.steam.name)

    // ranks
    rankSetup(msgMain.data.stats.steam, false)
}