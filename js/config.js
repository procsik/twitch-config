document.addEventListener("load", main())

function main() {
    // init
    let settings = new Object({
        color: 'dark',
        role: 'auto',
        motiv: '',
        char: '',
        achiv: [
            ["escaped","protectionhits"],
            ["bloodpoints","survivorshealed","escaped_hatch","saved"]
        ]
    })
    let cSetup = ''
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

    // achiv to object
    let i = 0
    for (let a of settings.achiv) {
        achivTmp[i] = {}
        for (let b of a) achivTmp[i][b] = data.stats.onteh[b]
        i++
    }

    for (let setup of document.getElementsByClassName('onclick-setup')) setup.onmousedown = () => {

        for (let s of document.getElementById('column-c').children) {
            if (s.id.includes(setup.id)) {
                s.hidden = false
                for (let c of s.children) {
                    if (c.className.includes('wrapper-role')) {
                        if (c.id.includes(settings.role)) c.style.display = 'flex'
                        else c.style.display = 'none'
                    }
                    c.onmousedown = c.className.includes('onclick-config') ? function() {
                        for (let e of document.getElementsByClassName('wrapper-role')) {
                            e.style.display = e.id.includes(c.id) ? 'flex' : 'none'
                        }
                    } : ''
                }
            } else {
                s.hidden = true
            }
        }
    }

    // achievements 
    // for (let a in sortByPos(data.stats.onteh)) {
    //     let rowAchiv = document.createElement('div')
    //     rowAchiv.className = 'achivments border'
    //     rowAchiv.onclick = () => changeAchiv(rowAchiv,a,cSetup)
    //     rowAchiv.style = 'display: none'

    //     let achivImg = document.createElement('div')
    //     achivImg.className = 'achiv-img border'
    //     achivImg.style.backgroundImage = 'url('+ data.stats.onteh[a].imgUrl +')'
    //     rowAchiv.appendChild(achivImg)

    //     let achivName = document.createElement('div')
    //     achivName.className = 'achiv-name border'
    //     achivName.innerHTML = data.stats.onteh[a].name
    //     rowAchiv.appendChild(achivName)

    //     let achivPos = document.createElement('div')
    //     achivPos.className = 'achiv-pos border'
    //     achivPos.innerHTML = data.stats.onteh[a].position
    //     rowAchiv.appendChild(achivPos)

    //     let rowAchivBox = document.createElement('input')
    //     rowAchivBox.hidden = true
    //     rowAchivBox.type = 'checkbox'
    //     rowAchivBox.name = 'achivments'
    //     rowAchivBox.value = a
    //     rowAchiv.appendChild(rowAchivBox)

    //     document.getElementById('column-c-c').appendChild(rowAchiv)
    // }

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
    
    // document.getElementById('button').onclick = function() {
    //     console.log(settings,cSetup)
    // }

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
    function changeAchiv(elem,a,s) {
        switch(s) {
            case "achivMain": {
                if (elem.lastElementChild.checked) {
                    if (settings.achiv[0].includes(elem.lastElementChild.value) && achivTmp[0][elem.lastElementChild.value]) {
                        settings.achiv[0].splice(settings.achiv[0].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[0][elem.lastElementChild.value]

                        elem.lastElementChild.checked = false
                        elem.style.background = ''
                    } else if (settings.achiv[1].includes(elem.lastElementChild.value) && achivTmp[1][elem.lastElementChild.value] && (Object.keys(settings.achiv[0]).length < 2)) {
                        settings.achiv[1].splice(settings.achiv[1].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[1][elem.lastElementChild.value]

                        achivTmp[0][elem.lastElementChild.value] = data.stats.onteh[a]

                        elem.lastElementChild.checked = true
                        // elem.style.background = '#00FF00'
                        elem.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                    }

                    settings.achiv[0] = Object.keys(sortByPos(achivTmp[0]))
                    settings.achiv[1] = Object.keys(sortByPos(achivTmp[1]))
                } else if ((Object.keys(settings.achiv[0]).length < 2) && !elem.lastElementChild.checked) {
                    elem.lastElementChild.checked = true
                    // elem.style.background = '#00ff00'
                    elem.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"

                    if (!settings.achiv[0].includes(elem.lastElementChild.value)) {
                        achivTmp[0][elem.lastElementChild.value] = data.stats.onteh[a]
                    }

                    settings.achiv[0] = Object.keys(sortByPos(achivTmp[0]))
                }
                break
            }
            case "achiv": {
                if (elem.lastElementChild.checked) {
                    if (settings.achiv[1].includes(elem.lastElementChild.value) && achivTmp[1][elem.lastElementChild.value]) {
                        settings.achiv[1].splice(settings.achiv[1].indexOf(elem.lastElementChild.value),1)
                        delete achivTmp[1][elem.lastElementChild.value]

                        elem.lastElementChild.checked = false
                        elem.style.background = ''
                    }

                    settings.achiv[1] = Object.keys(sortByPos(achivTmp[1]))
                } else if (Object.keys(settings.achiv[1]).length < 5) {
                    elem.lastElementChild.checked = true
                    // elem.style.background = '#00FF00'
                    elem.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"

                    if (!settings.achiv[1].includes(elem.lastElementChild.value)) {
                        achivTmp[1][elem.lastElementChild.value] = data.stats.onteh[a]
                    }

                    settings.achiv[1] = Object.keys(sortByPos(achivTmp[1]))
                }
                break
            }
            default: break
        }
    }

    function unhide(a) {
        switch(a) {
            // case "role": {
            //     for (let child of document.getElementById('column-c').children) {
            //         if (child.id.includes(a)) {
            //             child.style.display = ''
            //             child.hidden = false
            //         }
            //         else {
            //             child.style.display = 'none'
            //             child.hidden = true
            //         }
            //     }
            //     break
            // }
            case "main-auto": {
                for (let c of document.getElementsByClassName('wrapper-role')) {
                    if (c.id != 'wrapper-auto') c.style.display = 'none'
                    else c.style.display = ''
                }
                break
            }
            case "main-killer": {
                for (let c of document.getElementsByClassName('wrapper-role')) {
                    if (c.id != 'wrapper-killer') c.style.display = 'none'
                    else c.style.display = ''
                }
                break
            }
            case "main-camper": {
                for (let c of document.getElementsByClassName('wrapper-role')) {
                    if (c.id != 'wrapper-camper') c.style.display = 'none'
                    else c.style.display = ''
                }
                break
            }
            case "main-achiv": {
                cSetup = a
                for (let c of document.getElementById('column-c-c').children) {
                    document.getElementById('role-value').hidden = true
                    if (Object.keys(c.classList).map(key => c.classList[key]).includes('achivments')) {
                        if (settings.achiv[0].includes(c.lastElementChild.value)) {
                            // c.style.background = '#00FF00'
                            c.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                            c.lastElementChild.checked = true
                        } else if (settings.achiv[1].includes(c.lastElementChild.value)) {
                            // c.style.background = '#0000FF'
                            c.style.backgroundImage = "url(../web/img/achiv-row-blue.jpg)"
                            c.lastElementChild.checked = true
                        } else {
                            c.style.background = ''
                        }
                        c.style.display = ''
                    }
                    else c.style = "display: none"
                }
                break
            }
            case "achiv": {
                cSetup = 'achiv'
                document.getElementById('role-value').hidden = true
                for (let c of document.getElementById('column-c-c').children) {
                    if (Object.keys(c.classList).map(key => c.classList[key]).includes('achivments')) {
                        if (settings.achiv[0].includes(c.lastElementChild.value)) {
                            // c.style.background = '#808080'
                            c.style.backgroundImage = "url(../web/img/achiv-row-red.jpg)"
                        } else if (settings.achiv[1].includes(c.lastElementChild.value)) {
                            // c.style.background = '#00FF00'
                            c.style.backgroundImage = "url(../web/img/achiv-row-green.jpg)"
                            c.lastElementChild.checked = true
                        } else {
                            c.style.background = ''
                        }
                        c.style.display = ''
                    }
                    else c.style = "display: none"
                }
                break
            }
            case "char": {
                cSetup = 'char'
                for (let c of document.getElementById('column-c-c').children) {
                    if (Object.keys(c.classList).map(key => c.classList[key]).includes('char')) {
                        c.style = "display:"
                    }
                    else c.style = "display: none"
                }
                break
            }
            default: {
                for (let child of document.getElementById('column-c').children) {
                    if (child.id.includes(a)) {
                        child.style.display = ''
                        child.hidden = false
                    }
                    else {
                        child.style.display = 'none'
                        child.hidden = true
                    }
                }
                break
            }
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
