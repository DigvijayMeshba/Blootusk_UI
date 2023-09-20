"use strict";(self.webpackChunkblootusk=self.webpackChunkblootusk||[]).push([[248],{4248:(te,f,a)=>{a.r(f),a.d(f,{UserModule:()=>X});var c=a(9197),u=a(6895),h=a(9189),n=a(4006),v=a(5226),m=a.n(v),e=a(4650),g=a(7668),b=a(9692),Z=a(1745);function U(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"First Name is required"),e.qZA())}function T(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"First Name least 3 char long "),e.qZA())}function N(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,U,2,0,"div",42),e.YNc(2,T,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.firstName.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.firstName.errors.minlength)}}function C(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Last Name is required"),e.qZA())}function x(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Last Name least 3 char long "),e.qZA())}function y(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,C,2,0,"div",42),e.YNc(2,x,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.lastName.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.lastName.errors.minlength)}}function q(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Email Id is required"),e.qZA())}function A(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Please enter valid Email "),e.qZA())}function I(i,o){if(1&i&&(e.TgZ(0,"div"),e._uU(1),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Oqu(t.emailExistsError)}}function w(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,q,2,0,"div",42),e.YNc(2,A,2,0,"div",42),e.YNc(3,I,2,1,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.email.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.email.errors.pattern),e.xp6(1),e.Q6J("ngIf",t.f.email.errors.exists)}}function k(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Mobile No. is required "),e.qZA())}function J(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Please enter valid Mobile No."),e.qZA())}function L(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,k,2,0,"div",42),e.YNc(2,J,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.mobileNumber.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.mobileNumber.errors.minlength)}}function S(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Password is required"),e.qZA())}function F(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Password at least 6 digits long"),e.qZA())}function Q(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,S,2,0,"div",42),e.YNc(2,F,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.password.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.password.errors.minlength)}}function Y(i,o){if(1&i&&(e.TgZ(0,"option",43),e._uU(1),e.qZA()),2&i){const t=o.$implicit;e.Q6J("value",t.roleId),e.xp6(1),e.hij("",t.role," ")}}function P(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Please Select Role"),e.qZA())}function M(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,P,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.roleId.errors.required)}}const p=function(i){return{"is-invalid":i}},O=function(i,o){return{"mdi-eye-off-outline":i,"mdi-eye-outline":o}},E=function(){return["/pages/master/user/userlist"]};let _=(()=>{class i{constructor(t,s,r,d,l,W,D,ee){this.formBuilder=t,this.appService=s,this.snackBar=r,this.route=d,this.router=l,this.location=W,this._authService=D,this._router=ee,this.RoleList=[],this.submitted=!1,this.emailExistsError=null,this.uploadForm=new n.cw({userId:new n.NI("",[]),firstName:new n.NI("",[n.kI.required,n.kI.minLength(3)]),lastName:new n.NI("",[n.kI.required,n.kI.minLength(3)]),email:new n.NI("",[n.kI.required,n.kI.minLength(3)]),mobileNumber:new n.NI("",[n.kI.required,n.kI.maxLength(10)]),password:new n.NI("",[n.kI.required,n.kI.minLength(6)]),roleId:new n.NI("",[n.kI.required])})}toggleFieldTextType1(){this.fieldTextType1=!this.fieldTextType1}ngOnInit(){this.userId=this.route.snapshot.params.id,this.getuserbyId(this.userId),this.getRoleMaster()}get f(){return this.uploadForm.controls}getRoleMaster(){this.appService.GetAll("api/DropdownHelper/GetAllRoles").subscribe(t=>{this.RoleList=t})}blockSpaces(t){" "===t.key&&t.preventDefault()}keyPressOnlyChar(t){var s=String.fromCharCode(t.keyCode);return!!/[a-zA-Z]/.test(s)||(t.preventDefault(),!1)}keyPressOnlynum(t){var s=String.fromCharCode(t.keyCode);return!!/[0-9]/.test(s)||(t.preventDefault(),!1)}Submit(t){this.submitted=!0,""==t.userId?this.createUser(t):this.updateUser(t)}successmsg(){m().fire({title:"User Added Successfully",icon:"success",confirmButtonColor:"#364574",cancelButtonColor:"rgb(243, 78, 78)",confirmButtonText:"OK"})}Updatemsg(){m().fire({title:"User Updated Successfully",icon:"success",confirmButtonColor:"#364574",cancelButtonColor:"rgb(243, 78, 78)",confirmButtonText:"OK"})}createUser(t){this.appService.Add("api/User/AddUser",{firstName:t.firstName,lastName:t.lastName,mobileNumber:t.mobileNumber,email:t.email,roleId:t.roleId,password:t.password}).subscribe(r=>{console.log("dataaaaaaaaaaaaaa",r),"User Added Successfully."==r.message?(this.successmsg(),this.router.navigate(["../userlist"],{relativeTo:this.route})):"Email already exists."==r.message?(this.emailExistsError=r.message,this.uploadForm.controls.email.setErrors({exists:!0})):alert("Something Went wrong")})}updateUser(t){this.appService.edit("api/User/EditUser",{userId:t.userId,firstName:t.firstName,lastName:t.lastName,mobileNumber:t.mobileNumber,email:t.email,roleId:t.roleId,password:t.password}).subscribe(r=>{"User Updated Successfully."==r.message?(this.Updatemsg(),this.router.navigate(["/pages/master/user/userlist"],{relativeTo:this.route})):alert("Something Went wrong")})}getuserbyId(t){t>0&&this.appService.getById("api/User/GetUserByUserId/",t).subscribe(s=>{this.uploadForm.controls.firstName.setValue(s.firstName),this.uploadForm.controls.lastName.setValue(s.lastName),this.uploadForm.controls.email.setValue(s.email),this.uploadForm.controls.mobileNumber.setValue(s.mobileNumber),this.uploadForm.controls.password.setValue(s.password),this.uploadForm.controls.roleId.setValue(s.roleId),this.uploadForm.controls.userId.setValue(s.userId)})}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(n.qu),e.Y36(g.z),e.Y36(b.ux),e.Y36(c.gz),e.Y36(c.F0),e.Y36(u.Ye),e.Y36(Z.$),e.Y36(c.F0))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-useraddedit"]],decls:88,vars:35,consts:[[1,"container"],[1,"row"],[1,"col-lg-12"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"card"],[1,"card-header","align-items-center","d-flex"],[1,"ri-user-fill","cardicon"],[1,"card-title","mb-0","flex-grow-1"],[1,"flex-shrink-0"],[1,"card-body"],[1,"live-preview"],[1,"row","mb-3"],[1,"col-md-4"],["for","basiInput",1,"form-label"],[1,"mnd-fld"],["type","text","formControlName","firstName","required","","minlength","3","placeholder","Enter First Name",1,"form-control",3,"ngClass","keypress"],["class","invalid-feedback",4,"ngIf"],["type","text","formControlName","lastName","required","","minlength","3","placeholder","Enter Last Name",1,"form-control",3,"ngClass","keypress"],["for","labelInput",1,"form-label"],[1,"form-icon","right"],["type","email","formControlName","email","minlength","3","required","","pattern","^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$","placeholder","Enter Email Id",1,"form-control","form-control-icon",3,"ngClass","keypress"],[1,"ri-mail-unread-line"],["type","text","formControlName","mobileNumber","required","","pattern","[0-9]+","C","10","maxlength","10","minlength","10","placeholder","Enter Mobile No.",1,"form-control",3,"ngClass","keypress"],[1,"position-relative","auth-pass-inputgroup"],["formControlName","password","minlength","6","placeholder","Enter Password",1,"form-control",3,"type","ngClass","keypress"],["type","button","id","password-addon",1,"btn","btn-link","position-absolute","end-0","top-20","text-decoration-none","text-muted"],[1,"mdi","align-middle",3,"ngClass","click"],["aria-label","Default select example","formControlName","roleId","required","",1,"form-select",3,"ngModel","ngClass","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["formControlName","userId","hidden",""],[1,"card-footer"],[1,"row","align-items-center","gy-3"],[1,"col-sm"],[1,"d-flex","flex-wrap","my-n1"],[1,"ri-information-line","text-muted","align-bottom","me-1"],[1,"col-sm-auto"],[1,"text-end","d-flex","align-items-start","gap-2"],["type","button",1,"btn","btn-info","ms-auto",3,"routerLink"],[1,"ri-close-line","label-icon","align-middle","me-2"],["type","submit",1,"btn","btn-success",3,"disabled"],[1,"ri-save-3-fill","label-icon","align-middle","me-2"],[1,"invalid-feedback"],[4,"ngIf"],[3,"value"]],template:function(s,r){1&s&&(e.TgZ(0,"div",0),e._UZ(1,"br"),e.TgZ(2,"div",1)(3,"div",2)(4,"form",3),e.NdJ("ngSubmit",function(){return r.Submit(r.uploadForm.value)}),e.TgZ(5,"div",4)(6,"div",5),e._UZ(7,"i",6),e.TgZ(8,"h4",7),e._uU(9,"User Information"),e.qZA(),e._UZ(10,"div",8),e.qZA(),e.TgZ(11,"div",9)(12,"div",10)(13,"div",11)(14,"div",12)(15,"div")(16,"label",13),e._uU(17,"First Name"),e.TgZ(18,"span",14),e._uU(19,"*"),e.qZA()(),e.TgZ(20,"input",15),e.NdJ("keypress",function(l){return r.keyPressOnlyChar(l)})("keypress",function(l){return r.blockSpaces(l)}),e.qZA(),e.YNc(21,N,3,2,"div",16),e.qZA()(),e.TgZ(22,"div",12)(23,"div")(24,"label",13),e._uU(25,"Last Name"),e.TgZ(26,"span",14),e._uU(27,"*"),e.qZA()(),e.TgZ(28,"input",17),e.NdJ("keypress",function(l){return r.keyPressOnlyChar(l)})("keypress",function(l){return r.blockSpaces(l)}),e.qZA(),e.YNc(29,y,3,2,"div",16),e.qZA()(),e.TgZ(30,"div",12)(31,"div")(32,"label",18),e._uU(33,"Email Id"),e.TgZ(34,"span",14),e._uU(35,"*"),e.qZA()(),e.TgZ(36,"div",19)(37,"input",20),e.NdJ("keypress",function(l){return r.blockSpaces(l)}),e.qZA(),e._UZ(38,"i",21),e.YNc(39,w,4,3,"div",16),e.qZA()()()(),e.TgZ(40,"div",11)(41,"div",12)(42,"div")(43,"label",18),e._uU(44,"Mobile No."),e.TgZ(45,"span",14),e._uU(46,"*"),e.qZA()(),e.TgZ(47,"input",22),e.NdJ("keypress",function(l){return r.keyPressOnlynum(l)})("keypress",function(l){return r.blockSpaces(l)}),e.qZA(),e.YNc(48,L,3,2,"div",16),e.qZA()(),e.TgZ(49,"div",12)(50,"div",23)(51,"label",18),e._uU(52,"Password"),e.TgZ(53,"span",14),e._uU(54,"*"),e.qZA()(),e.TgZ(55,"input",24),e.NdJ("keypress",function(l){return r.blockSpaces(l)}),e.qZA(),e.YNc(56,Q,3,2,"div",16),e.TgZ(57,"button",25)(58,"i",26),e.NdJ("click",function(){return r.toggleFieldTextType1()}),e.qZA()()()(),e.TgZ(59,"div",12)(60,"div")(61,"label",13),e._uU(62,"Role"),e.TgZ(63,"span",14),e._uU(64,"*"),e.qZA()(),e.TgZ(65,"select",27),e.NdJ("ngModelChange",function(l){return r.selectedRole=l}),e.YNc(66,Y,2,2,"option",28),e.qZA(),e.YNc(67,M,2,1,"div",16),e.qZA()(),e._UZ(68,"input",29),e.qZA()()(),e.TgZ(69,"div",30)(70,"div",31)(71,"div",32)(72,"div",33)(73,"div"),e._UZ(74,"i",34),e._uU(75," Tip : ("),e.TgZ(76,"span",14),e._uU(77,"*"),e.qZA(),e._uU(78,") fields are mandatory. "),e.qZA()()(),e.TgZ(79,"div",35)(80,"div",2)(81,"div",36)(82,"button",37),e._UZ(83,"i",38),e._uU(84," Cancel"),e.qZA(),e.TgZ(85,"button",39),e._UZ(86,"i",40),e._uU(87," Submit"),e.qZA()()()()()()()()()()()),2&s&&(e.xp6(4),e.Q6J("formGroup",r.uploadForm),e.xp6(16),e.Q6J("ngClass",e.VKq(19,p,r.submitted&&r.f.firstName.errors)),e.xp6(1),e.Q6J("ngIf",r.submitted&&r.f.firstName.errors),e.xp6(7),e.Q6J("ngClass",e.VKq(21,p,r.submitted&&r.f.lastName.errors)),e.xp6(1),e.Q6J("ngIf",r.submitted&&r.f.lastName.errors),e.xp6(8),e.Q6J("ngClass",e.VKq(23,p,r.submitted&&r.f.email.errors)),e.xp6(2),e.Q6J("ngIf",r.submitted&&r.f.email.errors),e.xp6(8),e.Q6J("ngClass",e.VKq(25,p,r.submitted&&r.f.mobileNumber.errors)),e.xp6(1),e.Q6J("ngIf",r.submitted&&r.f.mobileNumber.errors),e.xp6(7),e.Q6J("type",r.fieldTextType1?"text":"password")("ngClass",e.VKq(27,p,r.submitted&&r.f.password.errors)),e.xp6(1),e.Q6J("ngIf",r.submitted&&r.f.password.errors),e.xp6(2),e.Q6J("ngClass",e.WLB(29,O,!r.fieldTextType1,r.fieldTextType1)),e.xp6(7),e.Q6J("ngModel",r.selectedRole)("ngClass",e.VKq(32,p,r.submitted&&r.f.roleId.errors)),e.xp6(1),e.Q6J("ngForOf",r.RoleList),e.xp6(1),e.Q6J("ngIf",r.submitted&&r.f.roleId.errors),e.xp6(15),e.Q6J("routerLink",e.DdM(34,E)),e.xp6(3),e.Q6J("disabled",!r.uploadForm.valid))},dependencies:[c.rH,u.mk,u.sg,u.O5,n._Y,n.YN,n.Kr,n.Fj,n.EJ,n.JJ,n.JL,n.Q7,n.wO,n.nD,n.c5,n.sg,n.u]})}return i})();const K=function(i){return["../useraddedit",i]};function B(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"tbody")(1,"tr")(2,"td"),e._uU(3),e.qZA(),e.TgZ(4,"td"),e._uU(5),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td",23)(13,"div",24)(14,"a",25),e._UZ(15,"i",26),e.qZA(),e._uU(16," \xa0\xa0 "),e.TgZ(17,"a",27),e.NdJ("click",function(){const d=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.deleterecord(d))}),e._UZ(18,"i",28),e.qZA()()()()()}if(2&i){const t=o.$implicit;e.xp6(3),e.Oqu(t.firstName),e.xp6(2),e.Oqu(t.lastName),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu(t.mobileNumber),e.xp6(2),e.Oqu(t.roleName),e.xp6(3),e.Q6J("routerLink",e.VKq(6,K,t.userId))}}function G(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"button",33),e.NdJ("click",function(){const d=e.CHM(t).$implicit,l=e.oxw(2);return e.KtG(l.onPageChanged(d))}),e._uU(1),e.qZA()}if(2&i){const t=o.$implicit,s=e.oxw(2);e.ekj("gridjs-currentPage",s.page===t),e.uIk("title","Page "+t)("aria-label","Page "+t),e.xp6(1),e.hij(" ",t," ")}}function V(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"div",29)(1,"button",30),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.onPageChanged(r.page-1))}),e._uU(2," Previous "),e.qZA(),e.YNc(3,G,2,5,"button",31),e.TgZ(4,"button",32),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.onPageChanged(r.page+1))}),e._uU(5," Next "),e.qZA()()}if(2&i){const t=e.oxw();e.xp6(1),e.Q6J("disabled",1===t.page),e.xp6(2),e.Q6J("ngForOf",t.getPageNumbers()),e.xp6(1),e.Q6J("disabled",t.page===t.getTotalPages())}}const j=function(){return["../useraddedit"]};let z=(()=>{class i{constructor(t){this.appService=t,this.UserList=[],this.NewUserList=[],this.page=1,this.count=8}ngOnInit(){this.GetAllUserList()}GetAllUserList(){this.appService.GetAll("api/User/GetAllUser").subscribe(t=>{this.UserList=t,this.NewUserList=t})}deleterecord(t){m().fire({title:"Confirmation",text:"Are you sure you want to delete this user?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#364574",cancelButtonColor:"rgb(243, 78, 78)",confirmButtonText:"Yes",cancelButtonText:"No"}).then(s=>{if(s.isConfirmed){const r=this.UserList.indexOf(t);-1!==r&&(this.UserList.splice(r,1),this.appService.Delete(`api/User/DeleteUser?userId=${t.userId}`,{}).subscribe(d=>{m().fire({title:"Deleted!",text:"The user has been deleted successfully.",icon:"success",confirmButtonColor:"#364574"})}))}})}getPageData(){const t=(this.page-1)*this.count;return this.UserList.slice(t,t+this.count)}getTotalPages(){return Math.ceil(this.UserList.length/this.count)}getPageNumbers(){return Array.from({length:this.getTotalPages()},(t,s)=>s+1)}onPageChanged(t){this.page=t,window.scrollTo(0,0)}Search(){""===this.SearchKeyword?this.GetAllUserList():this.UserList=this.NewUserList.filter(t=>t.firstName.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase())||t.lastName.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase())||t.email.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase())||t.roleName.toLocaleLowerCase().includes(this.SearchKeyword.toLocaleLowerCase())||t.mobileNumber.includes(this.SearchKeyword))}static#e=this.\u0275fac=function(s){return new(s||i)(e.Y36(g.z))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-userlist"]],decls:37,vars:5,consts:[[1,"container"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"card-header","card-header-table","align-items-center","d-flex"],[1,"ri-user-fill","cardicon"],[1,"card-title","mb-0","flex-grow-1"],[1,"flex-shrink-0"],[1,"gridjs-search"],["type","search","placeholder","Type a keyword...","aria-label","Type a keyword...",1,"gridjs-input","gridjs-search-input",3,"ngModel","ngModelChange","input"],["type","button",1,"btn","btn-info","ms-auto",3,"routerLink"],[1,"ri-add-fill","cardicon","label-icon","align-middle"],[1,"card-body"],[1,"live-preview"],[1,"table-responsive"],[1,"table","table-bordered","table-striped","align-middle","table-nowrap","mb-0"],[1,"table-light"],["scope","col"],["scope","col",1,"w-10","text-center"],[4,"ngFor","ngForOf"],[1,"text-center","mt-3"],[1,"gridjs-pagination"],["class","gridjs-pages",4,"ngIf"],[1,"w-10","text-center"],[1,"gap-3"],[1,"link-success","fs-15",3,"routerLink"],[1,"ri-edit-2-line"],[1,"link-danger","fs-15",3,"click"],[1,"ri-delete-bin-line"],[1,"gridjs-pages"],["tabindex","0","role","button","title","Previous","aria-label","Previous",3,"disabled","click"],["tabindex","0","role","button",3,"gridjs-currentPage","click",4,"ngFor","ngForOf"],["tabindex","0","role","button","title","Next","aria-label","Next",3,"disabled","click"],["tabindex","0","role","button",3,"click"]],template:function(s,r){1&s&&(e.TgZ(0,"div",0),e._UZ(1,"br"),e.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4),e._UZ(6,"i",5),e.TgZ(7,"h4",6),e._uU(8,"User List"),e.qZA(),e.TgZ(9,"div",7)(10,"div",8)(11,"input",9),e.NdJ("ngModelChange",function(l){return r.SearchKeyword=l})("input",function(){return r.Search()}),e.qZA(),e.TgZ(12,"button",10),e._UZ(13,"i",11),e._uU(14,"Add"),e.qZA()()()(),e.TgZ(15,"div",12)(16,"div",13)(17,"div",14)(18,"table",15)(19,"thead",16)(20,"tr")(21,"th",17),e._uU(22,"First Name"),e.qZA(),e.TgZ(23,"th",17),e._uU(24,"Last Name"),e.qZA(),e.TgZ(25,"th",17),e._uU(26,"Email Id"),e.qZA(),e.TgZ(27,"th",17),e._uU(28,"Mobile No."),e.qZA(),e.TgZ(29,"th",17),e._uU(30,"Role"),e.qZA(),e.TgZ(31,"th",18),e._uU(32,"Action"),e.qZA()()(),e.YNc(33,B,19,8,"tbody",19),e.qZA()(),e.TgZ(34,"div",20)(35,"div",21),e.YNc(36,V,6,3,"div",22),e.qZA()()()()()()()()),2&s&&(e.xp6(11),e.Q6J("ngModel",r.SearchKeyword),e.xp6(1),e.Q6J("routerLink",e.DdM(4,j)),e.xp6(21),e.Q6J("ngForOf",r.getPageData()),e.xp6(3),e.Q6J("ngIf",r.UserList.length>0))},dependencies:[c.rH,u.sg,u.O5,n.Fj,n.JJ,n.On]})}return i})();var R=a(4333),$=a(6362);const H=[{path:"userlist",component:z},{path:"useraddedit",component:_},{path:"useraddedit/:id",component:_}];let X=(()=>{class i{static#e=this.\u0275fac=function(s){return new(s||i)};static#t=this.\u0275mod=e.oAB({type:i});static#i=this.\u0275inj=e.cJS({providers:[g.z],imports:[h.O,c.Bz.forChild(H),u.ez,n.u5,u.ez,R.JX,n.u5,$.JT,n.UX,c.Bz]})}return i})()}}]);