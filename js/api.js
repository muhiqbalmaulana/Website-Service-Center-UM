/**
 * Created by Bram on 11/04/2017.
 */

// Initialize your app
var sessionStorage=window.sessionStorage,
    localStorage=window.localStorage;

var IsDevelopment=false;
var devices;

//Api Online
var ApiURL = window.location.hostname+"/admin";
// var ApiURL = "http://localhost/sc-um-2018";

var IsProblemCommunication=false;
function CallApi(ajaxsuburl, ajaxdata) {
    if(IsProblemCommunication) {
        return {"Output":"Problem on Comunication!"};
    }

    var returnx;
    var ajax=$.ajax({
        url: ApiURL+"/"+ajaxsuburl,
        type: "POST",
        dataType: "json",
        timeout : 2000,
        async:false,
        tryCount: 0,
        retryLimit: 1,
        data: ajaxdata,
        success:function (data) {
            returnx=data;
            IsProblemCommunication = false;
            $(".loading-loader").addClass("hidden");
        },
        complete: function() {
           // myApp.hidePreloader();
        },
        error: function (xhr, status) {
            if(status == "timeout") {
                this.tryCount++;
                if(this.tryCount <= this.retryLimit) {
                    console.log("Redownload "+ajaxsuburl+" : "+this.tryCount);
                    $.ajax(this);
                } else {
                    IsProblemCommunication = true;
                    console.log("Ajax API : "+ status);

                    return;
                }
            } else {
                IsProblemCommunication = true;
                console.log("Ajax API : "+ status);
                return;
            }
        }
    });

    return returnx;
}

function JStringify(json) {
    var string = JSON.stringify(
        json,
        function(k, v) { if (v === undefined || v === null) { return ""; } return v; }
    );
    return string;
}