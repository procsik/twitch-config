document.addEventListener("load", main())

function main() {
    // init
    let settings = new Object({
        color: '',
        role: '',
        motiv: '',
        char: '',
        achiv: []
    })
    let achivTmp = {}

    // achievements 
    for (let a in sortByPos(data.stats.onteh)) {
        let rowAchiv = document.createElement('div')
        rowAchiv.className = 'achivments border'
        rowAchiv.onclick = () => {
            if (rowAchiv.lastElementChild.checked) {
                rowAchiv.lastElementChild.checked = false
                rowAchiv.style.background = ''

                /* if (settings.achiv[rowAchiv.lastElementChild.value]) {
                    delete settings.achiv[rowAchiv.lastElementChild.value]
                } */

                if (settings.achiv.includes(rowAchiv.lastElementChild.value) && achivTmp[rowAchiv.lastElementChild.value]) {
                    settings.achiv.splice(settings.achiv.indexOf(rowAchiv.lastElementChild.value),1)
                    delete achivTmp[rowAchiv.lastElementChild.value]
                } 
                settings.achiv = Object.keys(sortByPos(achivTmp))
            }
            else if (Object.keys(settings.achiv).length < 5) {
                rowAchiv.lastElementChild.checked = true
                rowAchiv.style.background = '#00ff00'
                /* if (settings.achiv[rowAchiv.lastElementChild.value] === undefined) {
                    settings.achiv[rowAchiv.lastElementChild.value] = data.stats.onteh[a]
                }  */

                if (!settings.achiv.includes(rowAchiv.lastElementChild.value)) {
                    //settings.achiv.push(rowAchiv.lastElementChild.value)
                    achivTmp[rowAchiv.lastElementChild.value] = data.stats.onteh[a]
                }
                settings.achiv = Object.keys(sortByPos(achivTmp))
            }
        }

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
        rowAchivBox.type = 'checkbox'
        rowAchivBox.name = 'achivments'
        rowAchivBox.value = a
        rowAchivBox.hidden = true
        rowAchiv.appendChild(rowAchivBox)

        document.getElementById('column-c').appendChild(rowAchiv)
    }

    document.getElementsByName('color')[0].checked = true
    settings.color = document.getElementsByName('color')[0].value

    document.getElementsByName('role')[1].checked = true
    settings.role = document.getElementsByName('role')[1].value

    document.getElementsByName('motiv')[0].checked = true
    settings.motiv = document.getElementsByName('motiv')[0].value

    for (let char of document.getElementsByName('char')) {
        char.hidden = true
    }

    // main

    let color = document.getElementsByClassName('color')
    for (let c of color) {
        c.onmousedown = function() {
            c.lastElementChild.checked = true
            settings.color = c.lastElementChild.value
        }
    }

    let role = document.getElementsByClassName('role')
    for (let r of role) {
        r.onmousedown = function() {
            r.lastElementChild.checked = true
            settings.role = r.lastElementChild.value
        }
    }

    document.getElementById('character').onmousedown = () => {
        showChar(settings.role)
    }
    
    let motiv = document.getElementsByClassName('motiv')
    for (let m of motiv) {
        m.onmousedown = function() {
            m.lastElementChild.checked = true
            settings.motiv = m.lastElementChild.value
        }
    }
    
    document.getElementById('button').onclick = function() {
        console.log(settings)
    }

    let char = document.getElementsByName('char')
    for (let c of char) {
        c.onmousedown = function() {
            c.lastElementChild.checked = true
            settings.char = c.lastElementChild.value
        }
    }

    /* let achiv = document.getElementsByClassName('achivments')
    for (let a of achiv) {
        a.onmousedown = () => {
            if (a.lastElementChild.checked) a.lastElementChild.checked = false
            else a.lastElementChild.checked = true
        }
    } */
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
        return obj[a].position - obj[b].position
    }).forEach(function(v){
        /* console.log(obj[v].points.toFixed()) */
        newObj[v] = obj[v]
    })
    return newObj
}
