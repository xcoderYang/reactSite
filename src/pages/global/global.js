Array.prototype.indexCreate = function(index){
    this.length = 0;
    for(let i=0; i<index; i++){
        this.push(i);
    }   
}