module.exports = function(req, res){
    return res.render('websocket_view', {
        x: 5,
        y: 78
    });
}