document.addEventListener("load", start())

function start() {
    //console.log(Object.assign(Obj,newObj))
    // const twitch = window.Twitch.ext
    // let context

    // twitch.onContext((ctx) => {
    //     context = ctx
    // })

    // twitch.onAuthorized((auth) => {
    //     // token = auth.token
    //     // userId = auth.userId
    //     // channelId = auth.channelId

    //     let message = new Object()

    //     message.token = auth.token
    //     message.context = context
    //     message.version = '22:49'

    //     connect(message)

    // })
    let msgOut = new Object({
        token: 'auth.token',
        context: 'context',
        type: 'onload',
        data: {}
    })

    connect(msgOut,true)

    function connect(msg,type = false) {
        let msgIn = new Object({
            mode: null,
            data: {
                hash: null,
                authSite: null,
                config: {},
                stats: {}
            }
        })

        let socket = new WebSocket('ws://localhost/')
        console.log(socket.readyState,'a')
        // let socket = new WebSocket('wss://twitch-app.cyber-vologda.ru/')

        if (!type) {
            socket.addEventListener('open', () => {
                socket.send(JSON.stringify(msg))
                console.log(socket.readyState,'b')
                console.log('1')
            })
        } else {
            // socket.send(JSON.stringify(msg))
            console.log('2')
        }

        console.log(socket.readyState,'c')

        socket.addEventListener('close', () => {
            socket = null
            // setTimeout(start, 5000)
        })
    
        socket.addEventListener('message', (m) => {
            // console.log(m.data)
            // main(JSON.parse(m.data))
        })

        

        main(data,socket)
    }
    // main(data)
}

