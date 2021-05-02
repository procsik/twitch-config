document.addEventListener("load", main())

function main() {
    // init
    let settings = new Object({
        color: '',
        role: 'mainauto',
        motiv: '',
        char: '',
        achiv: [
            ["escaped","protectionhits"],
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

    document.getElementById('role').onmousedown = () => {
        cSetup = 'role'
        activMenu(cSetup,'onclick-setup')
        cConfig = ''
        document.getElementById('role-value').style.display = 'flex'
        for (let c of document.getElementById('role-value').children) {
            if (c.className.includes('wrapper-role')) {
                if (c.id.includes(settings.role)) {
                    c.style.display = 'flex'
                    cConfig = settings.role
                    activMenu(cConfig,'onclick-config')
                } else {
                    c.style.display = 'none'
                }
            }
            // c.style.display = c.id.includes(settings.role) ? 'flex' : 'none'
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
                default: {
                    for (let r of document.getElementsByClassName('wrapper-role')) {
                        r.style.display = r.id.includes(c.id) ? 'flex' : 'none'
                    }
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
        }

        for (let a of container.children) {
            a.onmousedown = () => {
                for (let c of container.children) c.lastElementChild.style.background = ''
                a.lastElementChild.style.backgroundImage = 'url(../web/img/topstats-hover-4x4.png)'

                while (desc.firstChild) desc.removeChild(desc.firstChild)
                let msg = document.createElement('div')
                let message = data.stats.onteh[a.id].desc
                msg.innerHTML = message
                    .replace('{value}',data.stats.onteh[a.id].value)
                    .replace('{place}',data.stats.onteh[a.id].position)

                let main = document.createElement('div')
                main.id = 'main-k'
                main.className = 'border'

                desc.appendChild(main)
                desc.appendChild(msg)
            }
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

function showChar(c) {
    switch(c) {
        case 'killer': {
            for (let char of document.getElementsByName('char')) {
                char.lastElementChild.checked = false
                if (char.lastElementChild.value[0] == 'K') char.hidden = false
                else char.hidden = true
            }
            break
        }
        case 'camper': {
            for (let char of document.getElementsByName('char')) {
                char.lastElementChild.checked = false
                if (char.lastElementChild.value[0] == 'C') char.hidden = false
                else char.hidden = true
            }
            break
        }
        default: break
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