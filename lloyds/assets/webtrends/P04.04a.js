var analyticsElementArray=[];
var pageAnalyticsElementArray=[];


// ************** PAGE SPECIFIC ANALYTICS CONTENT START ***********************//
function PageAnalyticsElement(name, content){
   this.tagAttribute=name;
   this.tagValue = content;
}


pageAnalyticsElementArray['WT.ti'] =  new PageAnalyticsElement('WT.ti','Enter Memorable Information');


// ************* EVENT SPECIFIC ANALYTICS CONTENT START ***********************//
function AnalyticsElement(element, action, tagvalue){
    this.id=element;
    this.event=action;
    this.metatag=tagvalue;
}


analyticsElementArray['frmentermemorableinformation1:btnContinue'] =  new AnalyticsElement('frmentermemorableinformation1:btnContinue','click', "'WT.ac','common/properties.btn0001a,common/properties.btn0001b,Continue','WT.si_x','Step 4','WT.si_n','Login'");

