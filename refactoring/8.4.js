/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 20:13:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 08:34:12
 * @FilePath: /js-demo/refactoring/8.4.js
 */
(() => {
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(emitPhotoData(person.photo))
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        const result = ["<div>", emitPhotoData(person.photo), "</div>"]
        return result.join('\n')
    }
    function emitPhotoData(aPhoto) {
        return [
            `<p>title: ${aPhoto.title}</p>`,
            `<p>location: ${aPhoto.location}</p>`,
            `<p>date: ${aPhoto.date.toDateString()}</p>`
        ].join('\n')
    }
    const person = {
        name: 'xy',
        photo: {
            title: 'xy-photo',
            name: 'nnn',
            location: 'sz',
            date: new Date(),
            color: 'blue',
        }
    }
    console.log(renderPerson(person))
    console.log('--------------------------------')
    console.log(renderDiv(person))
})();
(() => {
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(emitPhotoData(person.photo))
        result.push(`<p>location: ${person.photo.location}</p>`)
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        const result = ["<div>", 
        emitPhotoData(person.photo),
        `<p>location: ${person.photo.location}</p>`,
        "</div>"]
        return result.join('\n')
    }
    function emitPhotoData(aPhoto) {
        return [
            `<p>title: ${aPhoto.title}</p>`,
            `<p>date: ${aPhoto.date.toDateString()}</p>`
        ].join('\n')
    }
    const person = {
        name: 'xy',
        photo: {
            title: 'xy-photo',
            name: 'nnn',
            location: 'sz',
            date: new Date(),
            color: 'blue',
        }
    }
    console.log(renderPerson(person))
    console.log('--------------------------------')
    console.log(renderDiv(person))
})();