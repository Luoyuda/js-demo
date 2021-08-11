/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 22:47:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-11 08:06:27
 * @FilePath: /js-demo/refactoring/12.11.js
 */
(() => {
    class CatalogItem{
        constructor(id, title, tags){
            this.id = id
            this.title = title
            this.tags = tags
        }
        hasTag(arg){ return this.tags.includes(arg) }
    }
    class Scroll extends CatalogItem{
        constructor(id, title, tags, dateLastCleaned){
            super(id, title, tags)
            this.lastCleaned = dateLastCleaned
        }
        needsCleaning(targetDate){ 
            const threshold = this.hasTag('revered') ? 700 : 1500
            return this.daysSinceLastCleaning(targetDate) > threshold
        }
        daysSinceLastCleaning(targetDate){ 
            return this.lastCleaned.until(targetDate)
        }
    }
})();
(() => {
    class CatalogItem{
        constructor(id, title, tags){
            this.id = id
            this.title = title
            this.tags = tags
        }
        hasTag(arg){ return this.tags.includes(arg) }
    }
    class Scroll{
        constructor(id, dateLastCleaned, catalogId, catalog){
            this.id = id
            this.catalogItem = catalog.get(catalogId)
            this.lastCleaned = dateLastCleaned
        }
        get id(){return this.catalogItem.id}
        get title(){return this.catalogItem.title}
        get tags(){return this.catalogItem.tags}
        hasTag(arg){ return this.catalogItem.hasTag(arg) }
        needsCleaning(targetDate){ 
            const threshold = this.hasTag('revered') ? 700 : 1500
            return this.daysSinceLastCleaning(targetDate) > threshold
        }
        daysSinceLastCleaning(targetDate){ 
            return this.lastCleaned.until(targetDate)
        }
    }
})();