function main(msgIn,socket) {
    // console.log(msgIn)
    // init

    let sswSteamL = document.getElementById('ssw-steam-l')
    let sswSteamR = document.getElementById('ssw-steam-r')
    
    if (msgIn.data.hash !== null) {
        let sswSteamLAuth = document.createElement('div')
        sswSteamLAuth.id = 'ssw-steam-l-auth'

        let sswSteamLAuthImg = document.createElement('div')
        sswSteamLAuthImg.id = 'ssw-steam-l-auth-img'
        sswSteamLAuthImg.onclick = () => {
            window.open(msgIn.data.authSite + 'login?hash=' + msgIn.data.hash, '_blank')
        }
        sswSteamLAuth.appendChild(sswSteamLAuthImg)

        sswSteamL.appendChild(sswSteamLAuth)
    } else {

    }

    let cSetup = ''
    let cConfig = ''
    let achivTmp = {}

    let bp = 12342525243
    let hs = 5235
    document.getElementById('bp-value').innerText = bp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    document.getElementById('hs-value').innerText = hs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    let lastUpdateValue = new Date(msgIn.data.stats.timeupdate * 1000)
    let lastUpdateText = '* - last Steam statistics update: '
    lastUpdate = lastUpdateValue.getUTCDate() + '.' + 
        lastUpdateValue.getUTCMonth('mm') + '.' + 
        lastUpdateValue.getUTCFullYear() + ' ' +
        lastUpdateValue.getUTCHours() + ':' +
        lastUpdateValue.getUTCMinutes() + ':' +
        lastUpdateValue.getUTCSeconds() + ' UTC'

    // document.getElementById('ssw-u-value-a').innerText = lastUpdate
    // document.getElementById('ssw-u-value-b').innerText = lastUpdate
    // COLOR
    switch(msgIn.data.config.color) {
        case "dark": {
            for (let c of document.getElementsByClassName('column')) {
                c.className += ' column-dark'
            }
            break
        }
        case "blood": {
            for (let c of document.getElementsByClassName('column')) {
                c.className += ' column-blood'
            }
        }
        case "light": {
            for (let c of document.getElementsByClassName('column')) {
                c.className += ' column-light'
            }
        }
        default: break
    }

    // character
    for (let c in msgIn.data.character) {
        let char = document.createElement('div')
        char.className = 'char border ' + msgIn.data.character[c].type
        char.style.display = 'none'
        char.style.backgroundImage = 'url(' + msgIn.data.character[c].imgUrl + ')'
        char.onclick = () => {
            msgIn.data.config.char = parseInt(char.lastElementChild.value)
            char.lastElementChild.checked = true
            activeChar(msgIn.data.config.char)
        }

        let charHover = document.createElement('div')
        charHover.className = 'char-hover border'
        char.appendChild(charHover)

        let charInput = document.createElement('input')
        charInput.type = 'radio'
        charInput.name = 'character'
        charInput.value = msgIn.data.character[c].id
        charInput.style.display = 'none'
        charInput.checked = charInput.value == msgIn.data.config.char ? true : false
        char.appendChild(charInput)

        document.getElementById('wrapper-char').appendChild(char)
    }

    // achievements 
    for (let a in sortByPos(msgIn.data.stats.onteh)) {
        let rowAchiv = document.createElement('div')
        rowAchiv.className = 'achivments border'
        rowAchiv.onclick = () => changeAchiv(rowAchiv,a,cConfig)
        // rowAchiv.style = 'display: none'

        let achivImg = document.createElement('div')
        achivImg.className = 'achiv-img border'
        achivImg.style.backgroundImage = 'url('+ msgIn.data.stats.onteh[a].imgUrl +')'
        rowAchiv.appendChild(achivImg)

        let achivName = document.createElement('div')
        achivName.className = 'achiv-name border'
        achivName.innerHTML = msgIn.data.stats.onteh[a].name
        rowAchiv.appendChild(achivName)

        let achivPos = document.createElement('div')
        achivPos.className = 'achiv-pos border'
        achivPos.innerHTML = msgIn.data.stats.onteh[a].position
        rowAchiv.appendChild(achivPos)

        let rowAchivBox = document.createElement('input')
        rowAchivBox.hidden = true
        rowAchivBox.type = 'checkbox'
        rowAchivBox.name = 'achivments'
        rowAchivBox.value = a
        rowAchiv.appendChild(rowAchivBox)
        
        document.getElementById('wrapper-achivmain').appendChild(rowAchiv)
    }

    // achiv to object
    let i = 0
    for (let a of msgIn.data.config.achiv) {
        achivTmp[i] = {}
        for (let b of a) achivTmp[i][b] = msgIn.data.stats.onteh[b]
        i++
    }

    createAchiv(msgIn.data.config.achiv)
    activeChar(msgIn.data.config.char)
    document.getElementById('steam').onmousedown = () => {
        activMenu('steam','onclick-setup')
        document.getElementById('steam-status').style.display = 'flex'


        
        document.getElementById('role-value').style.display = 'none'
        document.getElementById('achiv-value').style.display = 'none'
    }

    document.getElementById('role').onmousedown = () => {
        //cSetup = 'role'
        activMenu('role','onclick-setup')
        cConfig = ''
        document.getElementById('role-value').style.display = 'flex'
        
        for (let c of document.getElementById('role-value').children) {
            if (c.id.includes(msgIn.data.config.role)) {
                for (let char of document.getElementsByClassName('char')) {
                    if (msgIn.data.config.role.includes(char.classList[2])) {
                        char.style.display = ''
                        activeChar(msgIn.data.config.char)
                    }
                    
                    // char.style.display = settings.role.includes(char.classList[2]) ? '' : 'none'
                }
                document.getElementById('wrapper-char').style.order = parseInt(getComputedStyle(c).order) + 1
                activMenu(msgIn.data.config.role,'onclick-config')
            }
        }
        document.getElementById('steam-status').style.display = 'none'
        document.getElementById('achiv-value').style.display = 'none'
    }

    document.getElementById('achiv').onmousedown = () => {
        document.getElementById('achiv-value').style.display = 'flex'
        document.getElementById('wrapper-achivmain').style.display = 'flex'
        document.getElementById('wrapper-achivmain').style.order = '1'
        cSetup = 'achiv'
        activMenu(cSetup,'onclick-setup')
        cConfig = document.getElementById('achiv-value').firstElementChild.id
        activMenu(cConfig,'onclick-config')
        for (let a of document.getElementsByClassName('achivments')) {
            if (msgIn.data.config.achiv[0].includes(a.lastElementChild.value)) {
                a.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                a.lastElementChild.checked = true
            } else if (msgIn.data.config.achiv[1].includes(a.lastElementChild.value)) {
                a.style.backgroundImage = "url(../web/img/achiv-row-blue.jpg)"
                a.lastElementChild.checked = false
            } else {
                a.style.backgroundImage = ""
                a.lastElementChild.checked = false
            }
        }

        document.getElementById('steam-status').style.display = 'none'
        document.getElementById('role-value').style.display = 'none'
    }

    for (let c of document.getElementsByClassName('onclick-config')) {
        c.onmousedown = () => {
            cConfig = c.id
            activMenu(cConfig,'onclick-config')
            switch(c.id) {
                case "achivmain": {
                    document.getElementById('wrapper-achivmain').style.order = '1'

                    for (let a of document.getElementsByClassName('achivments')) {
                        if (msgIn.data.config.achiv[0].includes(a.lastElementChild.value)) {
                            a.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                            a.lastElementChild.checked = true
                        } else if (msgIn.data.config.achiv[1].includes(a.lastElementChild.value)) {
                            a.style.backgroundImage = "url(../web/img/achiv-row-blue.jpg)"
                            a.lastElementChild.checked = false
                        } else {
                            a.style.backgroundImage = ""
                            a.lastElementChild.checked = false
                        }
                    }
                    break
                }
                case "achivtop": {
                    document.getElementById('wrapper-achivmain').style.order = '3'

                    for (let a of document.getElementsByClassName('achivments')) {
                        if (msgIn.data.config.achiv[0].includes(a.lastElementChild.value)) {
                            a.style.backgroundImage = "url(../web/img/achiv-row-red.jpg)"
                            a.lastElementChild.checked = false
                        } else if (msgIn.data.config.achiv[1].includes(a.lastElementChild.value)) {
                            a.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                            a.lastElementChild.checked = true
                        } else {
                            a.style.backgroundImage = ""
                            a.lastElementChild.checked = false
                        }
                    }

                    break
                }
                case "mainauto": {
                    
                    break
                }
                default: {
                    changeChar(c)
                    
                    // if (c.id.includes('mainkiller')) document.getElementById('wrapper-char').style.order = '3'
                    // else if (c.id.includes('maincamper')) document.getElementById('wrapper-char').style.order = '5'
                    // settings.role = (c.id != 'mainauto') ? 'mainauto' : c.id
                    // for (let r of document.getElementsByClassName('wrapper-role')) {
                    //     r.style.display = r.id.includes(c.id) ? '' : 'none'
                    // }
                    break
                }
            }
        }
    }
    
    document.getElementById('button').onclick = function() {
        socket.send('1')
        // console.log(msgIn.data.config,cSetup,cConfig)
    }

    function activMenu(cfg,cls) {
        for (let elem of document.getElementsByClassName(cls)) {
            if (elem.id == cfg) elem.style.backgroundImage = "url(../web/img/border-top-hover.png)"
            else elem.style.background = ''
        }
    }

    function activeChar(id) {
        for (let c of document.getElementsByClassName('char')) {
            // c.firstElementChild.style.backgroundImage = c.lastElementChild.value == id ? "url(../web/img/char-hover.png)" : ""
            if (c.lastElementChild.value == id) {
                c.firstElementChild.style.backgroundImage = "url(../web/img/char-hover.png)"
                document.getElementById('ip-1').style.backgroundImage = "url(../web/img/characters/char-"+ id +".png)"
            }
            else c.firstElementChild.style.backgroundImage = ""
        }
    }

    function createAchiv(aTmp) {
        let container = document.getElementById('info-topachiv')
        let topdbd = document.getElementById('topdbd')
        let desc = document.getElementById('desc')

        while (container.firstElementChild) {
            container.removeChild(container.firstElementChild)
        }

        while (topdbd.firstElementChild) {
            topdbd.removeChild(topdbd.firstElementChild)
        }

        let i = 0
        for (let a of aTmp) {
            for (let b of a) {
                if (i == 0) {
                    let achiv = document.createElement('div')
                    achiv.className = 'topachiv'
                    achiv.id = b
    
                    let achivImg = document.createElement('div')
                    achivImg.className = 'topachiv-img'
                    achivImg.style.backgroundImage = 'url(' + msgIn.data.stats.onteh[b].imgUrl +')'
                    achiv.appendChild(achivImg)
    
                    let achivHover = document.createElement('div')
                    achivHover.className = 'topachiv-hover'
                    achiv.appendChild(achivHover)
    
                    container.appendChild(achiv)
                } else {
                    let topachiv = document.createElement('div')

                    let status = ''
                    if (msgIn.data.stats.onteh[b].status > 0) status = 'topup'
                    else if (msgIn.data.stats.onteh[b].status < 0) status = 'topdw'
                    else status = 'topnm'

                    topachiv.id = b
                    topachiv.className = 'topdbd ' + status

                    let tophover = document.createElement('div')
                    tophover.className = 'hover'
                    topachiv.appendChild(tophover)

                    let topdbdImg = document.createElement('div')
                    topdbdImg.className = 'topdbd-img'
                    topdbdImg.style.backgroundImage = 'url(../web/img/achievements/'+ msgIn.data.stats.onteh[b].steamId + '.png)'
                    tophover.appendChild(topdbdImg)

                    topdbd.appendChild(topachiv)
                }
            }
            i++
        }

        if (container.firstElementChild !== null) {
            container.firstElementChild.lastElementChild.style.backgroundImage = 'url(../web/img/topstats-hover-4x4.png)'
            createDesc(desc,container.firstElementChild.id)
        }

        for (let a of container.children) {
            a.onmousedown = () => {
                for (let c of container.children) c.lastElementChild.style.background = ''
                for (let c of topdbd.children) c.firstElementChild.style.background = ''
                a.lastElementChild.style = 'background-image: url(../web/img/topstats-hover-4x4.png); background-size: contain;'

                createDesc(desc,a.id)
            }
        }

        for (let a of topdbd.children) {
            a.onmousedown = () => {
                for (let c of container.children) c.lastElementChild.style.background = ''
                for (let c of topdbd.children) c.firstElementChild.style.background = ''
                a.firstElementChild.style = 'background-image: url(../web/img/topstats-hover.png); background-size: contain;'

                createDesc(desc,a.id)
            }
        }

    }

    function createDesc(desc,nameId) {
        while (desc.firstChild) desc.removeChild(desc.firstChild)

        let main = document.createElement('div')
        main.id = msgIn.data.config.role == 'mainkiller' ? 'main-k' : 'main-c'
        main.className = 'main border'

        let msg = document.createElement('div')
        let message = msgIn.data.stats.onteh[nameId].desc

        let spanPlayer = "<span id='sPlayer'>" + msgIn.data.config.player + " </span>"

        let classPos = ''
        if (msgIn.data.stats.onteh[nameId].status > 0) classPos = 'posUp'
        else if ((msgIn.data.stats.onteh[nameId].status < 0)) classPos = 'posDown'
        else classPos = 'posNm'

        msg.innerHTML = spanPlayer + message
            .replace('{value}',"<span id='sValue'>" + 
                msgIn.data.stats.onteh[nameId].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "</span> " + 
                "<span id='cValueText'>(текущее значение <span id='cValue'>" + msgIn.data.stats.steam[msgIn.data.stats.onteh[nameId].steamId].toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "</span>*)</span>")
            .replace('{place}',"<span id='sPos' class='" + classPos + "'>" + msgIn.data.stats.onteh[nameId].position.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " </span>")

        document.getElementById('last-update').innerText = lastUpdateText + lastUpdate

        desc.appendChild(main)
        desc.appendChild(msg)
    }

    function changeChar(c) {
        msgIn.data.config.role = cConfig
        changeMainInDesc(msgIn.data.config.role)
        document.getElementById('wrapper-char').style.order = parseInt(getComputedStyle(c).order) + 1
        for (let char of document.getElementsByClassName('char')) {
            char.style.display = c.id.includes(char.classList[2]) ? 'flex' : 'none'
        }
    }

    function changeMainInDesc(m) {
        let desc = document.getElementById('desc')
        let main = document.getElementById('main-k') || document.getElementById('main-c')
        
        if (main) desc.removeChild(main)

        let newMain = document.createElement('div')
        newMain.className = 'main border'
        newMain.id = m.includes('killer') ? 'main-k' : 'main-c'

        desc.insertBefore(newMain, desc.firstElementChild)
    }

    function changeAchiv(elem,a,s) {
        switch(s) {
            case "achivmain": {
                if (elem.lastElementChild.checked) {
                    if (msgIn.data.config.achiv[0].includes(elem.lastElementChild.value) && achivTmp[0][elem.lastElementChild.value]) {
                        msgIn.data.config.achiv[0].splice(msgIn.data.config.achiv[0].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[0][elem.lastElementChild.value]

                        elem.lastElementChild.checked = false
                        elem.style.background = ''
                    }
                } else if (Object.keys(msgIn.data.config.achiv[0]).length < 2) {
                    if (msgIn.data.config.achiv[1].includes(elem.lastElementChild.value) && achivTmp[1][elem.lastElementChild.value]) {
                        msgIn.data.config.achiv[1].splice(msgIn.data.config.achiv[1].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[1][elem.lastElementChild.value]

                        elem.lastElementChild.checked = true
                        elem.style.backgroundImage  = "url(../web/img/achiv-row-green.jpg)"
                    } else {
                        elem.lastElementChild.checked = true
                        elem.style.backgroundImage  = "url(../web/img/achiv-row-green.jpg)"
                    }
                    achivTmp[0][elem.lastElementChild.value] = msgIn.data.stats.onteh[a]
                    msgIn.data.config.achiv[0] = Object.keys(sortByPos(achivTmp[0]))
                }
                createAchiv(msgIn.data.config.achiv)
                break
            }
            case "achivtop": {
                if (elem.lastElementChild.checked) {
                    if (msgIn.data.config.achiv[1].includes(elem.lastElementChild.value) && achivTmp[1][elem.lastElementChild.value]) {
                        msgIn.data.config.achiv[1].splice(msgIn.data.config.achiv[1].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[1][elem.lastElementChild.value]

                        elem.lastElementChild.checked = false
                        elem.style.background = ''
                    } 
                } else if (Object.keys(msgIn.data.config.achiv[1]).length < 5) {
                    if (!msgIn.data.config.achiv[0].includes(elem.lastElementChild.value) && !achivTmp[0][elem.lastElementChild.value]) {
                        achivTmp[1][elem.lastElementChild.value] = msgIn.data.stats.onteh[a]
                        msgIn.data.config.achiv[1] = Object.keys(sortByPos(achivTmp[1]))
    
                        elem.lastElementChild.checked = true
                        elem.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                    }
                }
                createAchiv(msgIn.data.config.achiv)
                break
            }
            default: break
        }
    }
}

function sortByPos(obj) {
    let newObj = new Object()
    Object.keys(obj).sort(function(a,b){
        return obj[a].position - obj[b].position
    }).forEach(function(v){
        /* console.log(obj[v].points.toFixed()) */
        newObj[v] = obj[v]
    })
    return newObj
}