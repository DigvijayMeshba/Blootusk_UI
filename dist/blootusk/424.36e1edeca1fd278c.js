"use strict";(self.webpackChunkblootusk=self.webpackChunkblootusk||[]).push([[424],{6424:(B,p,r)=>{r.r(p),r.d(p,{ReportsModule:()=>Q});var u=r(6962),c=r(6895),v=r(9189),s=r(4006),T=r(8796),m=r(1366),A=r(6959),M=r(5226),h=r.n(M),b=r(262),_=r(2843),t=r(4650),f=r(7668),Z=r(6626),C=r(9957);function x(a,d){if(1&a&&(t.TgZ(0,"tbody")(1,"tr")(2,"td"),t._uU(3),t.ALo(4,"date"),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA()()()),2&a){const e=d.$implicit;t.xp6(3),t.Oqu(t.xi3(4,4,e.transactionDate,"dd/MM/yyyy")),t.xp6(3),t.Oqu(e.transaction),t.xp6(2),t.Oqu(e.points),t.xp6(2),t.Oqu(e.balancePoints)}}function U(a,d){if(1&a){const e=t.EpF();t.TgZ(0,"button",35),t.NdJ("click",function(){const l=t.CHM(e).$implicit,i=t.oxw(2);return t.KtG(i.onPageChanged3(l))}),t._uU(1),t.qZA()}if(2&a){const e=d.$implicit,o=t.oxw(2);t.ekj("gridjs-currentPage",o.page===e),t.uIk("title","Page "+e)("aria-label","Page "+e),t.xp6(1),t.hij(" ",e," ")}}function q(a,d){if(1&a){const e=t.EpF();t.TgZ(0,"div",31)(1,"button",32),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onPageChanged3(n.page-1))}),t._uU(2," Previous "),t.qZA(),t.YNc(3,U,2,5,"button",33),t.TgZ(4,"button",34),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onPageChanged3(n.page+1))}),t._uU(5," Next "),t.qZA()()}if(2&a){const e=t.oxw();t.xp6(1),t.Q6J("disabled",1===e.page),t.xp6(2),t.Q6J("ngForOf",e.getPageNumbers3()),t.xp6(1),t.Q6J("disabled",e.page===e.getTotalPages3())}}let J=(()=>{class a{constructor(e,o,n,l,i,g){this.formBuilder=e,this.modalService=o,this.appService=n,this.route=l,this._authService=i,this.tokenStorage=g,this.page=1,this.count=10,this.StatementList=[],this.submitted=!1,this.SubmitMerchantStatementList()}get f(){return this.uploadForm.controls}ngOnInit(){}submit(){this.submitted=!0}SubmitMerchantStatementList(){let e={merchantCode:""==this.merchantCode?"":this.merchantCode,customerCode:this.customerCode=this.customerCode,fromDate:this.fromDate=this.fromDate,toDate:this.toDate=this.toDate};this.appService.Add("api/AdminDashbaord/MerchantStatement",e).pipe((0,b.K)(o=>(0,_._)(o))).subscribe(o=>{this.merchantName=o.merchantName,this.StatementList=o.merchantTransactions,console.log("Statementmerchant",o)})}getPageData(){let e;const o=(this.page-1)*this.count;return null!=this.StatementList&&(e=this.StatementList.slice(o,o+this.count)),e}onPageChanged3(e){this.page=e,window.scrollTo(0,0)}getPageNumbers3(){return Array.from({length:this.getTotalPages3()},(e,o)=>o+1)}getTotalPages3(){return Math.ceil(this.StatementList.length/this.count)}swalMessage(e){h().fire({title:e,icon:"info",confirmButtonColor:"#364574",allowOutsideClick:!1,allowEscapeKey:!1})}static#t=this.\u0275fac=function(o){return new(o||a)(t.Y36(s.qu),t.Y36(m.FF),t.Y36(f.z),t.Y36(u.gz),t.Y36(Z.$),t.Y36(C.i))};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["app-merchantstatement"]],decls:83,vars:9,consts:[[1,"container"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"card-header","card-header-table","align-items-center","d-flex"],[1,"ri-honour-line","cardicon"],[1,"card-title","mb-0","flex-grow-1"],[1,"flex-shrink-0"],[1,"card-body"],[1,"live-preview"],[1,"row","mb-3"],[1,"col-md-4"],["for","basiInput",1,"form-label"],["type","text","placeholder","Enter Merchant Code",1,"form-control",3,"ngModel","ngModelChange"],["type","text","placeholder","Enter Customer Code",1,"form-control",3,"ngModel","ngModelChange"],["type","date","placeholder","Enter From Date",1,"form-control",3,"ngModel","ngModelChange"],["type","date","placeholder","Enter To Date",1,"form-control",3,"ngModel","ngModelChange"],[1,"mt-4","text-right","gap-1"],["type","button",1,"btn","btn-primary","ms-auto",3,"click"],[1,"ri-search-line","cardicon","label-icon","align-middle"],["type","button",1,"btn","btn-primary","ms-auto"],[1,"ri-refresh-line","cardicon","label-icon","align-middle"],["for","basiInput",1,"form-label","form-view"],[1,"table-responsive"],[1,"table","table-bordered","table-striped","align-middle","table-nowrap","mb-0"],[1,"table-light"],["scope","col"],[4,"ngFor","ngForOf"],[1,"text-center","mt-3"],[1,"gridjs-pagination"],["class","gridjs-pages",4,"ngIf"],[1,"gridjs-pages"],["tabindex","0","role","button","title","Previous","aria-label","Previous",3,"disabled","click"],["tabindex","0","role","button",3,"gridjs-currentPage","click",4,"ngFor","ngForOf"],["tabindex","0","role","button","title","Next","aria-label","Next",3,"disabled","click"],["tabindex","0","role","button",3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"i",5),t.TgZ(6,"h4",6),t._uU(7,"Merchant Statement"),t.qZA(),t._UZ(8,"div",7),t.qZA(),t.TgZ(9,"div",8)(10,"div",9)(11,"div",3)(12,"div",8)(13,"div",10)(14,"div",11)(15,"div")(16,"label",12),t._uU(17,"Merchant Code"),t.qZA(),t.TgZ(18,"input",13),t.NdJ("ngModelChange",function(i){return n.merchantCode=i}),t.qZA()()(),t.TgZ(19,"div",11)(20,"div")(21,"label",12),t._uU(22,"Customer Code"),t.qZA(),t.TgZ(23,"input",14),t.NdJ("ngModelChange",function(i){return n.customerCode=i}),t.qZA()()()(),t.TgZ(24,"div",10)(25,"div",11)(26,"div")(27,"label",12),t._uU(28,"From Date"),t.qZA(),t.TgZ(29,"input",15),t.NdJ("ngModelChange",function(i){return n.fromDate=i}),t.qZA()()(),t.TgZ(30,"div",11)(31,"div")(32,"label",12),t._uU(33,"To Date"),t.qZA(),t.TgZ(34,"input",16),t.NdJ("ngModelChange",function(i){return n.toDate=i}),t.qZA()()(),t.TgZ(35,"div",11)(36,"div",17)(37,"button",18),t.NdJ("click",function(){return n.SubmitMerchantStatementList()}),t._UZ(38,"i",19),t._uU(39,"Search"),t.qZA(),t._uU(40," \xa0 "),t.TgZ(41,"button",20),t._UZ(42,"i",21),t._uU(43,"Clear"),t.qZA()()()()()(),t._UZ(44,"hr"),t.TgZ(45,"div",10)(46,"div",11)(47,"div")(48,"label",12),t._uU(49,"Merchant Name"),t.qZA(),t._UZ(50,"br"),t.TgZ(51,"label",22),t._uU(52),t.qZA()()(),t.TgZ(53,"div",11)(54,"div")(55,"label",12),t._uU(56,"Opening Balance"),t.qZA(),t._UZ(57,"br"),t.TgZ(58,"label",22),t._uU(59,"1234"),t.qZA()()(),t.TgZ(60,"div",11)(61,"div")(62,"label",12),t._uU(63,"From & To Date"),t.qZA(),t._UZ(64,"br"),t.TgZ(65,"label",22),t._uU(66),t.qZA()()()(),t.TgZ(67,"div",23)(68,"table",24)(69,"thead",25)(70,"tr")(71,"th",26),t._uU(72,"Date"),t.qZA(),t.TgZ(73,"th",26),t._uU(74,"Transaction"),t.qZA(),t.TgZ(75,"th",26),t._uU(76,"Points"),t.qZA(),t.TgZ(77,"th",26),t._uU(78,"Balance Points"),t.qZA()()(),t.YNc(79,x,11,7,"tbody",27),t.qZA()(),t.TgZ(80,"div",28)(81,"div",29),t.YNc(82,q,6,3,"div",30),t.qZA()()()()()()()()),2&o&&(t.xp6(18),t.Q6J("ngModel",n.merchantCode),t.xp6(5),t.Q6J("ngModel",n.customerCode),t.xp6(6),t.Q6J("ngModel",n.fromDate),t.xp6(5),t.Q6J("ngModel",n.toDate),t.xp6(18),t.Oqu(n.merchantName),t.xp6(14),t.AsE(" ",n.fromDate," To ",n.toDate,""),t.xp6(13),t.Q6J("ngForOf",n.getPageData()),t.xp6(3),t.Q6J("ngIf",n.StatementList.length>0))},dependencies:[c.sg,c.O5,s.Fj,s.JJ,s.On,c.uU]})}return a})();var N=r(6788);function D(a,d){1&a&&(t.TgZ(0,"div"),t._uU(1,"CustomerCode is required"),t.qZA())}function S(a,d){if(1&a&&(t.TgZ(0,"div",33),t.YNc(1,D,2,0,"div",34),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.f.customerCode.errors.required)}}function y(a,d){1&a&&(t.TgZ(0,"div"),t._uU(1,"MerchantCode is required"),t.qZA())}function P(a,d){if(1&a&&(t.TgZ(0,"div",33),t.YNc(1,y,2,0,"div",34),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.f.merchantCode.errors.required)}}function F(a,d){if(1&a&&(t.TgZ(0,"tbody")(1,"tr")(2,"td"),t._uU(3),t.ALo(4,"date"),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA()()()),2&a){const e=d.$implicit;t.xp6(3),t.Oqu(t.xi3(4,4,e.transactionDate,"dd/MM/yyyy")),t.xp6(3),t.Oqu(e.transaction),t.xp6(2),t.Oqu(e.points),t.xp6(2),t.Oqu(e.balancePoints)}}function k(a,d){if(1&a){const e=t.EpF();t.TgZ(0,"button",39),t.NdJ("click",function(){const l=t.CHM(e).$implicit,i=t.oxw(2);return t.KtG(i.onPageChanged(l))}),t._uU(1),t.qZA()}if(2&a){const e=d.$implicit,o=t.oxw(2);t.ekj("gridjs-currentPage",o.page===e),t.uIk("title","Page "+e)("aria-label","Page "+e),t.xp6(1),t.hij(" ",e," ")}}function O(a,d){if(1&a){const e=t.EpF();t.TgZ(0,"div",35)(1,"button",36),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onPageChanged(n.page-1))}),t._uU(2," Previous "),t.qZA(),t.YNc(3,k,2,5,"button",37),t.TgZ(4,"button",38),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onPageChanged(n.page+1))}),t._uU(5," Next "),t.qZA()()}if(2&a){const e=t.oxw();t.xp6(1),t.Q6J("disabled",1===e.page),t.xp6(2),t.Q6J("ngForOf",e.getPageNumbers()),t.xp6(1),t.Q6J("disabled",e.page===e.getTotalPages())}}let w=(()=>{class a{constructor(e,o,n,l,i,g,j,E){this.formBuilder=e,this.modalService=o,this.appService=n,this.route=l,this._authService=i,this.tokenStorage=g,this.router=j,this.EncrDecr=E,this.page=1,this.count=10,this.StatementList=[],this.submitted=!1}get f(){return this.uploadForm.controls}ngOnInit(){this.uploadForm=this.formBuilder.group({merchantCode:new s.NI("",[]),customerCode:new s.NI("",[]),fromDate:new s.NI("",[]),toDate:new s.NI("",[])}),this.SubmitCustomerStatementList()}submit(){this.submitted=!0}SubmitCustomerStatementList(){let e={merchantCode:""==this.merchantCode?"":this.merchantCode,customerCode:this.customerCode=this.customerCode,fromDate:this.fromDate=this.fromDate,toDate:this.toDate=this.toDate};this.appService.Add("api/AdminDashbaord/Customerstatement",e).pipe((0,b.K)(o=>(0,_._)(o))).subscribe(o=>{this.StatementList=o.customerTransactions,console.log("Statement",o)})}getPageData(){let e;const o=(this.page-1)*this.count;return null!=this.StatementList&&(e=this.StatementList.slice(o,o+this.count)),e}getTotalPages(){return Math.ceil(this.StatementList.length/this.count)}getPageNumbers(){return Array.from({length:this.getTotalPages()},(e,o)=>o+1)}onPageChanged(e){this.page=e,window.scrollTo(0,0)}swalMessage(e){h().fire({title:e,icon:"info",confirmButtonColor:"#364574",allowOutsideClick:!1,allowEscapeKey:!1})}static#t=this.\u0275fac=function(o){return new(o||a)(t.Y36(s.qu),t.Y36(m.FF),t.Y36(f.z),t.Y36(u.gz),t.Y36(Z.$),t.Y36(C.i),t.Y36(u.F0),t.Y36(N.z))};static#e=this.\u0275cmp=t.Xpm({type:a,selectors:[["app-customerstatement"]],decls:86,vars:9,consts:[[1,"container"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"card-header","card-header-table","align-items-center","d-flex"],[1,"ri-honour-line","cardicon"],[1,"card-title","mb-0","flex-grow-1"],[1,"flex-shrink-0"],[1,"card-body"],[1,"live-preview"],["fxLayout","row wrap",3,"formGroup"],[1,"row","mb-3"],[1,"col-md-4"],["for","basiInput",1,"form-label"],["type","text","placeholder","Enter Customer Code",1,"form-control",3,"ngModel","ngModelChange"],["class","invalid-feedback d-block",4,"ngIf"],["type","text","placeholder","Enter Merchant Code",1,"form-control",3,"ngModel","ngModelChange"],["type","date","placeholder","Enter From Date",1,"form-control",3,"ngModel","ngModelChange"],["type","date","placeholder","Enter To Date",1,"form-control",3,"ngModel","ngModelChange"],[1,"mt-4","text-right","gap-1"],["type","button",1,"btn","btn-primary","ms-auto",3,"click"],[1,"ri-search-line","cardicon","label-icon","align-middle"],["type","button",1,"btn","btn-primary","ms-auto"],[1,"ri-refresh-line","cardicon","label-icon","align-middle"],["for","basiInput",1,"form-label","form-view"],[1,"table-responsive"],[1,"table","table-bordered","table-striped","align-middle","table-nowrap","mb-0"],[1,"table-light"],["scope","col"],[4,"ngFor","ngForOf"],[1,"text-center","mt-3"],[1,"gridjs-pagination"],["class","gridjs-pages",4,"ngIf"],[1,"invalid-feedback","d-block"],[4,"ngIf"],[1,"gridjs-pages"],["tabindex","0","role","button","title","Previous","aria-label","Previous",3,"disabled","click"],["tabindex","0","role","button",3,"gridjs-currentPage","click",4,"ngFor","ngForOf"],["tabindex","0","role","button","title","Next","aria-label","Next",3,"disabled","click"],["tabindex","0","role","button",3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._UZ(5,"i",5),t.TgZ(6,"h4",6),t._uU(7,"Customer Statement"),t.qZA(),t._UZ(8,"div",7),t.qZA(),t.TgZ(9,"div",8)(10,"div",9)(11,"form",10)(12,"div",3)(13,"div",8)(14,"div",11)(15,"div",12)(16,"div")(17,"label",13),t._uU(18,"Customer Code"),t.qZA(),t.TgZ(19,"input",14),t.NdJ("ngModelChange",function(i){return n.customerCode=i}),t.qZA(),t.YNc(20,S,2,1,"div",15),t.qZA()(),t.TgZ(21,"div",12)(22,"div")(23,"label",13),t._uU(24,"Merchant Code"),t.qZA(),t.TgZ(25,"input",16),t.NdJ("ngModelChange",function(i){return n.merchantCode=i}),t.qZA(),t.YNc(26,P,2,1,"div",15),t.qZA()()(),t.TgZ(27,"div",11)(28,"div",12)(29,"div")(30,"label",13),t._uU(31,"From Date"),t.qZA(),t.TgZ(32,"input",17),t.NdJ("ngModelChange",function(i){return n.fromDate=i}),t.qZA()()(),t.TgZ(33,"div",12)(34,"div")(35,"label",13),t._uU(36,"To Date"),t.qZA(),t.TgZ(37,"input",18),t.NdJ("ngModelChange",function(i){return n.toDate=i}),t.qZA()()(),t.TgZ(38,"div",12)(39,"div",19)(40,"button",20),t.NdJ("click",function(){return n.SubmitCustomerStatementList()}),t._UZ(41,"i",21),t._uU(42,"Search"),t.qZA(),t._uU(43," \xa0 "),t.TgZ(44,"button",22),t._UZ(45,"i",23),t._uU(46,"Clear"),t.qZA()()()()()()(),t._UZ(47,"hr"),t.TgZ(48,"div",11)(49,"div",12)(50,"div")(51,"label",13),t._uU(52,"Customer Name"),t.qZA(),t._UZ(53,"br"),t.TgZ(54,"label",24),t._uU(55,"XXXX XXX"),t.qZA()()(),t.TgZ(56,"div",12)(57,"div")(58,"label",13),t._uU(59,"Opening Balance"),t.qZA(),t._UZ(60,"br"),t.TgZ(61,"label",24),t._uU(62,"1234"),t.qZA()()(),t.TgZ(63,"div",12)(64,"div")(65,"label",13),t._uU(66,"From & To Date"),t.qZA(),t._UZ(67,"br"),t.TgZ(68,"label",24),t._uU(69,"01 Jan 2023 To 31 Dec 2023"),t.qZA()()()(),t.TgZ(70,"div",25)(71,"table",26)(72,"thead",27)(73,"tr")(74,"th",28),t._uU(75,"Date"),t.qZA(),t.TgZ(76,"th",28),t._uU(77,"Transaction"),t.qZA(),t.TgZ(78,"th",28),t._uU(79,"Points"),t.qZA(),t.TgZ(80,"th",28),t._uU(81,"Balance Points"),t.qZA()()(),t.YNc(82,F,11,7,"tbody",29),t.qZA()(),t.TgZ(83,"div",30)(84,"div",31),t.YNc(85,O,6,3,"div",32),t.qZA()()()()()()()()),2&o&&(t.xp6(11),t.Q6J("formGroup",n.uploadForm),t.xp6(8),t.Q6J("ngModel",n.customerCode),t.xp6(1),t.Q6J("ngIf",n.submitted&&n.f.customerCode.errors),t.xp6(5),t.Q6J("ngModel",n.merchantCode),t.xp6(1),t.Q6J("ngIf",n.submitted&&n.f.merchantCode.errors),t.xp6(6),t.Q6J("ngModel",n.fromDate),t.xp6(5),t.Q6J("ngModel",n.toDate),t.xp6(45),t.Q6J("ngForOf",n.getPageData()),t.xp6(3),t.Q6J("ngIf",n.StatementList.length>0))},dependencies:[c.sg,c.O5,s._Y,s.Fj,s.JJ,s.JL,s.On,s.sg,c.uU]})}return a})();var I=r(4333),L=r(6362);const Y=[{path:"merchantstatement",component:J},{path:"customerstatement",component:w}];let Q=(()=>{class a{static#t=this.\u0275fac=function(o){return new(o||a)};static#e=this.\u0275mod=t.oAB({type:a});static#n=this.\u0275inj=t.cJS({imports:[c.ez,T.A0,m.Oz,v.O,u.Bz.forChild(Y),s.u5,I.JX,s.u5,L.JT,s.UX,m.IJ,A.d,u.Bz]})}return a})()}}]);