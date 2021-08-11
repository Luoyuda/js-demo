/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 20:13:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 20:40:57
 * @FilePath: /js-demo/refactoring/8.3.js
 */
(() => {
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(`<p>title: ${person.photo.title}</p>`)
        result.push(emitPhotoData(person.photo))
        return result.join('\n')
    }
    function emitPhotoData(aPhoto){
        const result = []
        result.push(`<p>location: ${aPhoto.location}</p>`)
        result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        return [
            "<div>", 
            `<p>title: ${person.photo.title}</p>`,
            emitPhotoData(person.photo),
            "</div>"
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