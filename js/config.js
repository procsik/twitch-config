document.addEventListener("load", main())

function main() {
    // init
    let settings = new Object({
        color: '',
        role: '',
        motiv: '',
        char: ''
    })

    // achievements 
    for (let a in data.stats.onteh) {
        let rowAchiv = document.createElement('div')
        rowAchiv.className = 'achivments border'

        let rowAchivBox = document.createElement('input')
        rowAchivBox.type = 'checkbox'
        rowAchivBox.name = 'achivments'
        rowAchivBox.value = a
        rowAchiv.hidden = true
        rowAchiv.innerHTML = data.stats.onteh[a].name

        rowAchiv.onmousedown = () => {
            if (rowAchiv.lastElementChild.checked) rowAchiv.lastElementChild.checked = false
            else rowAchiv.lastElementChild.checked = true
        }

        rowAchiv.appendChild(rowAchivBox)

        document.getElementById('column-c').appendChild(rowAchiv)
        //data.stats.onteh[a]
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