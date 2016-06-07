function fetchTokenFromServiceWithCompletion(callback){
    fetch(salyangozServiceTokenFetchURL, {
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response);
    });
}

function createPost(title, url, token, id, callback) {
    var data = new FormData();
    data.append('id', id);
    data.append('token', token);
    data.append('title', title);
    data.append('url', url);
    
    fetch(salyangozServiceAddPostURL, {
        method: 'post',
        body: data,
        credentials: 'include'
    }).then(function (response) {
        return response.json()
    }).then(function (response) {
        if (response.success) {
            callback();
        }
    });
}