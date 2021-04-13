document.addEventListener("load", main())

function main() {
    // init
    document.getElementsByName('color')[0].checked = true
    document.getElementsByName('role')[1].checked = true

    let color = document.getElementsByClassName('color')
    for (let c of color) {
        c.onclick = function() {
            c.lastElementChild.checked = true
        }
    }

    let role = document.getElementsByClassName('role')
    for (let r of role) {
        r.onclick = function() {
            r.lastElementChild.checked = true
        }
    }
    
}

