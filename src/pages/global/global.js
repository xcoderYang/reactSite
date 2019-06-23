Array.prototype.indexCreate = function(index, hard){
    this.length = 0;
    let i = hard?1:0;
    while(index--){
        this.push(i++);
    }  
}