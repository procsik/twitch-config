document.addEventListener("load", main())

function main() {
    // init
    let settings = new Object({
        color: '',
        role: '',
        motiv: '',
    })

    document.getElementsByName('color')[0].checked = true
    settings.color = document.getElementsByName('color')[0].value

    document.getElementsByName('role')[1].checked = true
    settings.role = document.getElementsByName('role')[1].value

    document.getElementsByName('motiv')[0].checked = true
    settings.motiv = document.getElementsByName('motiv')[0].value

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

    let char = document.getElementsByName('killer')
    console.log(char)
}