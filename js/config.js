document.addEventListener("load", main())

function main() {
    // init
    let settings = new Object({
        player: 'Logicandintuition',
        color: '',
        role: 'mainkiller',
        motiv: '',
        char: 3,
        achiv: [
            ["obsessionshealed","protectionhits"],
            ["bloodpoints","survivorshealed","escaped_hatch","saved"]
        ]
    })
    let cSetup = ''
    let cConfig = ''
    let achivTmp = {}

    // COLOR
    switch(settings.color) {
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
    for (let c in data.character) {
        let char = document.createElement('div')
        char.className = 'char border ' + data.character[c].type
        char.style.display = 'none'
        char.style.backgroundImage = 'url(' + data.character[c].imgUrl + ')'
        char.onclick = () => {
            settings.char = parseInt(char.lastElementChild.value)
            char.lastElementChild.checked = true
            activeChar(settings.char)
        }

        let charHover = document.createElement('div')
        charHover.className = 'char-hover border'
        char.appendChild(charHover)

        let charInput = document.createElement('input')
        charInput.type = 'radio'
        charInput.name = 'character'
        charInput.value = data.character[c].id
        // charInput.style.display = 'none'
        charInput.checked = charInput.value == settings.char ? true : false
        char.appendChild(charInput)

        document.getElementById('wrapper-char').appendChild(char)
        // switch(data.character[c].type) {
        //     case "killer": {
        //         let char = document.createElement('div')
        //         char.classList = 'char border'
        //         char.style.backgroundImage = 'url(../web/img/K01.png)'

        //         let charInput = document.createElement('input')
        //         charInput.type = 'radio'
        //         charInput.name = 'character'
        //         charInput.value = data.character[c].id
        //         char.appendChild(charInput)

        //         document.getElementById('wrapper-mainkiller').appendChild(char)
        //         break
        //     }
        //     case "camper": {
        //         let char = document.createElement('div')
        //         char.classList = 'char border'
        //         char.style.backgroundImage = 'url(../web/img/K01.png)'

        //         let charInput = document.createElement('input')
        //         charInput.type = 'radio'
        //         charInput.name = 'character'
        //         charInput.value = data.character[c].id
        //         char.appendChild(charInput)

        //         document.getElementById('wrapper-maincamper').appendChild(char)
        //         break
        //     }
        //     default: break
        // }
    }

    // achievements 
    for (let a in sortByPos(data.stats.onteh)) {
        let rowAchiv = document.createElement('div')
        rowAchiv.className = 'achivments border'
        rowAchiv.onclick = () => changeAchiv(rowAchiv,a,cConfig)
        // rowAchiv.style = 'display: none'

        let achivImg = document.createElement('div')
        achivImg.className = 'achiv-img border'
        achivImg.style.backgroundImage = 'url('+ data.stats.onteh[a].imgUrl +')'
        rowAchiv.appendChild(achivImg)

        let achivName = document.createElement('div')
        achivName.className = 'achiv-name border'
        achivName.innerHTML = data.stats.onteh[a].name
        rowAchiv.appendChild(achivName)

        let achivPos = document.createElement('div')
        achivPos.className = 'achiv-pos border'
        achivPos.innerHTML = data.stats.onteh[a].position
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
    for (let a of settings.achiv) {
        achivTmp[i] = {}
        for (let b of a) achivTmp[i][b] = data.stats.onteh[b]
        i++
    }

    createAchiv(settings.achiv)
    activeChar(settings.char)

    document.getElementById('role').onmousedown = () => {
        //cSetup = 'role'
        activMenu('role','onclick-setup')
        cConfig = ''
        document.getElementById('role-value').style.display = 'flex'
        
        for (let c of document.getElementById('role-value').children) {
            if (c.id.includes(settings.role)) {
                for (let char of document.getElementsByClassName('char')) {
                    if (settings.role.includes(char.classList[2])) {
                        char.style.display = ''
                        activeChar(settings.char)
                    }
                    
                    // char.style.display = settings.role.includes(char.classList[2]) ? '' : 'none'
                }
                document.getElementById('wrapper-char').style.order = parseInt(getComputedStyle(c).order) + 1
                activMenu(settings.role,'onclick-config')
            }
        }

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
            if (settings.achiv[0].includes(a.lastElementChild.value)) {
                a.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                a.lastElementChild.checked = true
            } else if (settings.achiv[1].includes(a.lastElementChild.value)) {
                a.style.backgroundImage = "url(../web/img/achiv-row-blue.jpg)"
                a.lastElementChild.checked = false
            } else {
                a.style.backgroundImage = ""
                a.lastElementChild.checked = false
            }
        }

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
                        if (settings.achiv[0].includes(a.lastElementChild.value)) {
                            a.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                            a.lastElementChild.checked = true
                        } else if (settings.achiv[1].includes(a.lastElementChild.value)) {
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
                        if (settings.achiv[0].includes(a.lastElementChild.value)) {
                            a.style.backgroundImage = "url(../web/img/achiv-row-red.jpg)"
                            a.lastElementChild.checked = false
                        } else if (settings.achiv[1].includes(a.lastElementChild.value)) {
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

    // character
    // for (let c of document.getElementsByClassName('wrapper-role')) 
    //     c.style.display = c.id.includes(settings.role) ? '' : 'none'

    // Object.keys(data.character).forEach(key => {
    //     let character = document.createElement('div')
    //     character.className = 'char border ' + data.character[key].type
    //     character.style = 'display: none'
    //     character.innerHTML = data.character[key].type + ' ' + data.character[key].id
    //     character.onclick = () => {
    //         settings.char = character.lastElementChild.value
    //         character.lastElementChild.checked = true
    //     }

    //     let characterInput = document.createElement('input')
    //     characterInput.type = 'radio'
    //     characterInput.name = 'character'
    //     characterInput.value = data.character[key].id
    //     character.appendChild(characterInput)

    //     document.getElementById('column-c-c').appendChild(character)
    // })

    // document.getElementsByName('color')[0].checked = true
    // settings.color = document.getElementsByName('color')[0].value

    // document.getElementsByName('role')[1].checked = true
    // settings.role = document.getElementsByName('role')[1].value

    // document.getElementsByName('motiv')[0].checked = true
    // settings.motiv = document.getElementsByName('motiv')[0].value

    // for (let char of document.getElementsByName('char')) {
    //     char.hidden = true
    // }

    // main

    // let color = document.getElementsByClassName('color')
    // for (let c of color) {
    //     c.onmousedown = function() {
    //         cSetup = 'color'
    //         c.lastElementChild.checked = true
    //         settings.color = c.lastElementChild.value
    //     }
    // }

    // document.getElementById('role').onmousedown = () => unhide(document.getElementById('role').id)
    // document.getElementById('main-auto').onmousedown = () => unhide(document.getElementById('main-auto').id)
    // document.getElementById('main-killer').onmousedown = () => unhide(document.getElementById('main-killer').id)
    // document.getElementById('main-camper').onmousedown = () => unhide(document.getElementById('main-camper').id)

    // let role = document.getElementsByClassName('role')
    // for (let r of role) {
    //     r.onmousedown = () => {
    //         cSetup = 'role'
    //         r.lastElementChild.checked = true
    //         settings.role = r.lastElementChild.value
    //     }
    // }

    // document.getElementById('char').onmousedown = (a) => unhide(a.target.id)

    // let achivSetup = document.getElementsByClassName('achiv')
    // for (let a of achivSetup) a.onmousedown = () => {
    //     unhide(a.id)
    // }

    // document.getElementById('character').onmousedown = () => {
    //     showChar(settings.role)
    // }
    
    // let motiv = document.getElementsByClassName('motiv')
    // for (let m of motiv) {
    //     m.onmousedown = function() {
    //         cSetup = 'motiv'
    //         m.lastElementChild.checked = true
    //         settings.motiv = m.lastElementChild.value
    //     }
    // }
    
    document.getElementById('button').onclick = function() {
        console.log(settings,cSetup,cConfig)
    }

    // let char = document.getElementsByName('char')
    // for (let c of char) {
    //     c.onmousedown = function() {
    //         c.lastElementChild.checked = true
    //         settings.char = c.lastElementChild.value
    //     }
    // }

    /* let achiv = document.getElementsByClassName('achivments')
    for (let a of achiv) {
        a.onmousedown = () => {
            if (a.lastElementChild.checked) a.lastElementChild.checked = false
            else a.lastElementChild.checked = true
        }
    } */

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
        let desc = document.getElementById('desc')

        while (container.firstChild) {
            container.removeChild(container.firstChild)
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
                    achivImg.style.backgroundImage = 'url(' + data.stats.onteh[b].imgUrl +')'
                    achiv.appendChild(achivImg)
    
                    let achivHover = document.createElement('div')
                    achivHover.className = 'topachiv-hover'
                    achiv.appendChild(achivHover)
    
                    container.appendChild(achiv)
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
                a.lastElementChild.style.backgroundImage = 'url(../web/img/topstats-hover-4x4.png)'

                createDesc(desc,a.id)
            }
        }

    }

    function createDesc(desc,nameId) {
        while (desc.firstChild) desc.removeChild(desc.firstChild)

        let msg = document.createElement('div')
        let message = data.stats.onteh[nameId].desc

        let spanPlayer = "<span id='sPlayer'>" + settings.player + " </span>"

        let classPos = ''
        if (data.stats.onteh[nameId].status > 0) classPos = 'posUp'
        else if ((data.stats.onteh[nameId].status < 0)) classPos = 'posDown'
        else classPos = 'posNm'

        msg.innerHTML = spanPlayer + message
            .replace('{value}',"<span id='sValue'>" + 
                data.stats.onteh[nameId].value + " </span>" + 
                "<span id='cValueText'>(текущее значение <span id='cValue'>" + data.stats.steam[data.stats.onteh[nameId].steamId].toFixed() + "</span>)</span>")
            .replace('{place}',"<span id='sPos' class='" + classPos + "'>" + data.stats.onteh[nameId].position + " </span>")

        let main = document.createElement('div')
        main.id = 'main-k'
        main.className = 'border'

        desc.appendChild(main)
        desc.appendChild(msg)
    }

    function changeChar(c) {
        settings.role = cConfig
        document.getElementById('wrapper-char').style.order = parseInt(getComputedStyle(c).order) + 1
        for (let char of document.getElementsByClassName('char')) {
            char.style.display = c.id.includes(char.classList[2]) ? 'flex' : 'none'
        }
    }

    function changeAchiv(elem,a,s) {
        switch(s) {
            case "achivmain": {
                if (elem.lastElementChild.checked) {
                    if (settings.achiv[0].includes(elem.lastElementChild.value) && achivTmp[0][elem.lastElementChild.value]) {
                        settings.achiv[0].splice(settings.achiv[0].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[0][elem.lastElementChild.value]

                        elem.lastElementChild.checked = false
                        elem.style.background = ''
                    }
                } else if (Object.keys(settings.achiv[0]).length < 2) {
                    if (settings.achiv[1].includes(elem.lastElementChild.value) && achivTmp[1][elem.lastElementChild.value]) {
                        settings.achiv[1].splice(settings.achiv[1].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[1][elem.lastElementChild.value]

                        elem.lastElementChild.checked = true
                        elem.style.backgroundImage  = "url(../web/img/achiv-row-green.jpg)"
                    } else {
                        elem.lastElementChild.checked = true
                        elem.style.backgroundImage  = "url(../web/img/achiv-row-green.jpg)"
                    }
                    achivTmp[0][elem.lastElementChild.value] = data.stats.onteh[a]
                    settings.achiv[0] = Object.keys(sortByPos(achivTmp[0]))
                }
                createAchiv(settings.achiv)
                break
            }
            case "achivtop": {
                if (elem.lastElementChild.checked) {
                    if (settings.achiv[1].includes(elem.lastElementChild.value) && achivTmp[1][elem.lastElementChild.value]) {
                        settings.achiv[1].splice(settings.achiv[1].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[1][elem.lastElementChild.value]

                        elem.lastElementChild.checked = false
                        elem.style.background = ''
                    } 
                } else if (Object.keys(settings.achiv[1]).length < 5) {
                    if (!settings.achiv[0].includes(elem.lastElementChild.value) && !achivTmp[0][elem.lastElementChild.value]) {
                        achivTmp[1][elem.lastElementChild.value] = data.stats.onteh[a]
                        settings.achiv[1] = Object.keys(sortByPos(achivTmp[1]))
    
                        elem.lastElementChild.checked = true
                        elem.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                    }
                }
                break
            }
            default: break
        }
    }
}

function sortByPos(obj) {
    let newObj = new Object()
    Object.keys(obj).sort(function(a,b){
        /* if (obj[a].weight < obj[b].weight) return -1
        if (obj[a].weight > obj[b].weight) return 1
        if (obj[a].position < obj[b].position) return -1
        if (obj[a].position > obj[b].position) return 1
        return 0 */
        //if (obj[a].position < obj[b].position) return obj[a].position - obj[b].position
        return obj[a].position - obj[b].position
    }).forEach(function(v){
        /* console.log(obj[v].points.toFixed()) */
        newObj[v] = obj[v]
    })
    return newObj
}