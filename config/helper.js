const helper={};


helper.response=function(response,status_code,message,data){
    var ret=-{
        code:status_code,
        message:message
    };
    if(data){
        Object.assign(ret,data);
    }
    response.api_message=message || '';
    response.status(status_code).json(ret);
}