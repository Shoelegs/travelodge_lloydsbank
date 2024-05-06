var analyticsElementArray=[];

var pageAnalyticsElementArray=[];

var iosAbvSixTagValue = "N";
var iosBlwSixAndAndroidTagValue = "N";
var txtWtSiXTagValue ="1";
var txtWtTxETagValue ="";
var txtWtTxETagValue ="";
webTrendsForSmartAppBanner();
webTrendsForMLPT();
function webTrendsForSmartAppBanner(){
    var bannerElemForIosAbvSix = document.getElementsByName("smartAppForIosAbvSix");
    var bannerElemForIosBlwSixAndr = document.getElementsByName("smartAppForIosAndAndroid");

    if (bannerElemForIosAbvSix.length == 1){
        if (bannerElemForIosAbvSix[0].value == "true"){
            iosAbvSixTagValue = "Y";
        }
    }

    if (bannerElemForIosBlwSixAndr.length == 1){
        if (bannerElemForIosBlwSixAndr[0].value == "true"){
            iosBlwSixAndAndroidTagValue = "Y";
        }
    }
}

//Changes Start for Mobile Logon Page Takeover
function webTrendsForMLPT() {
    var varBusinessRuleCheckForMLPT = document
            .getElementsByName("businessRuleCheckForMLPTHiddenText");
    if (varBusinessRuleCheckForMLPT[0].value == "true") {
        txtWtTxETagValue = "W3";
        txtWtTxNTagValue = "App Download";
        txtWtSiXTagValue = "0";
    }
}
//Changes End for Mobile Logon Page Takeover


// ************* PAGE SPECIFIC ANALYTICS CONTENT START ***********************//

function PageAnalyticsElement(name, content){

   this.tagAttribute=name;

   this.tagValue = content;

}





pageAnalyticsElementArray['WT.ti'] =  new PageAnalyticsElement('WT.ti','Lloyds TSB - Mobile Banking - Login');



pageAnalyticsElementArray['WT.sp'] =  new PageAnalyticsElement('WT.sp','IB;mobilebanking');



pageAnalyticsElementArray['WT.cg_n'] =  new PageAnalyticsElement('WT.cg_n','Mobile Banking');



pageAnalyticsElementArray['WT.cg_s'] =  new PageAnalyticsElement('WT.cg_s','loginwithreglink');



pageAnalyticsElementArray['WT.si_x'] =  new PageAnalyticsElement('WT.si_x','1');



pageAnalyticsElementArray['WT.si_n'] =  new PageAnalyticsElement('WT.si_n','mobileLogin');

//Changes Start for Mobile  Logon Page Takeover
pageAnalyticsElementArray['WT.si_x'] =  new PageAnalyticsElement('WT.si_x',txtWtSiXTagValue);


pageAnalyticsElementArray['WT.si_n'] =  new PageAnalyticsElement('WT.si_n','Logon');


pageAnalyticsElementArray['WT.tx_e'] =  new PageAnalyticsElement('WT.tx_e',txtWtTxETagValue);


pageAnalyticsElementArray['WT.tx_n'] =  new PageAnalyticsElement('WT.tx_n',txtWtTxNTagValue );
//Changes End for Mobile Logon Page Takeover


pageAnalyticsElementArray['DCSext.SmartAppBannerSwitch'] =  new PageAnalyticsElement('DCSext.SmartAppBannerSwitch',iosAbvSixTagValue);


pageAnalyticsElementArray['DCSext.SmartAppBanner'] =  new PageAnalyticsElement('DCSext.SmartAppBanner',iosBlwSixAndAndroidTagValue);