"use strict";(self.webpackChunkblootusk=self.webpackChunkblootusk||[]).push([[870],{870:(z,m,n)=>{n.r(m),n.d(m,{CustomerModule:()=>I});var p=n(6962),u=n(6895),Z=n(9189),a=n(4006),b=n(8796),g=n(1366),x=n(4333),T=n(6362),_=n(7187),w=n(5226),h=n.n(w),t=n(4650),v=n(7668),f=n(6788),C=n(9957);function U(i,l){if(1&i&&(t.TgZ(0,"option",32),t._uU(1),t.qZA()),2&i){const e=l.$implicit;t.Q6J("value",e.id),t.xp6(1),t.hij(" ",e.name," ")}}function A(i,l){if(1&i&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"date"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA()()),2&i){const e=l.$implicit;t.xp6(2),t.hij("",t.xi3(3,3,e.transactionDate,"dd/MM/yyyy")," "),t.xp6(3),t.hij("",e.transactionType," "),t.xp6(2),t.hij("",e.rewardPoint," ")}}let y=(()=>{class i{constructor(e,o,s,r,c){this.appService=e,this.EncrDecr=o,this.route=s,this.tokenStorage=r,this.router=c,this.page=1,this.count=10,this.rewardPointId=0,this.selectedValue="",this.TransactionTypeLists=[{name:"Signup",id:"1"},{name:"Refferal",id:"2"},{name:"Redeem",id:"3"}]}ngOnInit(){this.customerId=this.tokenStorage.getcustcode(),this.phoneNumber=this.tokenStorage.GetPhoneNO(),this.GettemplateList()}getPageData(){const e=(this.page-1)*this.count;return this.CustomerRewardList.slice(e,e+this.count)}onChangeShareCapitalType(e){null!=e.target.value?this.rewardPointId=e.target.value:e.target.value.options=0}GettemplateList(){this.page=0,null==this.rewardPointId&&(this.rewardPointId=0),this.CustPhoneNumber=this.EncrDecr.set("12$#@BLOO$^@TUSK",this.phoneNumber),this.appService.GetAllRewardPonit("api/User/GetCustomerListForReward?rewardPointId="+this.rewardPointId+"&PhoneNumber="+this.CustPhoneNumber).subscribe(e=>{this.CustomerRewardList=e.responseData.customerList,console.log("testrewardpoint",this.CustomerRewardList),0==e.responseData.length&&h().fire({title:"Data not found",icon:"info",confirmButtonColor:"#364574",allowOutsideClick:!1,allowEscapeKey:!1})})}ClearSearchdata(){this.selectedValue="",this.router.navigate(["/customer/rewardpointlist"],{relativeTo:this.route}),this.GettemplateList()}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(v.z),t.Y36(f.z),t.Y36(p.gz),t.Y36(C.i),t.Y36(p.F0))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-rewardpointlist"]],decls:53,vars:3,consts:[[1,"container"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"card-header","card-header-table","align-items-center","d-flex"],[1,"ri-trophy-line","cardicon"],[1,"card-title","mb-0","flex-grow-1"],[1,"flex-shrink-0"],[1,"card-body"],[1,"live-preview"],[1,"row","mb-3"],[1,"col-md-4"],["for","basiInput",1,"form-label"],["aria-label","Default select example",1,"form-select",3,"ngModel","ngModelChange","change"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"col-md-8"],[1,"mt-4","text-right","gap-1"],["type","button",1,"btn","btn-primary","ms-auto",3,"click"],[1,"ri-search-line","cardicon","label-icon","align-middle"],[1,"ri-refresh-line","cardicon","label-icon","align-middle"],[1,"table-responsive"],[1,"table","table-bordered","table-striped","align-middle","table-nowrap","mb-0"],[1,"table-light"],["scope","col"],[4,"ngFor","ngForOf"],[1,"text-center","mt-3"],[1,"gridjs-pagination"],[1,"gridjs-pages"],["tabindex","0","role","button","title","Previous","aria-label","Previous"],["tabindex","0","role","button"],["tabindex","0","role","button","title","Next","aria-label","Next"],[3,"value"]],template:function(o,s){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"i",5),t.TgZ(6,"h4",6),t._uU(7,"Reward Points List"),t.qZA(),t._UZ(8,"div",7),t.qZA(),t.TgZ(9,"div",8)(10,"div",9)(11,"div",3)(12,"div",8)(13,"div",10)(14,"div",11)(15,"div")(16,"label",12),t._uU(17,"Transaction Type "),t.qZA(),t.TgZ(18,"select",13),t.NdJ("ngModelChange",function(c){return s.selectedValue=c})("change",function(c){return s.onChangeShareCapitalType(c)}),t.TgZ(19,"option",14),t._uU(20,"Select a value"),t.qZA(),t.YNc(21,U,2,2,"option",15),t.qZA()()(),t.TgZ(22,"div",16)(23,"div",17)(24,"button",18),t.NdJ("click",function(){return s.GettemplateList()}),t._UZ(25,"i",19),t._uU(26,"Search"),t.qZA(),t._uU(27," \xa0 "),t.TgZ(28,"button",18),t.NdJ("click",function(){return s.ClearSearchdata()}),t._UZ(29,"i",20),t._uU(30,"Clear"),t.qZA()()()()()(),t._UZ(31,"hr"),t.TgZ(32,"div",21)(33,"table",22)(34,"thead",23)(35,"tr")(36,"th",24),t._uU(37,"Transaction Date"),t.qZA(),t.TgZ(38,"th",24),t._uU(39,"Transaction Type"),t.qZA(),t.TgZ(40,"th",24),t._uU(41,"Reward Points"),t.qZA()()(),t.TgZ(42,"tbody"),t.YNc(43,A,8,6,"tr",25),t.qZA()()(),t.TgZ(44,"div",26)(45,"div",27)(46,"div",28)(47,"button",29),t._uU(48,"Previous"),t.qZA(),t.TgZ(49,"button",30),t._uU(50,"1"),t.qZA(),t.TgZ(51,"button",31),t._uU(52,"Next"),t.qZA()()()()()()()()()()),2&o&&(t.xp6(18),t.Q6J("ngModel",s.selectedValue),t.xp6(3),t.Q6J("ngForOf",s.TransactionTypeLists),t.xp6(22),t.Q6J("ngForOf",s.CustomerRewardList))},dependencies:[u.sg,a.YN,a.Kr,a.EJ,a.JJ,a.On,u.uU]})}return i})();var O=n(262),P=n(2843),D=n(3259),M=n(4159),N=n.n(M),L=n(6626);function q(i,l){1&i&&(t.TgZ(0,"a",27),t._UZ(1,"i",28),t.qZA())}function S(i,l){1&i&&(t.TgZ(0,"a",27),t._UZ(1,"i",29),t.qZA())}function J(i,l){if(1&i){const e=t.EpF();t.TgZ(0,"div",6),t.NdJ("click",function(){const r=t.CHM(e).$implicit,c=t.oxw(),d=t.MAs(5);return t.KtG(c.openModalQR(d,r.couponCode))}),t.TgZ(1,"div",7)(2,"div",8)(3,"div",9)(4,"div",10)(5,"div",11),t._UZ(6,"img",12),t.qZA()(),t.TgZ(7,"div",10)(8,"div",13)(9,"div",14)(10,"h4"),t._uU(11),t.YNc(12,q,2,0,"a",15),t.YNc(13,S,2,0,"a",15),t._uU(14," Off "),t.qZA()()()(),t.TgZ(15,"div",10)(16,"div",13)(17,"div",14)(18,"h6"),t._uU(19),t.qZA()()()(),t.TgZ(20,"div",10)(21,"div",13)(22,"div",14)(23,"h5"),t._uU(24),t.qZA()()()(),t.TgZ(25,"div",10),t._UZ(26,"div",16),t.TgZ(27,"div",17)(28,"div",18)(29,"h5",19),t._uU(30),t.qZA()()(),t._UZ(31,"div",16),t.qZA(),t.TgZ(32,"div",20)(33,"table")(34,"tr")(35,"td",21)(36,"tr")(37,"td",22),t._UZ(38,"img",23),t.qZA(),t.TgZ(39,"td",22)(40,"h6",24),t._uU(41,"Campaign Source"),t.qZA(),t.TgZ(42,"h5",25),t._uU(43,"Johnny Depp"),t.qZA()()()(),t.TgZ(44,"td",26)(45,"h6",24),t._uU(46,"Expire Date"),t.qZA(),t.TgZ(47,"h5",25),t._uU(48),t.ALo(49,"date"),t.qZA()()()()()()()()()}if(2&i){const e=l.$implicit;t.xp6(11),t.hij("",e.discountValue," "),t.xp6(1),t.Q6J("ngIf","percentage"==e.discountType),t.xp6(1),t.Q6J("ngIf","dollar"==e.discountType),t.xp6(6),t.Oqu(e.couponDiscerption),t.xp6(5),t.Oqu(e.merchantDetail),t.xp6(6),t.hij("Coupon Code : ",e.couponCode,""),t.xp6(18),t.Oqu(t.xi3(49,7,e.endDate,"dd/MM/yyyy"))}}function R(i,l){if(1&i&&(t.TgZ(0,"div",38),t._UZ(1,"img",39)(2,"img",40),t.qZA()),2&i){const e=l.$implicit,o=t.oxw(2);t.Q6J("id",e),t.xp6(2),t.s9C("src",o.qrCode,t.LSH)}}function F(i,l){if(1&i){const e=t.EpF();t.TgZ(0,"div",30)(1,"h5",31),t._uU(2,"QR Code"),t.qZA(),t.TgZ(3,"button",32),t.NdJ("click",function(){const r=t.CHM(e).$implicit;return t.KtG(r.dismiss("Cross click"))}),t.qZA()(),t.TgZ(4,"div",33)(5,"div")(6,"form")(7,"div",2)(8,"div",13),t.YNc(9,R,3,2,"div",34),t.qZA()(),t.TgZ(10,"div",35)(11,"a",36),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.trivialDownload())}),t._UZ(12,"i",37),t._uU(13," Download QR Code"),t.qZA()()()()()}if(2&i){const e=t.oxw();t.xp6(9),t.Q6J("ngForOf",e.array)}}const k=[{path:"referrallist",component:_.N},{path:"rewardpointlist",component:y},{path:"discountcouponlist",component:(()=>{class i{constructor(e,o,s,r,c,d,j,G){this.formBuilder=e,this.modalService=o,this.appService=s,this.route=r,this._authService=c,this.tokenStorage=d,this.router=j,this.EncrDecr=G,this.array=["Qr"]}ngOnInit(){this.customerId=this.tokenStorage.getcustcode(),this.CustPhoneNumber=this.tokenStorage.GetPhoneNO(),this.phoneNumber=this.EncrDecr.set("12$#@BLOO$^@TUSK",this.CustPhoneNumber),this.GetCouponList()}GetCouponList(){this.appService.GetAllList("api/CouponMaster/GetCustomerCouponList",{phoneNumber:""==this.phoneNumber?"":this.phoneNumber,customerId:0}).pipe((0,O.K)(o=>(0,P._)(o))).subscribe(o=>{this.CustomerCouponList=o.responseData,0==o.responseData.length&&this.swalMessage("Data not found")})}swalMessage(e){h().fire({title:e,icon:"info",confirmButtonColor:"#364574",allowOutsideClick:!1,allowEscapeKey:!1})}openModalQR(e,o){this.receivedLink="/"+o+"/"+this.CustPhoneNumber,this.receivedLink="http://crm.blootusk.com/CouponCode="+o+"/"+this.CustPhoneNumber,D.hz(this.receivedLink,(s,r)=>{s?console.error(s):this.qrCode=r}),this.modalService.open(e,{size:"sm"})}trivialDownload(){console.log("Downloading image one by one, without a loop"),this._download(0,this.array)}_download(e,o){if(e>=o.length)console.log("Done!");else{let s=document.getElementById(o[e].toString());N()(s).then(r=>{let c=r.toDataURL("image/png").replace("image/png","image/octet-stream"),d=document.createElement("a");d.href=c,d.download=`${o[e]}.png`,d.click(),this._download(e+1,o)})}}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(a.qu),t.Y36(g.FF),t.Y36(v.z),t.Y36(p.gz),t.Y36(L.$),t.Y36(C.i),t.Y36(p.F0),t.Y36(f.z))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-discountcouponlist"]],decls:6,vars:1,consts:[[1,"row","project-wrapper"],[1,"col-xxl-8"],[1,"row"],["class","col-xl-5",3,"click",4,"ngFor","ngForOf"],["role","document"],["qrcontent",""],[1,"col-xl-5",3,"click"],[1,"animate"],[1,"card-body","cupbody"],[1,""],[1,"row","mb-0"],[1,"col-md-6","mt-1"],["src","../../../../assets/images/cupico.png","alt","","height","30",1,"cupico"],[1,"col-md-12"],[1,"mt-2"],["class","link-success fs-15",4,"ngIf"],[1,"col-md-1"],[1,"col-md-10"],[1,"cupcd"],[1,"mb-0"],[1,"row","mb-0","mt-2"],[1,"w-40"],[1,"w-4"],["src","../../../../assets/images/jdepp.png","alt","","height","40",1,"cupimg"],[1,"cpdt"],[1,"cpd"],[1,"w-30"],[1,"link-success","fs-15"],[1,"ri-percent-line"],[1,"bx","bx-dollar"],[1,"modal-header"],[1,"modal-title","mt-0"],["type","button","aria-hidden","true",1,"btn-close",3,"click"],[1,"modal-body"],["class","qr-code-container",3,"id",4,"ngFor","ngForOf"],[1,"mt-3","text-center"],["type","submit",1,"btn","btn-success",3,"click"],[1,"ri-download-line","label-icon","align-middle","me-2"],[1,"qr-code-container",3,"id"],["src","assets/images/Logo_squre.jpg","alt","Logo",1,"logo"],["alt","QR Code",1,"qr-code",3,"src"]],template:function(o,s){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t.YNc(3,J,50,10,"div",3),t.qZA(),t.YNc(4,F,14,1,"ng-template",4,5,t.W1O),t.qZA()()),2&o&&(t.xp6(3),t.Q6J("ngForOf",s.CustomerCouponList))},dependencies:[u.sg,u.O5,a._Y,a.JL,a.F,u.uU],styles:[".project-wrapper[_ngcontent-%COMP%]{background:white!important;border-radius:10px;margin-top:-10px;margin-bottom:10px;padding-bottom:12px}.cupico[_ngcontent-%COMP%]{margin-left:-5px}.cupbody[_ngcontent-%COMP%]{background:#f5f8fe;border-radius:18px;border:2px solid #c6c6c6;padding:15px!important;margin-top:12px}.cupcd[_ngcontent-%COMP%]{text-align:center;background:#f8fbff;border-radius:50px;border:2px solid #c6c6c6;padding:8px!important;margin:10px}.w-30[_ngcontent-%COMP%]{border-left:1px solid #bebebe;padding-left:10px}.cpdt[_ngcontent-%COMP%]{color:#a3a3a3;font-size:12px}.cpd[_ngcontent-%COMP%]{font-size:13px}.w-4[_ngcontent-%COMP%]{padding-left:5px}.cupimg[_ngcontent-%COMP%]{border-radius:50%;margin-top:-8px}ngx-qrcode[_ngcontent-%COMP%]{width:200px;height:200px}.qr-code-container[_ngcontent-%COMP%]{position:relative}.logo[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:70px;height:70px}.qr-code[_ngcontent-%COMP%]{width:100%;height:100%}"]})}return i})()}];let I=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#o=this.\u0275inj=t.cJS({imports:[u.ez,b.A0,g.Oz,Z.O,p.Bz.forChild(k),a.u5,x.JX,a.u5,T.JT,a.UX,g.IJ,p.Bz]})}return i})()}}]);