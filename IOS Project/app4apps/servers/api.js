var api = {
    getSchoold(){
        var url = '';
        return fetch(url).then((res)=> res.json());
    }
}

module.exports = api;