var siteName = document.getElementById('name')
var siteURL = document.getElementById('url')
var bookMarkRow = document.getElementById('bookMarkRow')
var submitBtn = document.getElementById('submitBtn')
var boxInfo = document.getElementById('boxInfo')
var bookMarkList

if (localStorage.getItem('list') == null) {
    bookMarkList = []
}
else {
    bookMarkList = JSON.parse(localStorage.getItem('list'))
    display()
}

submitBtn.onclick = function () {
    addBookMark()
}

function addBookMark() {
    if (validation(siteName) && validation(siteURL)) {
        var bookMark = {
            sName: siteName.value,
            sURL: siteURL.value,
        }
        bookMarkList.push(bookMark)
        localStorage.setItem('list', JSON.stringify(bookMarkList))
        clearForm()
        display()
    }
}

function clearForm() {
    siteName.value = null
    siteURL.value = null
}

function display() {
    var box = ''
    for (var i = 0; i < bookMarkList.length; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookMarkList[i].sName}</td>
            <td>
                <button class="btn bg-success text-white" onclick = "visitFun(${i})">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </button>
            </td>
            <td>
                <button class="btn bg-danger text-white" onclick = "deleteFun(${i})">
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }
    bookMarkRow.innerHTML = box
}

function deleteFun(i) {
    bookMarkList.splice(i, 1)
    localStorage.setItem('list', JSON.stringify(bookMarkList))
    display()
}

function visitFun(i) {
    var url = bookMarkList[i].sURL
    window.open(url)
}

function validation(ele) {
    var regex = {
        name: /^[a-zA-Z]{2,}$/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    }
    if (regex[ele.id].test(ele.value)) {
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        return true
    }
    else {
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        return false
    }
}