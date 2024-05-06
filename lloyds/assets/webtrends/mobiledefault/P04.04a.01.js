var analyticsElementArray=[];
var pageAnalyticsElementArray=[];


// ************* PAGE SPECIFIC ANALYTICS CONTENT START ***********************//
function PageAnalyticsElement(name, content){
   this.tagAttribute=name;
   this.tagValue = content;
}


pageAnalyticsElementArray['WT.ti'] =  new PageAnalyticsElement('WT.ti','Lloyds TSB - Mobile Banking - Enter Memorable Information');

pageAnalyticsElementArray['WT.sp'] =  new PageAnalyticsElement('WT.sp','Mobile Banking');

pageAnalyticsElementArray['WT.cg_n'] =  new PageAnalyticsElement('WT.cg_n','Authentication');

pageAnalyticsElementArray['WT.cg_s'] =  new PageAnalyticsElement('WT.cg_s','Memorable Info');


// ************* EVENT SPECIFIC ANALYTICS CONTENT START ***********************//
function AnalyticsElement(element, action, tagvalue){
    this.id=element;
    this.event=action;
    this.metatag=tagvalue;
}


analyticsElementArray['frmEnterMemorableInformation1:lnkSubmit'] =  new AnalyticsElement('frmEnterMemorableInformation1:lnkSubmit','click', "'WT.ac','/common/mobiledefault/properties.btn0300a','WT.si_x','Step 2','WT.si_n','Login'");

analyticsElementArray['lnk1'] =  new AnalyticsElement('lnk1','click', "'WT.ac','/common/mobiledefault/properties.lnk0309a'");

analyticsElementArray['frmEnterMemorableInformation1:lnkCancel'] =  new AnalyticsElement('frmEnterMemorableInformation1:lnkCancel','click', "'WT.ac','/common/mobiledefault/properties.lnk0300a'");

analyticsElementArray['lnk2'] =  new AnalyticsElement('lnk2','click', "'WT.ac','/modules/m02_footer/mobiledefault/properties.m02lnk301a'");

analyticsElementArray['lnk3'] =  new AnalyticsElement('lnk3','click', "'WT.ac','/modules/m02_footer/mobiledefault/properties.m02lnk304a'");

