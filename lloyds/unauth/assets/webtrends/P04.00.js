var analyticsElementArray=[];
var pageAnalyticsElementArray=[];
var iosTabletAbvSixTagValue = "N";
var txtWtSiXTagValue ="1";
var txtWtTxETagValue ="";
var txtWtTxETagValue ="";
webTrendsForTabletSmartAppBanner();
webTrendsForMLPT();
function webTrendsForTabletSmartAppBanner() {

    var bannerElemForTabletIos = document.getElementsByName("smartAppForTabletIos");
    if (bannerElemForTabletIos.length == 1) {
        if (bannerElemForTabletIos[0].value == "true") {
            iosTabletAbvSixTagValue = "Y";
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

// ************* PAGE SPECIFIC ANALYTICS CONTENT START **********************//
function PageAnalyticsElement(name, content){
   this.tagAttribute=name;
   this.tagValue = content;
}


pageAnalyticsElementArray['WT.ti'] =  new PageAnalyticsElement('WT.ti','Login');

pageAnalyticsElementArray['WT.sp'] =  new PageAnalyticsElement('WT.sp','Retail Banking');

pageAnalyticsElementArray['WT.cg_n'] =  new PageAnalyticsElement('WT.cg_n','Authentication');

pageAnalyticsElementArray['WT.cg_s'] =  new PageAnalyticsElement('WT.cg_s','Password');

pageAnalyticsElementArray['WT.tx_u'] =  new PageAnalyticsElement('WT.tx_u','1');

pageAnalyticsElementArray['WT.tx_e'] =  new PageAnalyticsElement('WT.tx_e','p');

pageAnalyticsElementArray['WT.tx_s'] =  new PageAnalyticsElement('WT.tx_s','0');

//Changes Start for Mobile Logon Page Takeover
pageAnalyticsElementArray['WT.si_x'] =  new PageAnalyticsElement('WT.si_x',txtWtSiXTagValue);


pageAnalyticsElementArray['WT.si_n'] =  new PageAnalyticsElement('WT.si_n','Logon');


pageAnalyticsElementArray['WT.tx_e'] =  new PageAnalyticsElement('WT.tx_e',txtWtTxETagValue);


pageAnalyticsElementArray['WT.tx_n'] =  new PageAnalyticsElement('WT.tx_n',txtWtTxNTagValue );
//Changes End for Mobile Logon Page Takeover

pageAnalyticsElementArray['DCSext.SmartAppBannerSwitchTNGA'] =  new PageAnalyticsElement('DCSext.SmartAppBannerSwitchTNGA',iosTabletAbvSixTagValue);


// ************* EVENT SPECIFIC ANALYTICS CONTENT START ***********************//
function AnalyticsElement(element, action, tagvalue){
    this.id=element;
    this.event=action;
    this.metatag=tagvalue;
}


analyticsElementArray['frmLogin:btnLogin1'] =  new AnalyticsElement('frmLogin:btnLogin1','click', "'WT.ac','common/properties.btn0001a,common/properties/btn0001b,Continue','WT.si_x','Step 1','WT.si_n','Login'");

