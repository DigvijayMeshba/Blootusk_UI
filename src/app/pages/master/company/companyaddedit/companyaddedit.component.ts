import { ChangeDetectorRef, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CompanyAddEditModel } from './CompanyAdd.Model';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-companyaddedit',
  templateUrl: './companyaddedit.component.html',
  styleUrls: ['./companyaddedit.component.scss']
})
export class CompanyaddeditComponent {

  activeTab = 1;
  public hideTopTab: boolean = false;
  /**
   * Success sweet alert
   * @param successmsg modal content
   */
  successmsg() {
    Swal.fire({
      title: 'Saved!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }


  auditorForm: FormGroup = new FormGroup({
    auditortList: new FormArray([this.getAuditorFields()]),
  });

  companyForm: FormGroup = new FormGroup({
    companyList: new FormArray([this.getCompanyFields()]),
  });


  ///director declaration
  IsDirecotorsubmitted = false;

  companyID: number = 0;


  fileselectedFileDocPresentResidentialAddress: any;
  isFileUploadedDocPresentResidentialAddress: boolean = false;
  selectedFileDocPresentResidentialAddress: File[] | null = [];

  dummayObject: any;

  selectedCountryOfDirectorPresentResidential: any;
  statesOfDirectorPresentResidential = <any[]>[];
  citiesstatesOfDirectorPresentResidential = <any[]>[];



  selectedStateOfDirectorPresentResidential: any
  selectedCityOfDirectorPresentResidential: any

  today = new Date().toISOString().split('T')[0];
  selectedNationalityDropdown: any;
  selectedDesignationDirector: any;
  public DirectorDesignationList: any = [];
  public DirectorDesignationCategoryList: any = [];
  selectedDesignationDirectorCategory: any;
  public DirectorDesignationSubCategoryList: any = [];

  selectedDesignationDirectorSubCategory: any;
  permanentAddressChecked: boolean = false;

  fileselectedFilePermantDirectorAddress: any;
  isFileUploadedDocpermantDirectorAddress: boolean = false;

  selectedCountryOfDirectorpermanent: any;
  isOtherDirectorship: boolean = false;

  //Auditor fields
  public appointmentList: any = [];
  statesOfAuditor = <any[]>[];
  citiesStatesOfAuditor = <any[]>[];

  //company Field
  holdingCompanyData: any;
  holdingCompanyName: any;
  holdingCompanyCIN: any;
  holdingCompanyAddress: any;
  holdingCompanyCountryID_value: any;

  public countryOfficeAddressDropdownList: any = [];
  public stateOfficeAddressDropdownList: any = [];
  public cityOfficeAddressDropdownList: any = [];
  public ROCDropdownList: any = [];
  public RDJurisdictionDropdownList: any = [];

  public fileDataArray: any = [];

  selectedCompanyCINFile: File | undefined;
  selectedOfficeAddressFile: File | undefined;
  selectedFilePAN: File | undefined;
  selectedFileGST: File | undefined;
  selectedFileISIC: File | undefined;
  selectedFileEPF: File | undefined;
  selectedFilePT: File | undefined;

  isFileUploadedCIN: boolean = false;
  isFileUploadedAddress: boolean = false;
  isFileUploadedPAN: boolean = false;
  isFileUploadedGST: boolean = false;
  isFileUploadedISCI: boolean = false;
  isFileUploadedEPF: boolean = false;
  isFileUploadedPT: boolean = false;

  fileCIN: any;
  fileAddress: any;
  filePAN: any;
  fileGST: any;
  fileISCI: any;
  fileEPF: any;
  filePT: any;

  editCompanyID = 0;
  isSubsidiaryChecked = false;
  isAssociateChecked = false;
  isUltimateHoldingChecked = false;
  isHoldingChecked = false;
  isOtherDirectorshipChecked = false;

  companyId: any;
  public CompanyTypeDropdownList: any = [];
  selectedCompanyType: any;

  public CompanyCategoryDropdownList: any = [];
  selectedCompanyCategory: any;

  public NameOfCompanyDropdownList: any = [];
  public companyForHoldingDropdownList: any = [];
  selectedNameOfCompany: any;

  public CountryOfIncorporationDropdownList: any = [];
  selectedCountryOfIncorporation: any;

  public NameOfCompanySubsidiaryDropdownList = <any>[];
  public NameOfCompanyAssociateDropdownList = <any>[];
  selectedNameOfCompanySubsidiary: any;

  public CountryOfIncorporationSubDropdownList: any = [];
  public CountryOfAuditorDropdownList: any = [];
  selectedCountryOfIncorporationSub: any;

  public CompanySubtypeDropdownList: any = [];
  selectedCompanySubType: any;

  auditorDataByServe: any;

  //Director Parameters

  form: FormGroup | undefined;
  selectedIsOtherDirNameofCompanyDD: any

  DirectorForm: FormGroup;

  IsResidentialAddressPermanent: boolean = false;
  statesOfDirectorPermentResidential: any = [];
  citiesOfDirectorPermentResidential: any = [];

  selectedOtherDirCompanyCategory: any;
  selectedOtherDesignationDirector: any;

  selectedCountryOfDirectorPermenant: any;
  selectedstateOfDirectorPermenant: any;
  selectedcityOfDirectorPermenant: any;

  public CountryOfperList: any = [];
  public CountryOfresiList: any = [];

  companyInfoData: any;

  constructor(private fb: FormBuilder, public appService: AppService, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.DirectorForm = this.fb.group({
      DirectorsInformation: this.fb.array([])
    });
  }

  fieldTextType1!: boolean;
  fieldTextType2!: boolean;
  fieldTextType3!: boolean;
  fieldTextType4!: boolean;
  fieldTextType5!: boolean;
  fieldTextType6!: boolean;

  ngOnInit(): void {

    //debugger;
    this.editCompanyID = this.route.snapshot.params['id'];

    this.GetCompanyTypeDropDown();
    //this.GetCompanyCategoryDropDown();
    this.GetNameOfCompanyDropDown();
    this.GetCountryOfIncorporationDropDown();
    this.GetNameOfCompanySubsidiaryDropDown();
    this.GetCountryOfIncorporationSubsidiaryDropDown();
    this.GetCompanySubTypeDropDown();
    this.GetRdJurisdictionDropDown();


    ///director
    this.getDirectorDesignationList();
    this.getDirectorDesignationCategoryList();
    this.getDirectorDesignationSubCategoryList();

    //Auditor
    this.getAppointmentModeList();
    this.GetCountryOfAuditiorDropDown();
    this.GetCountryOfresiDropDown();
    this.GetCountryOfPerDropDown();
    this.GetCountryOfNationality();

    this.DirectorForm = this.fb.group({
      DirectorsInformation: this.fb.array([])
    });
    this.addNewDirector();

    if (this.editCompanyID > 0) {
      this.companyID = this.editCompanyID;
      this.hideTopTab = true;
      this.appService.getById("api/CompanyMaster/GetCompanyByCompanyId/", this.editCompanyID).subscribe(data => {
        this.companyInfoData = data
        console.log("company InfoData ::");
        console.log("objCount::" + this.companyInfoData);
        // let holdingCompany: any;
        // holdingCompany = this.companyInfoData.hodlingCompanyRelationshipModel;

        for (let index = 1; index < this.companyInfoData.subsidiaryCompanyRelationshipModel.length; index++) {
          this.addSubsidiaryCompany(0);
        }

        for (let index = 1; index < this.companyInfoData.associateCompanyRelationshipModel.length; index++) {
          this.addAssociateCompany(0);
        }

        //this.auditorListArray().patchValue(data);
        // add form array values in a loop
        //this.auditorDataByServe.forEach((i:any) => this.auditorListArray().push(this.getAuditorFields()));

        console.log("CompanyListArray : " + this.companyListArray().length);
        let companyBindData: any = [];
        let subsidiaryCompanyData: any = [];
        let associateCompanyData: any = [];
        let holdingCompanyData: any = [];
        let directorData: any = [];

        let companyItem = {
          "cin": this.companyInfoData.cin,
          "companyName": this.companyInfoData.cin,
          companyWebsite: this.companyInfoData.companyWebsite,
          incorporationDate: this.formatDate(new Date(this.companyInfoData.incorporationDate.substring(0, 10))), //this.companyInfoData.incorporationDate,
          companyTypeId: this.companyInfoData.companyTypeId,
          companySubTypeId: this.companyInfoData.comapnySubTypeId,
          companyCategoryId: this.companyInfoData.companyCategoryId,
          phoneNumber: this.companyInfoData.phoneNumber,
          emailId: this.companyInfoData.emailId,
          startFinancialYear: this.formatDate(new Date(this.companyInfoData.startDateFinancialYear.substring(0, 10))),//this.companyInfoData.startDateFinancialYear,
          endFinancialYear: this.formatDate(new Date(this.companyInfoData.endDateFinancialYear.substring(0, 10))),//this.companyInfoData.endDateFinancialYear,
          registeredOfficeAddress: this.companyInfoData.registerdOfficeAddress,
          registeredOfficeAddressCountryId: this.companyInfoData.countryId,
          registeredOfficeAddressStateId: this.companyInfoData.stateId,
          registeredOfficeAddressCityId: this.companyInfoData.cityId,
          registeredOfficePin: this.companyInfoData.pincode,
          registeredOfficeCountry: "",
          registeredOfficeState: "",
          registeredOfficeCity: "",
          ROCId: this.companyInfoData.roc,
          branchOfficeAddress: this.companyInfoData.brancOfficeAddress,
          RDHurisdictionID: this.companyInfoData.rdjurisdiction,
          otherAddress: this.companyInfoData.otherAddress,
          businessActivity: this.companyInfoData.businessActivity,

          otherRegiPAN: this.companyInfoData.pan,
          otherRegiGST: this.companyInfoData.gst,
          otherRegiESIC: this.companyInfoData.esic,
          otherRegiEPF: this.companyInfoData.epf,
          otherRegiPT: this.companyInfoData.pt,
          otherRegiDemat: this.companyInfoData.demat,

          FIRMSId: this.companyInfoData.otherRegistrationModels[0].id,
          otherRegiFIRMSUsername: this.companyInfoData.otherRegistrationModels[0].username,
          otherRegiFIRMSPassword: this.companyInfoData.otherRegistrationModels[0].password,
          flaId: this.companyInfoData.otherRegistrationModels[1].id,
          otherRegiFLAUsername: this.companyInfoData.otherRegistrationModels[1].username,
          otherRegiFLAPassword: this.companyInfoData.otherRegistrationModels[1].password,
          iecId: this.companyInfoData.otherRegistrationModels[2].id,
          otherRegiIECUsername: this.companyInfoData.otherRegistrationModels[2].username,
          otherRegiIECPassword: this.companyInfoData.otherRegistrationModels[2].password,
          mcaId: this.companyInfoData.otherRegistrationModels[3].id,
          otherRegiMCAUsername: this.companyInfoData.otherRegistrationModels[3].username,
          otherRegiMCAPassword: this.companyInfoData.otherRegistrationModels[3].password,
          mcaV2Id: this.companyInfoData.otherRegistrationModels[4].id,
          otherRegiMCAV1Username: this.companyInfoData.otherRegistrationModels[4].username,
          otherRegiMCAV1Password: this.companyInfoData.otherRegistrationModels[4].password,
          mcaV3Id: this.companyInfoData.otherRegistrationModels[5].id,
          otherRegiMCAV2Username: this.companyInfoData.otherRegistrationModels[5].username,
          otherRegiMCAV2Password: this.companyInfoData.otherRegistrationModels[5].password,
        }

        if (this.companyInfoData.isSubsidiaryRelationCompany) {
          this.subsidiaryCompanyDiv = true;
          this.subsidiaryCompanyDivAdd = true;
          this.isSubsidiaryChecked = true;
          for (let index = 0; index < this.companyInfoData.subsidiaryCompanyRelationshipModel.length; index++) {
            const element = this.companyInfoData.subsidiaryCompanyRelationshipModel[index];
            let subsidiary = {
              subsidiaryId: element.subsidiaryId,
              subsidiaryCompanyID: element.subsidiaryCompanyId,
              subsidiaryChildCompanyId: element.subsidiaryChildCompanyId,
              subsidiaryCompanyName: element.subsidiaryComapnyName,
              subsidiaryCompanyAddress: element.subsidiaryCompanyAddress,
              subsidiaryCompanyCountryID: element.subsidiaryCountry,
              subsidiaryCompanyCIN: element.subsidiaryCompanyCIN,
              subsidiaryCompanySharePercentage: element.subsidiarySharePercentage,
              becomeSubsidiaryCompanyDate:this.formatDate(new Date(element.subsidiaryShareAcquisitionDate.substring(0, 10))), //this.companyInfoData.incorporationDate,
              subsidiaryCompanyCessationDate: this.formatDate(new Date(element.subsidiaryShareCessationDate.substring(0, 10))),//element.subsidiaryShareCessationDate,
              subsidiaryCompanyApplicableSection: this.formatDate(new Date(element.subsidiaryApplicableSection.substring(0, 10))),//element.subsidiaryApplicableSection,
            }
            subsidiaryCompanyData.push(subsidiary);
          }
        }
        else {
          this.subsidiaryCompanyDiv = false;
          this.subsidiaryCompanyDivAdd = false;
          this.isSubsidiaryChecked = false;
        }

        if (this.companyInfoData.isAssociatRrelationCompany) {
          this.associateCompanyDiv = true;
          this.associateCompanyDivAdd = true;
          this.isAssociateChecked = true;
          for (let index = 0; index < this.companyInfoData.associateCompanyRelationshipModel.length; index++) {
            const element = this.companyInfoData.associateCompanyRelationshipModel[index];
            let associate = {
              associateId: element.associateId,
              associateCompanyID: element.associateCompanyId,
              associateChildCompanyId: element.associateChildCompanyId,
              associateCompanyName: element.associateComapnyName,
              associateCompanyAddress: element.associateCompanyAddress,
              associateCompanyCountryID: element.associateCountry,
              associateCompanyCIN: element.associateComapnyCIN,
              associateCompanySharesPercentage: element.associateSharePercentage,
              becomeAssociateCompany: this.formatDate(new Date(element.associateShareAcquisitionDate.substring(0, 10))),//element.associateShareAcquisitionDate,
              associateCompanyCessationDate: this.formatDate(new Date(element.associateShareCessationDate.substring(0, 10))),// element.associateShareCessationDate,
            }
            associateCompanyData.push(associate);
          }
        }
        else {
          this.associateCompanyDiv = false;
          this.associateCompanyDivAdd = false;
          this.isAssociateChecked = false;
        }
        // let holdingCompayData: any;
        if (this.companyInfoData.isHoldingRelationCompany) {
          this.isHoldingChecked = true;
          this.holdingCompanyDiv = true;
          // const element = this.companyInfoData.subsidiaryCompanyRelationshipModel;
          let holding = {
            holdingId: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingId,
            holdingCompanyId: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingCompanyId,
            holdingChildCompanyId: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingChildCompanyId,
            holdingCompanyName: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingComapnyName,
            holdingCompanyAddress: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingCompanyAddress,
            holdingCompanyCountryId: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingCountry,
            holdingCompanyCIN: this.companyInfoData.hodlingCompanyRelationshipModel.holdingCompanyCin,
            holdingCompanySharePercentage: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingSharePercentage,
            becomeHoldingCompanyDate: this.formatDate(new Date(this.companyInfoData.hodlingCompanyRelationshipModel.hodlingShareAcquisitionDate.substring(0, 10))),//this.companyInfoData.hodlingCompanyRelationshipModel.hodlingShareAcquisitionDate,
            holdingCompanyCessationDate: this.formatDate(new Date(this.companyInfoData.hodlingCompanyRelationshipModel.hodlingShareCessationDate.substring(0, 10))),//this.companyInfoData.hodlingCompanyRelationshipModel.hodlingShareCessationDate,
            holdingCompanyApplicableSection: this.companyInfoData.hodlingCompanyRelationshipModel.hodlingApplicableSection,
            ultimateHoldingId: this.companyInfoData.hodlingCompanyRelationshipModel.ultimateHoldingModel.id,
            companyRelationId: this.companyInfoData.hodlingCompanyRelationshipModel.ultimateHoldingModel.companyRelationId,
            ultimateHoldingCompanyName: this.companyInfoData.hodlingCompanyRelationshipModel.ultimateHoldingModel.companyName,
            ultimateHoldingCompanyCIN: this.companyInfoData.hodlingCompanyRelationshipModel.ultimateHoldingModel.cin,
            ultimateHoldingCompanyCountry: this.companyInfoData.hodlingCompanyRelationshipModel.ultimateHoldingModel.countryId,
            ultimateHoldingCompanyAddress: this.companyInfoData.hodlingCompanyRelationshipModel.ultimateHoldingModel.companyAddress,
            //subsidiaryCompanyData:subsidiaryCompanyData,
          }
          this.isUltimateHoldingChecked = (this.companyInfoData.hodlingCompanyRelationshipModel.isultimateholdingcompany) ? true : false;
          this.ultimateHoldingCompanyDiv = (this.companyInfoData.hodlingCompanyRelationshipModel.isultimateholdingcompany) ? true : false;
          holdingCompanyData.push(holding);
        }
        else {
          this.isUltimateHoldingChecked = false
          this.holdingCompanyDiv = false;
        }
        companyBindData.push(companyItem);
        this.onChangeCompanySubTypeByID(this.companyInfoData.comapnySubTypeId)
        this.onChangeCountryDropdown(this.companyInfoData.countryId, "Company")
        this.onChangeStateDropdown(this.companyInfoData.stateId, "Company")
        this.companyListArray().patchValue(companyBindData);
        this.holdingCompanyArray(0).patchValue(holdingCompanyData);
        this.subsidiaryCompanyArray(0).patchValue(subsidiaryCompanyData);
        this.associateCompanyArray(0).patchValue(associateCompanyData);

        //bind Director Data

        for (let index = 0; index < this.companyInfoData.directoryMasterModels.length - 1; index++) {
          this.addNewDirector();
        }

        for (let index = 0; index < this.companyInfoData.directoryMasterModels.length; index++) {
          const element = this.companyInfoData.directoryMasterModels[index];
          let otherDirectors = [];
          for (let dirIndex = 0; dirIndex < element.externalCompanyOfDirectors.length; dirIndex++) {
            //const ExternalDirectors = element.externalCompanyOfDirectors[dirIndex];
            this.addExtDirs(index)
            this.isOtherDirectorshipChecked = true;
          }
          for (let dirIndex = 0; dirIndex < element.externalCompanyOfDirectors.length; dirIndex++) {
            const ExternalDirectors = element.externalCompanyOfDirectors[dirIndex];
            let directorItem = {
              //   companyId: element.companyId,
              //   "id": 48,
              // "directorId": 107,
              IsOtherDirNameofCompanyDD: ExternalDirectors.companyId,
              IsOtherDirNameofCompany: ExternalDirectors.isOtherDirNameofCompany,
              CompanyCINOtherDir: ExternalDirectors.companyCINOtherDir,
              DesignationOfOtherDr: ExternalDirectors.designationOfOtherDr,
              dateofAppointmentOtherDir: this.formatDate(new Date(ExternalDirectors.dateofAppointmentOtherDir.substring(0, 10))),
              dateofCessationOtherDir: this.formatDate(new Date(ExternalDirectors.dateofCessationOtherDir.substring(0, 10))),
              PercentageofShareholding: ExternalDirectors.percentageofShareholding,
              AmountofShareholding: ExternalDirectors.amountofShareholding,

            }
            otherDirectors.push(directorItem);
          }

          let directorItem = {
            companyId: element.companyId,
            din: element.din,
            companyWebsite: element.companyWebsite,
            firstName: element.firstName,
            middleName: element.middleName,
            lastName: element.lastName,
            fatherName: element.fatherName,
            residentialAddress: element.residentialAddress,
            DocPresentResidentialAddress: "",
            residentialaddresscountryId: element.residentialAddressCountryId,
            residentialaddressstateId: element.residentialAddressStateId,
            residentialaddresscityId: element.parmanentAddressCityId,
            residentialCountryName: element.residentialCountryName,
            residentialStateName: element.residentialStateName,
            residentialCityName: element.residentialCityName,
            residentialaddressPincode: element.residentialAddressPincode,
            IsResidentialAddressPermanent: element.isResidentialAddressPermanent,
            ParmanentAddressDirector: element.parmanentAddressDirector,
            ParmanentAddressCountryId: element.parmanentAddressCountryId,
            ParmanentAddressStateId: element.parmanentAddressStateId,
            ParmanentAddressCityId: element.parmanentAddressCityId,
            parmanentCountryName: element.parmanentCountryName,
            parmanentStateName: element.parmanentStateName,
            parmanentCityName: element.parmanentCityName,
            ParmanentAddressPincode: element.parmanentAddressPincode,
            uploadPermantAddressDoc: "",
            emailIdDirector: element.emailIdDirector,
            MobileNumber: element.mobileNumber,
            PanDirector: element.panDirector,
            DrivingLicenseDirector: element.drivingLicenseDirector,
            PassportNumberDirector: element.passportNumberDirector,
            AadhaarNumberDirector: element.aadhaarNumberDirector,
            OccupationDirector: element.occupationDirector,
            DobDirector: (element.dobDirector == null || element.dobDirector == '') ? "" : this.formatDate(new Date(element.dobDirector.substring(0, 10))),
            NationalityDirector: element.nationalityDirector,
            designationIdDirector: element.designationIdDirector,
            designationcategoryIdDirector: element.designationcategoryIdDirector,
            designationsubcategoryIdDirector: element.designationsubcategoryIdDirector,
            ParticularsMembershipNoDirector: element.particularsMembershipNoDirector,
            CertificatePracticeNoDirector: element.certificatePracticeNoDirector,
            AppointDate: (element.AppointDate == null || element.AppointDate == '') ? "" : this.formatDate(new Date(element.appointDate.substring(0, 10))),//element.certificatePracticeNoDirector,
            ReleaseDate: (element.ReleaseDate == null || element.ReleaseDate == '') ? "" : this.formatDate(new Date(element.releaseDate.substring(0, 10))),//element.certificatePracticeNoDirector,
            externalCompanyOfDirectors: otherDirectors,

            // subsidiaryCompanyCessationDate: this.formatDate(new Date(element.subsidiaryShareCessationDate.substring(0,10))),//element.subsidiaryShareCessationDate,
            // subsidiaryCompanyApplicableSection: this.formatDate(new Date(element.subsidiaryApplicableSection.substring(0,10))),//element.subsidiaryApplicableSection,
          }
          this.togglePermanentAddress(index);
          this.onChangeCountryOfDirector(directorItem.residentialaddresscountryId, "PresentResidential");
          if (!directorItem.IsResidentialAddressPermanent)
            this.onChangeCountryOfDirector(directorItem.ParmanentAddressCountryId, "ParmanentAddress");

          this.onChangeStateOfDirector(directorItem.residentialaddressstateId, "PresentResidential");
          if (!directorItem.IsResidentialAddressPermanent)
            this.onChangeStateOfDirector(directorItem.ParmanentAddressStateId, "ParmanentAddress");
          directorData.push(directorItem);
        }
        this.DirectorsInformation().patchValue(directorData);

        //Bind Auditor Data

        for (let index = 0; index < this.companyInfoData.auditorModels.length - 1; index++) {
          this.addAuditor();
        }
        const items = (<FormArray>this.auditorForm.get('auditortList'));
        console.log("AuditorListArray : " + this.auditorListArray().length);
        let auditorBindData: any = [];
        for (let index = 0; index < this.companyInfoData.auditorModels.length; index++) {
          debugger
          const element = this.companyInfoData.auditorModels[index];
          let auditorItem = {

            "auditiorAddressCountryId": element.countryId,
            "auditorAddress": element.address,
            auditorAddressCityId: element.cityId,
            auditorAddressPin: element.pinCode,
            auditorAddressStateId: element.stateId,
            auditorAppointmentModeId: element.appointmentModeId,
            auditorDuration: element.appointmentDuration,
            auditorEmail: element.emailId,
            auditorFirstName: element.firstName,
            // auditorLastName: element.lastName,
            auditorMembershipNum: element.auditorMembershipNumber,
            auditorPAN: element.auditorPannumber,
            auditorPhoneNo: element.phoneNumber,
            borrowingAmount: element.borrowingAmount,
            contactPerson: element.contactPersonName,
            firmPAN: element.firmPannumber,
            firmRegistrationNumber: element.firmRegistrationNumber,
            netProfit: element.netProfit,
            netWorth: element.netWorth,
            paidUpCapital: element.paidUpCapital,
            reserves: element.reservesAndSurplus,
            auditorID: element.auditorId,
            ///new start n end date
            startDate: (element.startDate == null || element.startDate == '') ? "" : this.formatDate(new Date(element.startDate.substring(0, 10))),
            // startDate: element.startDate,
            endDate: (element.endDate == null || element.endDate == '') ? "" : this.formatDate(new Date(element.endDate.substring(0, 10))),
            // endDate: element.endDate,
          }
          auditorBindData.push(auditorItem);
          this.onChangeCountryAuditor(auditorItem.auditiorAddressCountryId, index);
          this.onChangeStateAuditor(auditorItem.auditorAddressStateId, index);
        }
        this.auditorListArray().patchValue(auditorBindData);
      });
    }
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  toggleFieldTextType3() {
    this.fieldTextType3 = !this.fieldTextType3;
  }

  toggleFieldTextType4() {
    this.fieldTextType4 = !this.fieldTextType4;
  }

  toggleFieldTextType5() {
    this.fieldTextType5 = !this.fieldTextType5;
  }

  toggleFieldTextType6() {
    this.fieldTextType6 = !this.fieldTextType6;
  }

  //hiding info box
  holdingCompanyDiv: boolean = false;
  ultimateHoldingCompanyDiv: boolean = false;
  subsidiaryCompanyDiv: boolean = false;
  subsidiaryCompanyDivAdd: boolean = false;
  associateCompanyDiv: boolean = false;
  associateCompanyDivAdd: boolean = false;
  otherDirectorshipDiv: boolean = false;
  otherDirectorshipDivAdd: boolean = false;
  permanentAddressDiv: boolean = true;

  //onclick toggling both
  holdingCompany() {
    this.holdingCompanyDiv = !this.holdingCompanyDiv;
    if (this.holdingCompanyDiv) {
      this.isHoldingChecked = true;
    }
    else {
      this.isHoldingChecked = false;
    }
  }

  utimateHoldingCompany() {
    this.ultimateHoldingCompanyDiv = !this.ultimateHoldingCompanyDiv;
    if (this.ultimateHoldingCompanyDiv) {
      this.isUltimateHoldingChecked = true;
    }
    else {
      this.isUltimateHoldingChecked = false;
    }
  }

  subsidiaryCompany() {
    this.subsidiaryCompanyDiv = !this.subsidiaryCompanyDiv;
    this.subsidiaryCompanyDivAdd = !this.subsidiaryCompanyDivAdd;
    if (this.subsidiaryCompanyDiv)
      this.isSubsidiaryChecked = true;
    else
      this.isSubsidiaryChecked = false;
  }

  associateCompany() {
    this.associateCompanyDiv = !this.associateCompanyDiv;
    this.associateCompanyDivAdd = !this.associateCompanyDivAdd;
    if (this.associateCompanyDiv)
      this.isAssociateChecked = true;
    else
      this.isAssociateChecked = false
  }

  // otherDirectorship() {
  //   this.otherDirectorshipDiv = !this.otherDirectorshipDiv;
  //   this.otherDirectorshipDivAdd = !this.otherDirectorshipDivAdd;
  // }

  permanentAddress() {
    this.permanentAddressDiv = !this.permanentAddressDiv;
  }
  // public onCompanySubmit(value: Object): void {
  //   //debugger;
  //   this.IsDirecotorsubmitted = true;

  //   console.log("valuevaluevalue",value)
  //   if (this.uploadFormDirecotr.valid) {
  //     //debugger;
  //     this.AddCompany(value);
  //   }
  // }
  /// DropDowns
  //List of All Company Type
  public GetCompanyTypeDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetAllCompanyTypes").subscribe(data => {
      this.CompanyTypeDropdownList = data;
    });
  }



  //List of All Company Category
  public GetCompanyCategoryDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetAllCompanyCategory").subscribe(data => {
      this.CompanyCategoryDropdownList = data;
    });
  }

  public GetRdJurisdictionDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetAllRdJurisdiction").subscribe(data => {
      this.RDJurisdictionDropdownList = data;
    });
  }

  //List of All Name Of Company (Holding Company)
  // public GetNameOfCompanyDropDown() {
  //   //debugger;
  //   this.appService.GetAll("api/DropdownHelper/GetAllCompany").subscribe(data => {
  //     this.NameOfCompanyDropdownList = data;
  //   });
  // }

  //List of All country (Holding Company)
  public GetCountryOfIncorporationDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetAllCountry").subscribe(data => {
      //debugger;
      this.CountryOfIncorporationDropdownList = data;
      this.countryOfficeAddressDropdownList = data;
    });
  }


  //List of All Name Of Company (Subsidiary Company)
  public GetNameOfCompanySubsidiaryDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetAllCompany").subscribe(data => {
      this.NameOfCompanySubsidiaryDropdownList = data;
      this.NameOfCompanyAssociateDropdownList = data;
    });
  }

  //List of All country (Subsidiary Company)
  public GetCountryOfIncorporationSubsidiaryDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetAllCountry").subscribe(data => {
      this.CountryOfIncorporationSubDropdownList = data;
    });
  }
  public GetCountryOfAuditiorDropDown() {
    //debugger;
    this.appService.GetAll("api/DropdownHelper/GetCountry").subscribe(data => {
      debugger
      this.CountryOfAuditorDropdownList = data;
    });
  }

  public getAppointmentModeList() {
    this.appService.GetAll("api/DropdownHelper/GetAllAppointment").subscribe(data => {
      this.appointmentList = data;
    });
  }


  //For Auditor

  getAuditorFields(): FormGroup {

    return new FormGroup({
      auditorID: new FormControl("0"),
      auditorFirstName: new FormControl("", Validators.required),
      // auditorLastName: new FormControl("",Validators.required),
      auditorAddress: new FormControl("", Validators.required),
      auditiorAddressCountryId: new FormControl("", Validators.required),
      auditorAddressStateId: new FormControl("", Validators.required),
      auditorAddressCityId: new FormControl("", Validators.required),
      auditorAddressPin: new FormControl("", Validators.required),
      firmRegistrationNumber: new FormControl("", Validators.required),
      auditorMembershipNum: new FormControl("", Validators.required),
      auditorDuration: new FormControl("", Validators.required),
      firmPAN: new FormControl("", Validators.required),
      auditorPAN: new FormControl("", Validators.required),
      auditorEmail: new FormControl("", Validators.required),
      auditorPhoneNo: new FormControl("", Validators.required),
      contactPerson: new FormControl("", Validators.required),
      auditorAppointmentModeId: new FormControl("", Validators.required),
      paidUpCapital: new FormControl("", Validators.required),
      reserves: new FormControl("", Validators.required),
      netWorth: new FormControl("", Validators.required),
      netProfit: new FormControl("", Validators.required),
      borrowingAmount: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
    });
  }

  auditorListArray() {
    return this.auditorForm.get("auditortList") as FormArray;
  }

  addAuditor() {
    this.GetCountryOfIncorporationSubsidiaryDropDown();
    this.auditorListArray().push(this.getAuditorFields());
  }

  removeAuditor(i: number) {
    this.auditorListArray().removeAt(i);
  }

  /// on Change Country
  // selectedCountryId = -1; selectedStateValue = -1; selectedCityId = -1;


  /// on Change Country
  public onChangeCountryOfAuditor(event: any, i: any) {
    //debugger;
    if (event.target.value) {
      //debugger;
      let CountryId = event.target.value;


      this.appService.getById("api/DropdownHelper/GetStateByCountyId/", CountryId).subscribe(data => {
        //debugger;
        this.statesOfAuditor[i] = data;
        this.citiesStatesOfAuditor[i] = null;
        // console.log("statesOfAuditor", this.statesOfAuditor[i])
      });


    }

    else {
      this.statesOfAuditor[i] = null;
      this.citiesStatesOfAuditor[i] = null;
    }
  }

  // selectedStateId = -1;
  /// On change State
  public onChangeStateOfAuditor(event: any, i: any) {
    //debugger;
    if (event.target.value) {
      //debugger;
      let stateId = event.target.value;
      this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateId).subscribe(data =>
        this.citiesStatesOfAuditor[i] = data
      );

    } else {
      this.citiesStatesOfAuditor[i] = null;
    }
  }

  public onChangeCountryAuditor(countryID: any, i: any) {
    this.appService.getById("api/DropdownHelper/GetStateByCountyId/", countryID).subscribe(data => {
      this.statesOfAuditor[i] = data;
      this.citiesStatesOfAuditor[i] = null;
    });
  }

  public onChangeStateAuditor(stateID: any, i: any) {
    this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateID).subscribe(data => {
      this.citiesStatesOfAuditor[i] = data;
    });
  }





  // Company

  getCompanyFields(): FormGroup {

    return new FormGroup({
      companyId: new FormControl(""),
      cin: new FormControl("", [Validators.required]),
      companyWebsite: new FormControl("", [Validators.required]),
      companyName: new FormControl("", [Validators.required]),
      incorporationDate: new FormControl("", [Validators.required]),
      companyTypeId: new FormControl("", [Validators.required]),
      companySubTypeId: new FormControl("", [Validators.required]),
      companyCategoryId: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required]),
      startFinancialYear: new FormControl("", [Validators.required]),
      endFinancialYear: new FormControl("", [Validators.required]),

      // holdingCompanyId: new FormControl("", [Validators.required]),
      // holdingCompanyName: new FormControl("", [Validators.required]),
      // holdingCompanyAddress: new FormControl("", [Validators.required]),
      // holdingCompanyCountryId: new FormControl("", [Validators.required]),
      // holdingCompanyCIN: new FormControl("", [Validators.required]),
      // holdingCompanySharePercentage: new FormControl("", [Validators.required]),
      // becomeHoldingCompanyDate: new FormControl("", [Validators.required]),
      // holdingCompanyCessationDate: new FormControl("", [Validators.required]),
      // holdingCompanyApplicableSection: new FormControl("", [Validators.required]),
      // ultimateHoldingCompanyName: new FormControl("", [Validators.required]),
      // ultimateHoldingCompanyCIN: new FormControl("", [Validators.required]),
      // ultimateHoldingCompanyCountry: new FormControl("", [Validators.required]),
      // ultimateHoldingCompanyAddress: new FormControl("", [Validators.required]),

      holdingCompanyData: new FormGroup({
        holdingCompanyArray: new FormArray([this.putHoldingCompany()]),
      }),
      subsidiaryCompanyData: new FormGroup({
        subsidiaryCompanyArray: new FormArray([this.putsubsidiaryCompany()]),
      }),
      associateCompanyData: new FormGroup({
        associateCompanyArray: new FormArray([this.putAssociateCompany()]),
      }),

      registeredOfficeAddress: new FormControl("", [Validators.required]),
      registeredOfficeAddressCountryId: new FormControl("", [Validators.required]),
      registeredOfficeAddressStateId: new FormControl("", [Validators.required]),
      registeredOfficeAddressCityId: new FormControl("", [Validators.required]),
      registeredOfficePin: new FormControl("", [Validators.required]),
      registeredOfficeCountry: new FormControl("", [Validators.required]),
      registeredOfficeState: new FormControl("", [Validators.required]),
      registeredOfficeCity: new FormControl("", [Validators.required]),
      ROCId: new FormControl("", [Validators.required]),
      branchOfficeAddress: new FormControl("", [Validators.required]),
      RDHurisdictionID: new FormControl("", [Validators.required]),
      otherAddress: new FormControl("", [Validators.required]),
      businessActivity: new FormControl("", [Validators.required]),

      otherRegiPAN: new FormControl("", [Validators.required]),
      otherRegiGST: new FormControl("", [Validators.required]),
      otherRegiESIC: new FormControl("", [Validators.required]),
      otherRegiEPF: new FormControl("", [Validators.required]),
      otherRegiPT: new FormControl(""),
      otherRegiDemat: new FormControl("", [Validators.required]),
      otherRegiFIRMS: new FormControl(""),
      FIRMSId: new FormControl("0"),

      otherRegiFIRMSUsername: new FormControl("", [Validators.required]),
      otherRegiFIRMSPassword: new FormControl("", [Validators.required]),
      otherRegiFLA: new FormControl(""),
      flaId: new FormControl("0"),
      otherRegiFLAUsername: new FormControl("", [Validators.required]),
      otherRegiFLAPassword: new FormControl("", [Validators.required]),
      otherRegiIECUP: new FormControl(""),
      iecId: new FormControl("0"),
      otherRegiIECUsername: new FormControl("", [Validators.required]),
      otherRegiIECPassword: new FormControl("", [Validators.required]),
      otherRegiMCA: new FormControl(""),
      mcaId: new FormControl("0"),
      otherRegiMCAUsername: new FormControl("", [Validators.required]),
      otherRegiMCAPassword: new FormControl("", [Validators.required]),
      mcaV2Id: new FormControl("0"),
      otherRegiMCAV1Username: new FormControl("", [Validators.required]),
      otherRegiMCAV1Password: new FormControl("", [Validators.required]),
      mcaV3Id: new FormControl("0"),
      otherRegiMCAV2Username: new FormControl("", [Validators.required]),
      otherRegiMCAV2Password: new FormControl("", [Validators.required]),


      //addedd new control registeredofficeFile
      // registeredofficeFile: new FormControl("", [Validators.required]),
      // OtherRegistrationsPANFile: new FormControl("", [Validators.required]),
      // otherRegiGSTFile: new FormControl("", [Validators.required]),
      // OtherRegistrationsESICFile: new FormControl("", [Validators.required]),
      // OtherRegistrationsEPFFile: new FormControl("", [Validators.required]),
      // OtherRegistrationsPTFile: new FormControl("", [Validators.required]),
    });
  }

  companyListArray() {
    return this.companyForm.get("companyList") as FormArray;
  }


  putsubsidiaryCompany() {
    return new FormGroup({
      subsidiaryId: new FormControl(""),
      subsidiaryCompanyID: new FormControl(""),
      subsidiaryChildCompanyId: new FormControl("", [Validators.required]),
      subsidiaryCompanyName: new FormControl("", [Validators.required]),
      subsidiaryCompanyAddress: new FormControl("", [Validators.required]),
      subsidiaryCompanyCountryID: new FormControl("", [Validators.required]),
      subsidiaryCompanyCIN: new FormControl("", [Validators.required]),
      subsidiaryCompanySharePercentage: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      becomeSubsidiaryCompanyDate: new FormControl("", [Validators.required]),
      subsidiaryCompanyCessationDate: new FormControl("", [Validators.required]),
      subsidiaryCompanyApplicableSection: new FormControl("", [Validators.required]),
    });
  }

  percentageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (Validators.required(control) !== null || isNaN(value)) {
        // Return null if the field is required or the value is not a number
        return null;
      }

      if (value < 50 || value > 100) {
        // Return an error object if the value is not between 50 and 100
        return { 'percentageRange': true };
      }

      return null;
    };
  }

  subsidiaryCompanyFormGroup(i: number) {
    return this.companyListArray().at(i).get("subsidiaryCompanyData") as FormGroup;
  }

  subsidiaryCompanyArray(i: number) {
    return this.subsidiaryCompanyFormGroup(i).get("subsidiaryCompanyArray") as FormArray;
  }

  addSubsidiaryCompany(i: number) {
    this.subsidiaryCompanyArray(i).push(this.putsubsidiaryCompany());
  }

  removeSubsidiaryCompany(i: number, j: number) {
    this.subsidiaryCompanyArray(i).removeAt(j);
  }

  putAssociateCompany() {
    return new FormGroup({
      associateId: new FormControl(""),
      associateCompanyID: new FormControl(""),
      associateChildCompanyId: new FormControl("", [Validators.required]),
      associateCompanyName: new FormControl("", [Validators.required]),
      associateCompanyAddress: new FormControl("", [Validators.required]),
      associateCompanyCountryID: new FormControl("", [Validators.required]),
      associateCompanyCIN: new FormControl("", [Validators.required]),
      associateCompanySharesPercentage: new FormControl("", [Validators.required]),
      becomeAssociateCompany: new FormControl("", [Validators.required]),
      associateCompanyCessationDate: new FormControl("", [Validators.required]),
    });
  }

  associateCompanyFormGroup(i: number) {
    return this.companyListArray().at(i).get("associateCompanyData") as FormGroup;
  }

  associateCompanyArray(i: number) {
    return this.associateCompanyFormGroup(i).get("associateCompanyArray") as FormArray;
  }

  addAssociateCompany(i: number) {
    this.associateCompanyArray(i).push(this.putAssociateCompany());
  }

  removeAssociateCompany(i: number, j: number) {
    this.associateCompanyArray(i).removeAt(j);
  }


  putHoldingCompany() {
    return new FormGroup({
      holdingId: new FormControl(""),
      holdingCompanyId: new FormControl(""),
      holdingChildCompanyId: new FormControl(""),
      holdingCompanyName: new FormControl(""),
      holdingCompanyAddress: new FormControl(""),
      holdingCompanyCountryId: new FormControl(""),
      holdingCompanyCIN: new FormControl(""),
      holdingCompanySharePercentage: new FormControl(""),
      becomeHoldingCompanyDate: new FormControl(""),
      holdingCompanyCessationDate: new FormControl(""),
      holdingCompanyApplicableSection: new FormControl(""),
      ultimateHoldingId: new FormControl(""),
      companyRelationId: new FormControl(""),
      ultimateHoldingCompanyName: new FormControl(""),
      ultimateHoldingCompanyCIN: new FormControl(""),
      ultimateHoldingCompanyCountry: new FormControl(""),
      ultimateHoldingCompanyAddress: new FormControl(""),
    });
  }

  holdingCompanyFormGroup(i: number) {
    return this.companyListArray().at(i).get("holdingCompanyData") as FormGroup;
  }

  holdingCompanyArray(i: number) {
    return this.holdingCompanyFormGroup(i).get("holdingCompanyArray") as FormArray;
  }


  // company dropdown change

  onChangeCompanySubType(event: any) {
    if (event.target.value) {
      let companysubtypeId = event.target.value;
      this.appService.getById("api/DropdownHelper/GetCategoryById/", companysubtypeId).subscribe(data => {
        //debugger;
        this.CompanyCategoryDropdownList = data;

      }
      );
    } else {
      this.CompanyCategoryDropdownList = null;

    }
  }

  onChangeCompanySubTypeByID(companysubtypeId: any) {

    this.appService.getById("api/DropdownHelper/GetCategoryById/", companysubtypeId).subscribe(data => {
      //debugger;
      this.CompanyCategoryDropdownList = data;

    }
    );

  }

  onChangeHoldingCompanyDropdown(event: any) {
    debugger;
    if (event.target.value) {
      let companyId = event.target.value;
      this.appService.getById("api/CompanyMaster/GetCompanyDetailsByCompanyId/", companyId).subscribe(data => {
        debugger;
        this.holdingCompanyArray(0).at(0).patchValue({
          holdingCompanyData: data,
          holdingCompanyName: data.comapnyName,
          holdingCompanyCIN: data.cin,
          holdingCompanyAddress: data.companyAddress,
          holdingCompanyCountryId: data.countryId
        });
      }
      );
    } else {

      this.holdingCompanyName = null;
      this.holdingCompanyCIN = null;
      this.holdingCompanyAddress = null;
      this.holdingCompanyCountryID_value = null;

    }
  }

  public onChangeSubsidiaryDropdown(event: any, i: any, j: any) {
    if (event.target.value) {
      let companyId = event.target.value;
      this.appService.getById("api/CompanyMaster/GetCompanyDetailsByCompanyId/", companyId).subscribe(data => {
        this.subsidiaryCompanyArray(i).at(j).patchValue({
          subsidiaryCompanyID: companyId,
          subsidiaryCompanyName: data.comapnyName,
          subsidiaryCompanyCIN: data.cin,
          subsidiaryCompanyAddress: data.companyAddress,
          subsidiaryCompanyCountryID: data.countryId,
          subsidiaryCompanySharePercentage: 0,
          becomeSubsidiaryCompanyDate: "",
          subsidiaryCompanyCessationDate: "",
          subsidiaryCompanyApplicableSection: 0,
        });

      }
      );
    } else {
      this.statesOfAuditor[i] = null;
      this.citiesStatesOfAuditor[i] = null;
    }
  }

  public onChangeAssociateDropdown(event: any, i: any, k: any) {
    //debugger;

    if (event.target.value) {

      // debugger;
      let companyId = event.target.value;
      this.appService.getById("api/CompanyMaster/GetCompanyDetailsByCompanyId/", companyId).subscribe(data => {
        //debugger;
        this.associateCompanyArray(i).at(k).patchValue({
          associateCompanyID: companyId,
          associateCompanyName: data.comapnyName,
          associateCompanyCIN: data.cin,
          associateCompanyAddress: data.companyAddress,
          associateCompanyCountryID: data.countryId,
          associateCompanySharePercentage: 0,
          becomeAssociateCompany: "",
          associateCompanyCessationDate: "",
          associateCompanyApplicableSection: 0,
        });

      }
      );
    } else {
      this.statesOfAuditor[i] = null;
      this.citiesStatesOfAuditor[i] = null;
    }
  }


  ///
  selecteaddressCountryId = -1;

  onChangeAddressCountryDropdown(event: any) {
    //debugger;
    if (event.target.value) {
      let CountryId = event.target.value;
      this.appService.getById("api/DropdownHelper/GetStateByCountyId/", CountryId).subscribe(data => {
        this.stateOfficeAddressDropdownList = data;
      }
      );
      if (CountryId == 0) {
        this.appService.getById("api/DropdownHelper/GetCityByStateId/", CountryId).subscribe(data => {
          this.cityOfficeAddressDropdownList = data;
        })
        this.DirectorForm.patchValue({
          parmanentAddressCountryId: 0,
          parmanentAddressStateId: 0,
          parmanentAddressCityId: 0
        });
        // debugger;


      } else {

        this.stateOfficeAddressDropdownList = null;

      }
    }
  }

  selectedadddressStateId = -1; selectedaddressCityId = -1; selectedaddressRocId = -1;
  onChangeAddressStateDropdown(event: any) {
    //debugger;
    if (event.target.value) {
      let stateId = event.target.value;
      this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateId).subscribe(data => {
        this.cityOfficeAddressDropdownList = data;
      })

      this.appService.getById("api/DropdownHelper/GetROCByStateId/", stateId).subscribe(data => {
        this.ROCDropdownList = data;
      }
      );
      if (stateId == 0) {

        this.DirectorForm.patchValue({
          parmanentAddressStateId: 0,
          parmanentAddressCityId: 0
        });

      }
    }
    else {

      this.cityOfficeAddressDropdownList = null;
      this.ROCDropdownList = null;

    }
  }

  ///


  onChangeCountryDropdown(CountryId: any, formType: any) {
    //debugger;

    this.appService.getById("api/DropdownHelper/GetStateByCountyId/", CountryId).subscribe(data => {
      if (formType == "Company") {
        this.stateOfficeAddressDropdownList = data;
      }
    }
    );
  }

  onChangeStateDropdown(stateId: any, formType: any) {
    //debugger;
    this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateId).subscribe(data => {
      if (formType == "Company") {
        this.cityOfficeAddressDropdownList = data;
      }
    }
    );
    this.appService.getById("api/DropdownHelper/GetROCByStateId/", stateId).subscribe(data => {
      this.ROCDropdownList = data;
    }
    );
  }



  CompanyFileSizeError: string | null = null;
  companyCINDocumentOnSelect(event: any) {
    debugger
    this.fileCIN = event.target.files[0];
    if (this.fileCIN.size < 2000000) {
      if (this.fileCIN) {
        this.selectedCompanyCINFile = this.fileCIN;
        this.isFileUploadedCIN = true;
        setTimeout(() => {
          this.isFileUploadedCIN = false;
        },);
        this.CompanyFileSizeError = "";
      }
    }
    else {
      this.fileCIN == undefined
      this.CompanyFileSizeError = "Upload file less than 2 MB";
    }
  }

  companyAddressDocumentError: string | null = null;
  companyOfficeAddressDocumentOnSelect(event: any) {
    this.fileAddress = event.target.files[0];
    if (this.fileAddress.size < 2000000) {
      if (this.fileAddress) {
        this.selectedOfficeAddressFile = this.fileAddress;
        this.isFileUploadedAddress = true;
        setTimeout(() => {
          this.isFileUploadedAddress = false;
        },);
        this.companyAddressDocumentError = "";
      }
    }
    else {
      this.companyAddressDocumentError = "Upload file less than 2 MB";
    }
  }

  companyPANDocumentError: string | null = null;
  companyPANDocumentOnSelect(event: any) {
    this.filePAN = event.target.files[0];
    if (this.filePAN.size < 2000000) {

      if (this.filePAN) {
        this.selectedFilePAN = this.filePAN;
        this.isFileUploadedPAN = true;
        setTimeout(() => {
          this.isFileUploadedPAN = false;
        },);
        this.companyPANDocumentError = "";
      }
    }
    else {
      this.companyPANDocumentError = "Upload file less than 2 MB";
    }
  }

  companyGSTDocumentOnError: string | null = null;

  companyGSTDocumentOnSelect(event: any) {
    this.fileGST = event.target.files[0];
    if (this.fileGST.size < 2000000) {
      if (this.fileGST) {
        this.selectedFileGST = this.fileGST;
        this.isFileUploadedGST = true;
        setTimeout(() => {
          this.isFileUploadedGST = false;
        },);
        this.companyGSTDocumentOnError = "";
      }
    }
    else {
      this.companyGSTDocumentOnError = "Upload file less than 2 MB";
    }
  }

  companyISICDocumentOnError: string | null = null;
  companyISICDocumentOnSelect(event: any) {
    this.fileISCI = event.target.files[0];
    if (this.fileISCI.size < 2000000) {
      if (this.fileISCI) {
        this.selectedFileISIC = this.fileISCI;
        this.isFileUploadedISCI = true;
        setTimeout(() => {
          this.isFileUploadedISCI = false;
        },);
        this.companyISICDocumentOnError = "";
      }
    }
    else {
      this.companyISICDocumentOnError = "Upload file less than 2 MB";
    }
  }

  companyEPFDocumentOnError: string | null = null;

  companyEPFDocumentOnSelect(event: any) {


    this.fileEPF = event.target.files[0];
    if (this.fileEPF.size < 2000000) {

      if (this.fileEPF) {
        this.selectedFileEPF = this.fileEPF;
        this.isFileUploadedEPF = true;
        setTimeout(() => {
          this.isFileUploadedEPF = false;
        },);
        this.companyEPFDocumentOnError = "";
      }
    }
    else {
      this.companyEPFDocumentOnError = "Upload file less than 2 MB";
    }
  }

  companyPTDocumentOnError: string | null = null;

  companyPTDocumentOnSelect(event: any) {
    this.filePT = event.target.files[0];
    if (this.filePT.size < 2000000) {
      if (this.filePT) {
        this.selectedFilePT = this.filePT;
        this.isFileUploadedPT = true;
        setTimeout(() => {
          this.isFileUploadedPT = false;
        },);
        this.companyPTDocumentOnError = "";
      }
    }
    else {
      this.companyPTDocumentOnError = "Upload file less than 2 MB";
    }
  }


  //director Code

  // toggleFieldTextType1() {
  //   this.fieldTextType1 = !this.fieldTextType1;
  // }

  // toggleFieldTextType2() {
  //   this.fieldTextType2 = !this.fieldTextType2;
  // }

  // toggleFieldTextType3() {
  //   this.fieldTextType3 = !this.fieldTextType3;
  // }

  // toggleFieldTextType4() {
  //   this.fieldTextType4 = !this.fieldTextType4;
  // }

  // toggleFieldTextType5() {
  //   this.fieldTextType5 = !this.fieldTextType5;
  // }

  // toggleFieldTextType6() {
  //   this.fieldTextType6 = !this.fieldTextType6;
  // }

  //hiding info box
  // holdingCompanyDiv: boolean = false;
  // ultimateHoldingCompanyDiv: boolean = false;
  // subsidiaryCompanyDiv: boolean = false;
  // subsidiaryCompanyDivAdd: boolean = false;
  // associateCompanyDiv: boolean = false;
  // associateCompanyDivAdd: boolean = false;
  // otherDirectorshipDiv: boolean = false;
  // otherDirectorshipDivAdd: boolean = false;
  // permanentAddressDiv: boolean = true;

  //onclick toggling both
  // holdingCompany() {
  //   this.holdingCompanyDiv = !this.holdingCompanyDiv;
  // }

  // utimateHoldingCompany() {
  //   this.ultimateHoldingCompanyDiv = !this.ultimateHoldingCompanyDiv;
  // }

  // subsidiaryCompany() {
  //   this.subsidiaryCompanyDiv = !this.subsidiaryCompanyDiv;
  //   this.subsidiaryCompanyDivAdd = !this.subsidiaryCompanyDivAdd;
  // }

  // associateCompany() {
  //   this.associateCompanyDiv = !this.associateCompanyDiv;
  //   this.associateCompanyDivAdd = !this.associateCompanyDivAdd;
  // }

  otherDirectorship() {
    // this.otherDirectorshipDiv = !this.otherDirectorshipDiv;
    this.otherDirectorshipDivAdd = !this.otherDirectorshipDivAdd;
    if (this.otherDirectorshipDivAdd)
      this.isOtherDirectorshipChecked = true;
    else
      this.isOtherDirectorshipChecked = false;
  }




  //List of All Name Of Company (Holding Company)
  public GetNameOfCompanyDropDown() {
    this.appService.GetAll("api/DropdownHelper/GetAllCompany").subscribe(data => {
      this.NameOfCompanyDropdownList = data;
      this.companyForHoldingDropdownList = data;
    });
  }

  //List of All country (Holding Company)
  public GetCountryOfNationality() {
    this.appService.GetAll("api/DropdownHelper/GetAllCountry").subscribe(data => {
      this.CountryOfIncorporationDropdownList = data;
    });
  }


  //List of All Name Of Company (Subsidiary Company)
  // public GetNameOfCompanySubsidiaryDropDown() {
  //   this.appService.GetAll("api/DropdownHelper/GetAllCompany").subscribe(data => {
  //     this.NameOfCompanySubsidiaryDropdownList = data;
  //   });
  // }

  //List of All country (Subsidiary Company)
  public GetCountryOfresiDropDown() {
    this.appService.GetAll("api/DropdownHelper/GetAllCountry").subscribe(data => {
      this.CountryOfresiList = data;
    });
  }

  public GetCountryOfPerDropDown() {
    this.appService.GetAll("api/DropdownHelper/GetAllCountry").subscribe(data => {
      this.CountryOfperList = data;
    });
  }

  //list of all company subtype
  public GetCompanySubTypeDropDown() {
    this.appService.GetAll("api/DropdownHelper/GetAllCompanySubType").subscribe(data => {
      this.CompanySubtypeDropdownList = data;
    });
  }
  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  keyPressOnlyChar(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressDriving(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    var currentValue = event.target.value;
    var regex = /^[-A-Za-z0-9\s]*$/;
    var newValue = currentValue.slice(0, event.target.selectionStart) + inp + currentValue.slice(event.target.selectionEnd);

    if (regex.test(newValue)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }



  ///Validation for only enter number
  keyPressOnlynum(event: any) {

    var inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[0-9]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }

  keyPressOnlyCharNum(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z0-9]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  DirectorPresentResAddressError: string | null = null;
  handleFileSelectPresentResidentialAddress(event: any, index: number) {
    this.fileselectedFileDocPresentResidentialAddress = event.target.files[0];
    if (this.fileselectedFileDocPresentResidentialAddress.size < 2000000) {
      if (this.fileselectedFileDocPresentResidentialAddress) {
        this.selectedFileDocPresentResidentialAddress?.push(event.target.files[0]);
        this.isFileUploadedDocPresentResidentialAddress = true;
        setTimeout(() => {
          this.isFileUploadedDocPresentResidentialAddress = false;
        },);
      }
      const directorFormGroup = (this.DirectorForm.get('DirectorsInformation') as FormArray).controls[index] as FormGroup;
      directorFormGroup.patchValue({
        contentFilePath: this.fileselectedFileDocPresentResidentialAddress
      });
      this.DirectorPresentResAddressError = "";
    }
    else {
      this.DirectorPresentResAddressError = "Upload file less than 2 MB";
    }
  }

  DirectorPermenentAddressError: string | null = null;
  handleFileSelectPermantDirectorAddress(event: any, index: number) {
    this.fileselectedFilePermantDirectorAddress = event.target.files[0];
    if (this.fileselectedFilePermantDirectorAddress.size < 2000000) {
      if (this.fileselectedFilePermantDirectorAddress) {
        this.selectedFileDocPresentResidentialAddress = this.fileselectedFilePermantDirectorAddress;
        this.isFileUploadedDocpermantDirectorAddress = true;
        setTimeout(() => {
          this.isFileUploadedDocpermantDirectorAddress = false;
        },);
      }
      const directorFormGroup = (this.DirectorForm.get('DirectorsInformation') as FormArray).controls[index] as FormGroup;
      directorFormGroup.patchValue({
        uploadPermantAddressDoc: this.fileselectedFilePermantDirectorAddress
      });
      this.DirectorPermenentAddressError = "";
    }
    else {
      this.DirectorPermenentAddressError = "Upload file less than 2 MB";
    }
  }


  selecteddirectorCountryId: number[] = [];
  selecteddirectorStateId: number[] = [];
  selecteddirectorCityId: number[] = [];
  /// on Change Country
  public onChangeCountryOfDirectorPresentResidential(event: any, empIndex: number) {
    if (event.target.value) {
      let CountryId = event.target.value;
      //debugger

      this.appService.getById("api/DropdownHelper/GetStateByCountyId/", CountryId).subscribe(data => {
        this.statesOfDirectorPresentResidential[empIndex] = data;
        this.citiesstatesOfDirectorPresentResidential[empIndex] = [];
      }
      );
      if (CountryId == 0) {

        this.appService.getById("api/DropdownHelper/GetCityByStateId/", CountryId).subscribe(data => {
          this.citiesstatesOfDirectorPresentResidential[empIndex] = data
        }
        );

        this.DirectorForm.patchValue({
          residentialaddresscountryId: 0,
          residentialaddressstateId: 0,
          residentialaddresscityId: 0
        });

      }


    } else {
      this.statesOfDirectorPresentResidential[empIndex] = [];
      this.citiesstatesOfDirectorPresentResidential[empIndex] = [];
    }
  }


  public onChangeStateOfDirectorPresentResidential(event: any, empIndex: number) {
    if (event.target.value) {
      //debugger

      let stateId = event.target.value;
      this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateId).subscribe(data => {
        this.citiesstatesOfDirectorPresentResidential[empIndex] = data

      }
      );

      if (stateId == 0) {
        this.DirectorForm.patchValue({
          residentialaddressstateId: 0,
          residentialaddresscityId: 0
        });
      }



    } else {
      this.citiesstatesOfDirectorPresentResidential[empIndex] = [];
    }
  }


  public onChangeCityOfDirectorPresentResidential(event: any, empIndex: number) {
    if (event.target.value) {

      let cityId = event.target.value;
      //debugger

      if (cityId == 0) {

        this.DirectorForm.patchValue({

          residentialaddresscityId: 0
        });
      }
    }
  }

  selecteddirectorpermeanentCountryId: number[] = [];
  selecteddirectorpermanentStateId: number[] = [];
  selecteddirectorpermanentCityId: number[] = [];
  public onChangeCountryOfDirectorPerment(event: any, empIndex: number) {
    //debugger;
    if (event.target.value) {
      let CountryId = event.target.value;

      this.appService.getById("api/DropdownHelper/GetStateByCountyId/", CountryId).subscribe(data => {
        this.statesOfDirectorPermentResidential[empIndex] = data;
        this.citiesOfDirectorPermentResidential[empIndex] = null;
      }
      );
      if (CountryId == 0) {
        this.appService.getById("api/DropdownHelper/GetCityByStateId/", CountryId).subscribe(data => {
          this.citiesOfDirectorPermentResidential[empIndex] = data
        }
        );

        this.DirectorForm.patchValue({
          parmanentAddressCountryId: 0,
          parmanentAddressStateId: 0,
          parmanentAddressCityId: 0
        });

      }

    } else {
      this.statesOfDirectorPermentResidential[empIndex] = null;
      this.citiesOfDirectorPermentResidential[empIndex] = null;
    }
  }


  public onChangeStateOfDirectorPermenent(event: any, empIndex: number) {
    if (event.target.value) {
      let stateId = event.target.value;
      this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateId).subscribe(data => {
        this.citiesOfDirectorPermentResidential[empIndex] = data
      }
      );
      if (stateId == 0) {


        this.DirectorForm.patchValue({

          parmanentAddressStateId: 0,
          parmanentAddressCityId: 0
        });


      }

    }
    else {
      this.citiesOfDirectorPermentResidential[empIndex] = null;
    }
  }

  public onChangeCityOfDirectorPermenent(event: any, empIndex: number) {
    if (event.target.value) {

      let cityId = event.target.value;

      //debugger
      if (cityId == 0) {

        this.DirectorForm.patchValue({

          parmanentAddressCityId: 0
        });
      }
    }
  }




  public onChangeCountryOfDirector(countryId: any, whichAddress: any) {
    this.appService.getById("api/DropdownHelper/GetStateByCountyId/", countryId).subscribe(data => {
      if (whichAddress == "PresentResidential") {
        this.statesOfDirectorPresentResidential[whichAddress] = data;
        this.citiesstatesOfDirectorPresentResidential[whichAddress] = [];
      }
      else {
        this.statesOfDirectorPermentResidential[whichAddress] = data;
        this.citiesOfDirectorPermentResidential[whichAddress] = null;
      }
    }
    );
  }




  /// On change State




  public onChangeStateOfDirector(stateId: any, whichAddress: any) {
    this.appService.getById("api/DropdownHelper/GetCityByStateId/", stateId).subscribe(data => {
      if (whichAddress == "PresentResidential") {
        this.citiesstatesOfDirectorPresentResidential[whichAddress] = data;
      }
      else {
        this.citiesOfDirectorPermentResidential[whichAddress] = data;
      }
    });
  }


  ///Validation for only enter number
  keyPressBankPan(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z0-9]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressMembership(event: any) {
    const key = event.key || String.fromCharCode(event.keyCode || event.charCode);
    const newValue = event.target.value + key;

    if (newValue.toUpperCase().startsWith('A') || newValue.toUpperCase().startsWith('F')) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }





  convertToUppercase(inputElement: EventTarget | null) {
    if (inputElement instanceof HTMLInputElement) {
      const value = inputElement.value.toUpperCase();
      inputElement.value = value;
    }
  }

  public getDirectorDesignationList() {
    this.appService.GetAll("api/DropdownHelper/GetAllDesignation").subscribe(data => {
      this.DirectorDesignationList = data;
    });
  }

  public getDirectorDesignationCategoryList() {
    this.appService.GetAll("api/DropdownHelper/GetAllDesignationCategory").subscribe(data => {
      this.DirectorDesignationCategoryList = data;
    });
  }

  public getDirectorDesignationSubCategoryList() {
    this.appService.GetAll("api/DropdownHelper/GetAllDesignationSubCategory").subscribe(data => {
      this.DirectorDesignationSubCategoryList = data;
    });
  }

  // permanentAddress() {
  //   this.permanentAddressDiv = !this.permanentAddressDiv;
  // }

  togglePermanentAddress(empIndex: number) {
    // this.permanentAddressDiv = !this.permanentAddressDiv;
    this.showForm[empIndex] = !this.showForm[empIndex];
    const control = this.DirectorForm.get('IsResidentialAddressPermanent');
    if (control) {
      control.setValue(control.value ? 'false' : 'true');
    }
  }

  // toggleIsOtherDirectorship() {
  //   const control = this.DirectorForm.get('isOtherDirectorship');
  //   if (control) {
  //     control.setValue(control.value ? 'false' : 'true');
  //   }

  // }



  addNewDirector() {

    //   const employeeFormGroup = this.newEmployee();
    // employeeFormGroup.patchValue({
    //   companyId: 1 // Replace '1' with the desired companyId value
    // });

    this.DirectorsInformation().push(this.newDirector());
  }

  DirectorsInformation(): FormArray {

    return this.DirectorForm.get('DirectorsInformation') as FormArray;
  }

  newDirector(): FormGroup {
    return this.fb.group({
      companyId: [this.companyID],
      din: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],

      residentialAddress: ['', Validators.required],
      // DocPresentResidentialAddress: [''],
      residentialaddresscountryId: ['', Validators.required],
      residentialaddressstateId: ['', Validators.required],
      residentialaddresscityId: ['', Validators.required],

      //
      residentialCountryName: ['', Validators.required],
      residentialStateName: ['', Validators.required],
      residentialCityName: ['', Validators.required],

      residentialaddressPincode: ['', Validators.pattern('^[0-9]{6}$')],
      parmanentCountryName: ['', Validators.required],
      parmanentStateName: ['', Validators.required],
      parmanentCityName: ['', Validators.required],
      IsResidentialAddressPermanent: false,
      ParmanentAddressDirector: '',
      ParmanentAddressCountryId: '0',
      ParmanentAddressStateId: '0',
      ParmanentAddressCityId: '0',
      ParmanentAddressPincode: '000',

      // uploadPermantAddressDoc: '',

      emailIdDirector: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', Validators.required],
      PanDirector: ['', Validators.required],
      DrivingLicenseDirector: ['', Validators.required],
      PassportNumberDirector: ['', Validators.required],
      AadhaarNumberDirector: ['', Validators.required],
      OccupationDirector: ['', Validators.required],
      DobDirector: ['', Validators.required],
      NationalityDirector: ['', Validators.required],
      designationIdDirector: ['', Validators.required],
      designationcategoryIdDirector: ['', Validators.required],
      designationsubcategoryIdDirector: ['', Validators.required],
      ParticularsMembershipNoDirector: ['', Validators.required],
      CertificatePracticeNoDirector: ['', Validators.required],
      AppointDate: ['', Validators.required],
      ReleaseDate: ['', Validators.required],
      externalCompanyOfDirectors: this.fb.array([])
    });
  }
  externaldirectors(empIndex: number): FormArray {
    return this.DirectorsInformation()
      .at(empIndex)
      .get('externalCompanyOfDirectors') as FormArray;
  }

  newExtDir(): FormGroup {
    return this.fb.group({
      IsOtherDirNameofCompanyDD: ['', Validators.required],
      IsOtherDirNameofCompany: ['', Validators.required],
      CompanyCINOtherDir: ['', Validators.required],
      DesignationOfOtherDr: ['', Validators.required],
      dateofAppointmentOtherDir: ['', Validators.required],
      dateofCessationOtherDir: ['', Validators.required],
      PercentageofShareholding: ['', Validators.required],
      AmountofShareholding: ['', Validators.required]
    });
  }
  showForm: boolean[] = [];
  addExtDirs(empIndex: number) {
    const externalDirs = this.externaldirectors(empIndex);
    externalDirs.push(this.newExtDir());
    this.showForm[empIndex] = true;
  }

  removeaddExtDirs(empIndex: number, skillIndex: number) {
    const externalDirs = this.externaldirectors(empIndex);
    externalDirs.removeAt(skillIndex);
  }

  removeDirector(empIndex: number) {
    if (this.Directors().length > 1) {
      this.Directors().removeAt(empIndex);
      this.showForm[empIndex] = false;
    }
  }
  Directors(): FormArray {
    return this.DirectorForm.get('DirectorsInformation') as FormArray;
  }


  public onChangeCompany(event: any, empIndex: number, index: number) {
    //debugger
    if (event) {
      this.appService.getById("api/CompanyMaster/GetCompanyDetailsByCompanyId/", + event).subscribe(
        data => {
          const formArray = this.externaldirectors(empIndex);
          const formGroup = formArray.at(index) as FormGroup;
          formGroup.patchValue({
            IsOtherDirNameofCompany: data.comapnyName,
            CompanyCINOtherDir: data.cin,
          });
        }
      );
    }
  }

  keyPressPercentage(event: any) {
    const inp = String.fromCharCode(event.keyCode);
    const currentValue = event.target.value + inp;
    const percentageValue = parseInt(currentValue);
    const isValidKey = /[0-9]/.test(inp) && percentageValue >= 0 && percentageValue <= 100;
    if (!isValidKey) {
      event.preventDefault();
    }
  }

  // keyPressPercSub(event: any) {
  //   debugger;
  //   const inp = String.fromCharCode(event.keyCode);
  //   const currentValue = event.target.value + inp;
  //   const percentageValue = parseInt(currentValue);
  //   const isValidLength = currentValue.length == 2; //2
  //   let isValidKey;
  //   if (isValidLength) {
  //     isValidKey = (percentageValue >= 20 && percentageValue <= 50);
  //     if (!isValidKey) {
  //       event.preventDefault();
  //     }
  //   }
  //   if (currentValue.length > 2) {
  //     event.preventDefault();
  //   }
  // }

  keyPressPercSub(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    var firmPan = event.target.value + inp;
    if (/^[56789]{0,1}$/.test(firmPan)) {
      return true;
    }
    else if (/^[56789]{1}[0-9]{0,1}$/.test(firmPan)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }

  keyPressPercAsso(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    var firmPan = event.target.value + inp;
    if (/^[2345]{0,1}$/.test(firmPan)) {
      return true;
    }
    else if (/^[2345]{1}[0-9]{0,1}$/.test(firmPan)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }










  // Keypress

  keyPressDIN(event: any, empIndex: number) {
    const inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[0-9]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }

  keyPressChar(event: any, empIndex: number) {
    const inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[a-zA-Z]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }
  keyPressCharFather(event: any) {
    const inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[a-zA-Z ]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }

  keyPressPassport(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[A-Za-z0-9 ]{0,20}$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressPan(event: any) {
    const pattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    const inp = String.fromCharCode(event.keyCode);
    if (pattern.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  /// validation Error

  AppointDateError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('AppointDate');
    return !!(C && C.touched && C.invalid);
  }

  ReleaseDateError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ReleaseDate');
    return !!(C && C.touched && C.invalid);
  }

  //DIN

  shouldShowDINError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('din');
    return !!(C && C.touched && C.invalid);
  }

  //FirstName
  shouldShowfirstNameError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('firstName');
    return !!(C && C.touched && C.invalid);
  }

  // middleName
  shouldShowmiddleNameError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('middleName');
    return !!(C && C.touched && C.invalid);
  }

  //lastName
  shouldShowlastNameError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('lastName');
    return !!(C && C.touched && C.invalid);
  }

  //fatherName
  shouldShowfatherNameError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('fatherName');
    return !!(C && C.touched && C.invalid);
  }

  //residentialAddress
  shouldShowresidentialAddressError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('residentialAddress');
    return !!(C && C.touched && C.invalid);
  }

  //residentialaddresscountryId
  shouldShowresidentialaddresscountryIdError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('residentialaddresscountryId');
    return !!(C && C.touched && C.invalid);
  }

  //residentialaddressstateId
  shouldShowresidentialaddressstateIdError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('residentialaddressstateId');
    return !!(C && C.touched && C.invalid);
  }

  //residentialaddresscityId
  shouldShowresidentialaddresscityIdError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('residentialaddresscityId');
    return !!(C && C.touched && C.invalid);
  }

  //residentialaddressPincode
  shouldShowresidentialaddressPincodeError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('residentialaddressPincode');
    return !!(C && C.touched && C.invalid);
  }

  //ParmanentAddressDirector
  shouldShowParmanentAddressDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ParmanentAddressDirector');
    return !!(C && C.touched && C.invalid);
  }

  //ParmanentAddressCountryId
  shouldShowParmanentAddressCountryIdError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ParmanentAddressCountryId');
    return !!(C && C.touched && C.invalid);
  }

  //ParmanentAddressCountryId
  shouldShowParmanentAddressStateIdError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ParmanentAddressStateId');
    return !!(C && C.touched && C.invalid);
  }

  //ParmanentAddressCountryId
  shouldShowParmanentAddressCityIdError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ParmanentAddressCityId');
    return !!(C && C.touched && C.invalid);
  }

  //ParmanentAddressCountryId
  shouldShowParmanentAddressPincodeError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ParmanentAddressPincode');
    return !!(C && C.touched && C.invalid);
  }

  //ParmanentAddressCountryId
  shouldShowemailIdDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('emailIdDirector');
    return !!(C && C.touched && C.invalid);
  }

  //MobileNumber
  shouldShowMobileNumberError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('MobileNumber');
    return !!(C && C.touched && C.invalid);
  }

  //PanDirector
  shouldShowPanDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('PanDirector');
    return !!(C && C.touched && C.invalid);
  }

  //DrivingLicenseDirector
  shouldShowDrivingLicenseDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('DrivingLicenseDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowPassportNumberDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('PassportNumberDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowAadhaarNumberDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('AadhaarNumberDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowOccupationDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('OccupationDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowDobDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('DobDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowNationalityDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('NationalityDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowdesignationIdDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('designationIdDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowdesignationcategoryIdDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('designationcategoryIdDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowdesignationsubcategoryIdDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('designationsubcategoryIdDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowParticularsMembershipNoDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('ParticularsMembershipNoDirector');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowCertificatePracticeNoDirectorError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('CertificatePracticeNoDirector');
    return !!(C && C.touched && C.invalid);
  }

  ///External Director
  shouldShowIsOtherDirNameofCompanyDDError(empIndex: number, skillIndex: number): boolean {
    const director = this.DirectorsInformation().controls[empIndex] as FormGroup;
    const externalDirectorsArray = director.get('externalCompanyOfDirectors') as FormArray;
    const externalDirector = externalDirectorsArray.at(skillIndex) as FormGroup;
    const certificateNoControl = externalDirector.get('IsOtherDirNameofCompanyDD');
    return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  }

  shouldShowDocPresentResidentialAddressError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('DocPresentResidentialAddress');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowuploadPermantAddressDocError(index: number): boolean {
    const director = this.DirectorsInformation().controls[index];
    const C = director.get('uploadPermantAddressDoc');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowDesignationOfOtherDrError(empIndex: number, skillIndex: number): boolean {
    const director = this.DirectorsInformation().controls[empIndex] as FormGroup;
    const externalDirectorsArray = director.get('externalCompanyOfDirectors') as FormArray;
    const externalDirector = externalDirectorsArray.at(skillIndex) as FormGroup;
    const certificateNoControl = externalDirector.get('DesignationOfOtherDr');

    return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  }

  shouldShowdateofAppointmentOtherDirError(empIndex: number, skillIndex: number): boolean {
    const director = this.DirectorsInformation().controls[empIndex] as FormGroup;
    const externalDirectorsArray = director.get('externalCompanyOfDirectors') as FormArray;
    const externalDirector = externalDirectorsArray.at(skillIndex) as FormGroup;
    const certificateNoControl = externalDirector.get('dateofAppointmentOtherDir');

    return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  }

  shouldShowdateofCessationOtherDirError(empIndex: number, skillIndex: number): boolean {
    const director = this.DirectorsInformation().controls[empIndex] as FormGroup;
    const externalDirectorsArray = director.get('externalCompanyOfDirectors') as FormArray;
    const externalDirector = externalDirectorsArray.at(skillIndex) as FormGroup;
    const certificateNoControl = externalDirector.get('dateofCessationOtherDir');

    return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  }

  shouldShowPercentageofShareholdingError(empIndex: number, skillIndex: number): boolean {
    const director = this.DirectorsInformation().controls[empIndex] as FormGroup;
    const externalDirectorsArray = director.get('externalCompanyOfDirectors') as FormArray;
    const externalDirector = externalDirectorsArray.at(skillIndex) as FormGroup;
    const percentageControl = externalDirector.get('PercentageofShareholding');

    return !!(percentageControl && percentageControl.invalid && percentageControl.touched);
  }

  shouldShowAmountofShareholdingError(empIndex: number, skillIndex: number): boolean {
    const director = this.DirectorsInformation().controls[empIndex] as FormGroup;
    const externalDirectorsArray = director.get('externalCompanyOfDirectors') as FormArray;
    const externalDirector = externalDirectorsArray.at(skillIndex) as FormGroup;
    const certificateNoControl = externalDirector.get('AmountofShareholding');

    return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  }



  // Validation error for company
  shouldShowCINError(index: number): boolean {
    const company = this.companyListArray().controls[index];
    const C = company.get('cin');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowCompanyNameError(index: number): boolean {
    const company = this.companyListArray().controls[index];
    const C = company.get('companyName');
    return !!(C && C.touched && C.invalid);
  }

  shouldcompanyWebsiteError(index: number): boolean {
    const company = this.companyListArray().controls[index];
    const C = company.get('companyWebsite');
    return !!(C && C.touched && C.invalid);
  }

  // Validation for Company

  //call this in add api call at ,, replace at alert
  successmsgComapnySave() {
    Swal.fire({
      title: 'Company Information Saved Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  //call this in add api call at ,, replace at alert
  successmsgDirectorSave() {
    Swal.fire({
      title: 'Director Information Saved Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  // getCompanyFields(): FormGroup {

  //   return new FormGroup({
  //     cin: new FormControl("", [Validators.required]),

  //     cinFile: new FormControl("", [Validators.required]),
  //     companyName: new FormControl("", [Validators.required]),
  //     incorporationDate: new FormControl("", [Validators.required]),
  //     companyTypeId: new FormControl("", [Validators.required]),
  //     companySubTypeId: new FormControl("", [Validators.required]),
  //     companyCategoryId: new FormControl("", [Validators.required]),
  //     phoneNumber: new FormControl("", [Validators.required]),
  //     emailId: new FormControl("", [Validators.required]),
  //     startFinancialYear: new FormControl("", [Validators.required]),
  //     endFinancialYear: new FormControl("", [Validators.required]),

  //     holdingCompanyId: new FormControl("", [Validators.required]),
  //     holdingCompanyName: new FormControl("", [Validators.required]),
  //     holdingCompanyAddress: new FormControl("", [Validators.required]),
  //     holdingCompanyCountryId: new FormControl("", [Validators.required]),
  //     holdingCompanyCIN: new FormControl("", [Validators.required]),
  //     holdingCompanySharePercentage: new FormControl("", [Validators.required]),
  //     becomeHoldingCompanyDate: new FormControl("", [Validators.required]),
  //     holdingCompanyCessationDate: new FormControl("", [Validators.required]),
  //     holdingCompanyApplicableSection: new FormControl("", [Validators.required]),
  //     ultimateHoldingCompanyName: new FormControl("", [Validators.required]),
  //     ultimateHoldingCompanyCIN: new FormControl("", [Validators.required]),
  //     ultimateHoldingCompanyCountry: new FormControl("", [Validators.required]),
  //     ultimateHoldingCompanyAddress: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyData: new FormGroup({
  //       subsidiaryCompanyArray: new FormArray([this.putsubsidiaryCompany()]),
  //     }),
  //     associateCompanyData: new FormGroup({
  //       associateCompanyArray: new FormArray([this.putAssociateCompany()]),
  //     }),

  //     registeredOfficeAddress: new FormControl("", [Validators.required]),
  //     registeredOfficeAddressCountryId: new FormControl("", [Validators.required]),
  //     registeredOfficeAddressStateId: new FormControl("", [Validators.required]),
  //     registeredOfficeAddressCityId: new FormControl("", [Validators.required]),
  //     registeredOfficePin: new FormControl("", [Validators.required]),
  //     registeredOfficeCountry: new FormControl("", [Validators.required]),
  //     registeredOfficeState: new FormControl("", [Validators.required]),
  //     registeredOfficeCity: new FormControl("", [Validators.required]),
  //     ROCId: new FormControl("", [Validators.required]),
  //     branchOfficeAddress: new FormControl("", [Validators.required]),
  //     RDHurisdictionID: new FormControl("", [Validators.required]),
  //     otherAddress: new FormControl("", [Validators.required]),
  //     businessActivity: new FormControl("", [Validators.required]),

  //     otherRegiPAN: new FormControl("", [Validators.required]),
  //     otherRegiGST: new FormControl("", [Validators.required]),
  //     otherRegiESIC: new FormControl("", [Validators.required]),
  //     otherRegiEPF: new FormControl("", [Validators.required]),
  //     otherRegiPT: new FormControl(""),
  //     otherRegiDemat: new FormControl("", [Validators.required]),
  //     otherRegiFIRMS: new FormControl(""),
  //     otherRegiFIRMSUsername: new FormControl("", [Validators.required]),
  //     otherRegiFIRMSPassword: new FormControl("", [Validators.required]),
  //     otherRegiFLA: new FormControl(""),
  //     otherRegiFLAUsername: new FormControl("", [Validators.required]),
  //     otherRegiFLAPassword: new FormControl("", [Validators.required]),
  //     otherRegiIECUP: new FormControl(""),
  //     otherRegiIECUsername: new FormControl("", [Validators.required]),
  //     otherRegiIECPassword: new FormControl("", [Validators.required]),
  //     otherRegiMCA: new FormControl(""),

  //     otherRegiMCAUsername: new FormControl("", [Validators.required]),
  //     otherRegiMCAPassword: new FormControl("", [Validators.required]),
  //     otherRegiMCAV1Username: new FormControl("", [Validators.required]),
  //     otherRegiMCAV1Password: new FormControl("", [Validators.required]),
  //     otherRegiMCAV2Username: new FormControl("", [Validators.required]),
  //     otherRegiMCAV2Password: new FormControl("", [Validators.required]),


  //     //addedd new control registeredofficeFile
  //     registeredofficeFile: new FormControl("", [Validators.required]),
  //     OtherRegistrationsPANFile: new FormControl("", [Validators.required]),
  //     otherRegiGSTFile: new FormControl("", [Validators.required]),
  //     OtherRegistrationsESICFile: new FormControl("", [Validators.required]),
  //     OtherRegistrationsEPFFile: new FormControl("", [Validators.required]),
  //     OtherRegistrationsPTFile: new FormControl("", [Validators.required]),
  //   });
  // }
  // putsubsidiaryCompany() {
  //   return new FormGroup({
  //     subsidiaryCompanyID: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyName: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyAddress: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyCountryID: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyCIN: new FormControl("", [Validators.required]),
  //     subsidiaryCompanySharePercentage: new FormControl("", [Validators.required]),
  //     becomeSubsidiaryCompanyDate: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyCessationDate: new FormControl("", [Validators.required]),
  //     subsidiaryCompanyApplicableSection: new FormControl("", [Validators.required]),
  //   });
  // }

  // putAssociateCompany() {
  //   return new FormGroup({
  //     associateCompanyID: new FormControl("", [Validators.required]),
  //     associateCompanyName: new FormControl("", [Validators.required]),
  //     associateCompanyAddress: new FormControl("", [Validators.required]),
  //     associateCompanyCountryID: new FormControl("", [Validators.required]),
  //     associateCompanyCIN: new FormControl("", [Validators.required]),
  //     associateCompanySharesPercentage: new FormControl("", [Validators.required]),
  //     becomeAssociateCompany: new FormControl("", [Validators.required]),
  //     associateCompanyCessationDate: new FormControl("", [Validators.required]),
  //   });
  // }

  // Comany Validation Keypress
  CINExistanceCheckError: string | null = null;
  CINExistanceCheck(event: KeyboardEvent) {
    debugger
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.length < 21) {
      this.CINExistanceCheckError = "";
    }
    if (inputValue.length > 20) {
      this.appService.getById("api/CompanyMaster/GetCINNumber?cin=", inputValue).subscribe((data: any) => {
        debugger
        if (data.message == "CIN Already exist") {
          this.CINExistanceCheckError = "CIN Already registered";
        }
        else if
          (data.message == "CIN Does Not Exist") {
          this.CINExistanceCheckError = "";
        };
      });

      // return true
    }
    // else 
    // this.CINExistanceCheckError="";
    return true
  }

  keyPressCIN(event: any) {
    debugger
    this.CINExistanceCheckError = "";
    var key = event.key || String.fromCharCode(event.keyCode || event.charCode);
    var newValue = event.target.value + key;
    newValue = newValue.toUpperCase();

    if (/^[UL]{0,1}$/i.test(newValue)) {
      return true;
    } else if (/^[UL]{1}[0-9]{0,5}$/i.test(newValue)) {
      return true;
    } else if (/^[UL]{1}[0-9]{5}[a-zA-Z]{0,2}$/i.test(newValue)) {
      return true;
    }
    else if (/^[UL]{1}[0-9]{5}[a-zA-Z]{2}[0-9]{0,4}$/i.test(newValue)) {
      return true;
    }
    else if (/^[UL]{1}[0-9]{5}[a-zA-Z]{2}[0-9]{4}[a-zA-Z]{0,3}$/i.test(newValue)) {
      return true;
    }
    else if (/^[UL]{1}[0-9]{5}[a-zA-Z]{2}[0-9]{4}[a-zA-Z]{3}[0-9]{0,6}$/i.test(newValue)) {
      return true;
    }
    else {

      event.preventDefault();
      return false;
    }
  }

  keyPressPan2(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    var firmPan = event.target.value + inp;
    firmPan = firmPan.toUpperCase();
    if (/^[a-zA-Z]{0,5}$/.test(firmPan)) {
      return true;
    } else if (/^[a-zA-Z]{5}[0-9]{0,4}$/.test(firmPan)) {
      return true;
    } else if (/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{0,1}$/.test(firmPan)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ///Error Message of All Company Form============

  //Company Basic

  shouldShowdcinError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('cin');
    return !!(C && C.touched && C.invalid);
  }
  // cinFileError(index: number): boolean {
  //   const director = this.companyListArray().controls[index];
  //   const C = director.get('cinFile');
  //   return !!(C && C.touched && C.invalid);
  // }
  companyNameError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('companyName');
    return !!(C && C.touched && C.invalid);
  }

  incorporationDateError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('incorporationDate');
    return !!(C && C.touched && C.invalid);
  }


  companyTypeIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('companyTypeId');
    return !!(C && C.touched && C.invalid);
  }
  companySubTypeIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('companySubTypeId');
    return !!(C && C.touched && C.invalid);
  }
  companyCategoryIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('companyCategoryId');
    return !!(C && C.touched && C.invalid);
  }
  phoneNumberError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('phoneNumber');
    return !!(C && C.touched && C.invalid);
  }
  emailIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('emailId');
    return !!(C && C.touched && C.invalid);
  }
  startFinancialYearError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('startFinancialYear');
    return !!(C && C.touched && C.invalid);
  }
  endFinancialYearError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('endFinancialYear');
    return !!(C && C.touched && C.invalid);
  }

  //Holding Company
  holdingCompanyIdError(index: number): boolean {
    debugger
    const director = this.companyListArray().controls[index];
    const C = director.get('holdingCompanyId');
    return !!(C && C.touched && C.invalid);
  }
  holdingholdingCompanyAddressError(index: number): boolean {
    debugger
    const director = this.companyListArray().controls[index];
    const C = director.get('holdingCompanyAddress');
    return !!(C && C.touched && C.invalid);
  }

  holdingCompanySharePercentageError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('holdingCompanySharePercentage');
    return !!(C && C.touched && C.invalid);
  }

  becomeHoldingCompanyDateError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('becomeHoldingCompanyDate');
    return !!(C && C.touched && C.invalid);
  }

  holdingCompanyCessationDateError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('holdingCompanyCessationDate');
    return !!(C && C.touched && C.invalid);
  }

  holdingCompanyApplicableSectionError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('holdingCompanyApplicableSection');
    return !!(C && C.touched && C.invalid);
  }

  //ultimate holding
  holdingultimateHoldingCompanyName(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('ultimateHoldingCompanyName');
    return !!(C && C.touched && C.invalid);
  }
  ultimateHoldingCompanyCINError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('ultimateHoldingCompanyCIN');
    return !!(C && C.touched && C.invalid);
  }
  ultimateHoldingCompanyCountryError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('ultimateHoldingCompanyCountry');
    return !!(C && C.touched && C.invalid);
  }

  ultimateHoldingCompanyAddressError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('ultimateHoldingCompanyAddress');
    return !!(C && C.touched && C.invalid);
  }

  //Address Information

  registeredOfficeAddressError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('registeredOfficeAddress');
    return !!(C && C.touched && C.invalid);
  }

  registeredofficeFileError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('registeredofficeFile');
    return !!(C && C.touched && C.invalid);
  }

  registeredOfficeAddressCountryIdError(index: number): boolean {
    debugger
    const director = this.companyListArray().controls[index];
    const C = director.get('registeredOfficeAddressCountryId');
    return !!(C && C.touched && C.invalid);
  }
  
  registeredOfficeAddressStateIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('registeredOfficeAddressStateId');
    return !!(C && C.touched && C.invalid);
  }
  registeredOfficeAddressCityIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('registeredOfficeAddressCityId');
    return !!(C && C.touched && C.invalid);
  }
  registeredOfficePinError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('registeredOfficePin');
    return !!(C && C.touched && C.invalid);
  }
  ROCIdError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('ROCId');
    return !!(C && C.touched && C.invalid);
  }

  branchOfficeAddressError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('branchOfficeAddress');
    return !!(C && C.touched && C.invalid);
  }
  RDHurisdictionIDError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('RDHurisdictionID');
    return !!(C && C.touched && C.invalid);
  }
  otherAddressError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherAddress');
    return !!(C && C.touched && C.invalid);
  }
  businessActivityError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('businessActivity');
    return !!(C && C.touched && C.invalid);
  }

  //Other Registrations Information
  otherRegiPANError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiPAN');
    return !!(C && C.touched && C.invalid);
  }
  OtherRegistrationsPANFileError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('OtherRegistrationsPANFile');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiGSTError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiGST');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiGSTFileError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiGSTFile');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiESICError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiESIC');
    return !!(C && C.touched && C.invalid);
  }
  OtherRegistrationsESICFileError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('OtherRegistrationsESICFile');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiEPFError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiEPF');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiPTError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiPT');
    return !!(C && C.touched && C.invalid);
  }

  OtherRegistrationsEPFFileError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('OtherRegistrationsEPFFile');
    return !!(C && C.touched && C.invalid);
  }

  OtherRegistrationsPTFileError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('OtherRegistrationsPTFile');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiDematError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiDemat');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiFIRMSUsernameError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiFIRMSUsername');
    return !!(C && C.touched && C.invalid);

  }
  otherRegiFIRMSPasswordError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiFIRMSPassword');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiFLAPasswordError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiFLAPassword');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiFLAUsernameError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiFLAUsername');
    return !!(C && C.touched && C.invalid);
  }

  otherRegiIECUsernameError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiIECUsername');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiIECPasswordError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiIECPassword');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiMCAUsernameError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiMCAUsername');
    return !!(C && C.touched && C.invalid);
  }
  otherRegiMCAPasswordError(index: number): boolean {
    const director = this.companyListArray().controls[index];
    const C = director.get('otherRegiMCAPassword');
    return !!(C && C.touched && C.invalid);
  }

  /// Subsidiary Company

  subsidiaryCompanyIDError(index: number, j: number): boolean {
    const director = this.companyListArray().controls[index] as FormGroup;
    const subsidiaryCompanyArray = director.get('subsidiaryCompanyArray') as FormArray;
    const subsidiaryCompany = subsidiaryCompanyArray.at(j) as FormGroup;
    const subsidiaryCompanyIDControl = subsidiaryCompany.get('subsidiaryCompanyID');
    return !!(subsidiaryCompanyIDControl && subsidiaryCompanyIDControl.invalid && subsidiaryCompanyIDControl.touched);
  }

  subsidiaryCompanySharePercentageError(index: number, j: number): boolean {
    debugger;
    const director = this.companyListArray().at(index) as FormGroup;
    const subsidiaryCompanyArray = director.get('subsidiaryCompanyArray') as FormArray;
    const subsidiaryCompany = subsidiaryCompanyArray.at(j) as FormGroup;
    const certificateNoControl = subsidiaryCompany.get('subsidiaryCompanySharePercentage');
    return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  }

  // ///Associate company
  // associateCompanyIDError(index: number, j: number): boolean {
  //   const director = this.companyListArray().at(index) as FormGroup;
  //   const subsidiaryCompanyArray = director.get('associateCompanyArray') as FormArray;
  //   const subsidiaryCompany = subsidiaryCompanyArray.at(j) as FormGroup;
  //   const certificateNoControl = subsidiaryCompany.get('associateCompanyID');
  //   return !!(certificateNoControl && certificateNoControl.touched && certificateNoControl.invalid);
  // }


  // Auditor Validation

  keyPressonlyCharAuditor(event: any, i: number) {
    const inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[a-zA-Z]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }
  keyPressonlylastnameauditor(event: any, i: number) {
    const inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[a-zA-Z\s-]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }

  keyPressonlyContactperson(event: any, i: number) {
    const inp = String.fromCharCode(event.keyCode);
    const isValidKey = /[a-zA-Z\s]/.test(inp);
    if (!isValidKey) {
      event.preventDefault();
    }
  }
  keyPressAddress(event: any, i: number) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[A-Za-z0-9 ]{0,20}$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressOnlyNumbers(event: any, i: number) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressPhone(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[+]{0,1}[0-9()]{0,20}$/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }

  convertToUppercaseauditor(inputElement: EventTarget | null) {
    if (inputElement instanceof HTMLInputElement) {
      const value = inputElement.value.toUpperCase();
      inputElement.value = value;
    }
  }


  keyPressFirmPan(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    var firmPan = event.target.value + inp;

    // Convert the input to uppercase
    firmPan = firmPan.toUpperCase();

    if (/^[A-Z]{0,5}$/.test(firmPan)) {
      return true;
    } else if (/^[A-Z]{5}[0-9]{0,4}$/.test(firmPan)) {
      return true;
    } else if (/^[A-Z]{5}[0-9]{4}[A-Z]{0,1}$/.test(firmPan)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  blockSpacesAuditor(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }



  shouldShowauditorFirstNameError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorFirstName');
    return !!(C && C.touched && C.invalid);
  }
  shouldShowauditorLastNameError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorLastName');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowauditorAddressError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorAddress');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowcountryIdError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditiorAddressCountryId');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowstateIdError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorAddressStateId');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowcityIdError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorAddressCityId');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowrPincodeError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorAddressPin');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowrFirmRegistrationNumberError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('firmRegistrationNumber');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowMembershipNumberError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorMembershipNum');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowDurationofAppointmentError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorDuration');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowFirmofPANError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('firmPAN');
    return !!(C && C.touched && C.invalid);
  }
  shouldShowPartenerPANError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorPAN');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowEmailIdError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorEmail');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowPhoneNoError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorPhoneNo');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowWhomToBeContactedError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('contactPerson');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowModeofAppointmentError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('auditorAppointmentModeId');
    return !!(C && C.touched && C.invalid);
  }

  //validationfor Figures As On Latest Audited Financials
  shouldShowPaidUpCapitalError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('paidUpCapital');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowstartDateError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('startDate');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowendDateError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('endDate');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowReverseandSurplusError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('reserves');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowNetWorthError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('netWorth');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowNetProfitError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('netProfit');
    return !!(C && C.touched && C.invalid);
  }

  shouldShowAmountofBorrowingError(index: number): boolean {
    const auditor = this.auditorListArray().controls[index];
    const C = auditor.get('borrowingAmount');
    return !!(C && C.touched && C.invalid);
  }



  // Back click event

  backToCompanyInfo() {
    this.activeTab = 1;
  }

  backToDirectorInfo() {
    this.activeTab = 2;
  }

  cancel() {
    this.router.navigate(['/pages/master/company/companylist'], { relativeTo: this.route });
  }

  // Submit
  // Company Data


  submitCompanyData() {
    debugger;
    let companyInfo: any;
    let companyDetails: any;
    companyDetails = JSON.parse(JSON.stringify(this.companyForm.value));
    companyDetails.companyList.forEach((element: any) => {

      companyInfo = {
        companyId: this.companyID,//(element.companyId==null || element.companyId=='')?0:element.companyId,
        name: element.companyName,
        cin: element.cin,
        companyWebsite: element.companyWebsite,
        cinfilePath: "",
        incorporationDate: element.incorporationDate,
        companyTypeId: element.companyTypeId,
        companyType: "",
        companyCategoryId: element.companyCategoryId,
        companyCategory: "",
        comapnySubTypeId: element.companySubTypeId,
        subTypeName: element.companyName,
        phoneNumber: element.phoneNumber,
        emailId: element.emailId,
        startDateFinancialYear: element.startFinancialYear,
        endDateFinancialYear: element.endFinancialYear,
        registerdOfficeAddress: element.registeredOfficeAddress,
        officeAddressFileName: "",
        officeAddressFilePath: "",
        cityId: element.registeredOfficeAddressCityId,
        cityName: element.registeredOfficeCity,
        pincode: element.registeredOfficePin,
        stateId: element.registeredOfficeAddressStateId,
        stateName: element.registeredOfficeState,
        countryId: element.registeredOfficeAddressCountryId,
        countryName: element.registeredOfficeCountry,
        roc: element.ROCId,
        rocname: "",
        brancOfficeAddress: element.branchOfficeAddress,
        otherAddress: element.otherAddress,
        rdjurisdiction: element.RDHurisdictionID,
        rdjurisdictionName: element.companyName,
        objectClause: "",
        businessActivity: element.businessActivity,
        pan: element.otherRegiPAN,
        panfileName: "",
        panfilePath: "",
        gst: element.otherRegiGST,
        gstfileName: "",
        gstfilePath: "",
        esic: element.otherRegiESIC,
        esicfileName: "",
        esicfilePath: "",
        epf: element.otherRegiEPF,
        epffileName: "",
        epffilePath: "",
        pt: element.otherRegiPT,
        ptfileName: "",
        ptfilePath: "",
        demat: element.otherRegiDemat,
        isDeleted: false,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null,
        isHoldingRelationCompany: this.holdingCompanyDiv,
        isSubsidiaryRelationCompany: this.subsidiaryCompanyDiv,
        isAssociatRrelationCompany: this.associateCompanyDiv,
        hodlingCompanyRelationshipModel: null,
        subsidiaryCompanyRelationshipModel: [],
        associateCompanyRelationshipModel: [],
        otherRegistrationModels: []
      };

      element.holdingCompanyData.holdingCompanyArray.forEach(
        (elementHolding: any) => {
          let tempultimateHoldingCompany: any = {
            id: (elementHolding.UltimateHoldingId == null || elementHolding.UltimateHoldingId == '') ? 0 : elementHolding.UltimateHoldingId,
            companyRelationId: (elementHolding.companyRelationId == null || elementHolding.companyRelationId == '') ? 0 : elementHolding.companyRelationId,
            companyName: elementHolding.ultimateHoldingCompanyName,
            cin: elementHolding.ultimateHoldingCompanyCIN,
            companyAddress: elementHolding.ultimateHoldingCompanyAddress,
            countryId: (elementHolding.ultimateHoldingCompanyCountry == null || elementHolding.ultimateHoldingCompanyCountry == '') ? 0 : elementHolding.ultimateHoldingCompanyCountry,
            isDeleted: false,
            createdBy: 0,
            crDate: null,
            modifyBy: 0,
            moDate: null
          };

          let tempHoldingCompany: any = {
            hodlingId: (elementHolding.holdingId == null || elementHolding.holdingId == '') ? 0 : elementHolding.holdingId,
            hodlingCompanyId: (elementHolding.holdingCompanyId == null || elementHolding.holdingCompanyId == '') ? 0 : elementHolding.holdingCompanyId,
            hodlingChildCompanyId: elementHolding.holdingChildCompanyId,
            hodlingRelationshipTypeId: 3,
            hodlingComapnyName: elementHolding.holdingCompanyName,
            hodlingCompanyCIN: elementHolding.holdingCompanyCIN,
            hodlingCompanyAddress: elementHolding.holdingCompanyAddress,
            hodlingCountry: (elementHolding.holdingCompanyCountryId == null || elementHolding.holdingCompanyCountryId == '') ? 0 : elementHolding.holdingCompanyCountryId,
            hodlingSharePercentage: elementHolding.holdingCompanySharePercentage,
            hodlingShareAcquisitionDate: elementHolding.becomeHoldingCompanyDate,
            hodlingShareCessationDate: elementHolding.holdingCompanyCessationDate,
            hodlingApplicableSection: elementHolding.holdingCompanyApplicableSection,
            crDate: null,
            moDate: null,
            isultimateholdingcompany: this.ultimateHoldingCompanyDiv,
            ultimateHoldingModel: tempultimateHoldingCompany
          };

          companyInfo.hodlingCompanyRelationshipModel = tempHoldingCompany;
        }
      );

      element.subsidiaryCompanyData.subsidiaryCompanyArray.forEach(
        (elementSubjectObj: any) => {
          let tempSubsidiaryCompany: any = {
            subsidiaryId: (elementSubjectObj.subsidiaryId == null || elementSubjectObj.subsidiaryId == '') ? 0 : elementSubjectObj.subsidiaryId,
            subsidiaryCompanyId: (elementSubjectObj.subsidiaryCompanyID == null || elementSubjectObj.subsidiaryCompanyID == '') ? 0 : elementSubjectObj.subsidiaryCompanyID,
            subsidiaryChildCompanyId: elementSubjectObj.subsidiaryChildCompanyId,
            subsidiaryRelationshipTypeId: 2,
            subsidiaryComapnyName: elementSubjectObj.subsidiaryCompanyName,
            subsidiaryCompanyCIN: elementSubjectObj.subsidiaryCompanyCIN,
            subsidiaryCompanyAddress: elementSubjectObj.subsidiaryCompanyAddress,
            subsidiaryCountry: (elementSubjectObj.subsidiaryCompanyCountryID == null || elementSubjectObj.subsidiaryCompanyCountryID == '') ? 0 : elementSubjectObj.subsidiaryCompanyCountryID,
            subsidiarySharePercentage: elementSubjectObj.subsidiaryCompanySharePercentage,
            subsidiaryShareAcquisitionDate: elementSubjectObj.becomeSubsidiaryCompanyDate,
            subsidiaryShareCessationDate: elementSubjectObj.subsidiaryCompanyCessationDate,
            subsidiaryApplicableSection: elementSubjectObj.subsidiaryCompanyApplicableSection,
            crDate: null,
            moDate: null
          };
          companyInfo.subsidiaryCompanyRelationshipModel.push(tempSubsidiaryCompany);
        }
      );

      element.associateCompanyData.associateCompanyArray.forEach(
        (elementSubjectObj: any) => {
          let tempAssociateCompany: any = {
            associateId: (elementSubjectObj.associateId == null || elementSubjectObj.associateId == '') ? 0 : elementSubjectObj.associateId,
            associateCompanyId: (elementSubjectObj.associateCompanyID == null || elementSubjectObj.associateCompanyID == '') ? 0 : elementSubjectObj.associateCompanyID,
            associateChildCompanyId: elementSubjectObj.associateChildCompanyId,
            associateRelationshipTypeId: 1,
            associateComapnyName: elementSubjectObj.associateCompanyName,
            associateComapnyCIN: elementSubjectObj.associateCompanyCIN,
            associateCompanyAddress: elementSubjectObj.associateCompanyAddress,
            associateCountry: (elementSubjectObj.associateCompanyCountryID == null || elementSubjectObj.associateCompanyCountryID == '') ? 0 : elementSubjectObj.associateCompanyCountryID,
            associateSharePercentage: elementSubjectObj.associateCompanySharesPercentage,
            associateShareAcquisitionDate: elementSubjectObj.becomeAssociateCompany,
            associateShareCessationDate: elementSubjectObj.associateCompanyCessationDate,
            associateApplicableSection: "",
            crDate: null,
            moDate: null
          };
          companyInfo.associateCompanyRelationshipModel.push(tempAssociateCompany);
        }
      );

      let tempOtherRegFIRMS: any = {
        id: element.FIRMSId,
        companyId: 0,
        registrationType: "FIRMS",
        registrationNumber: element.otherRegiFIRMS,
        username: element.otherRegiFIRMSUsername,
        password: element.otherRegiFIRMSPassword,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null
      };

      let tempOtherRegFLA: any = {
        id: element.flaId,
        companyId: 0,
        registrationType: "FLA",
        registrationNumber: element.otherRegiFLA,
        username: element.otherRegiFLAUsername,
        password: element.otherRegiFLAPassword,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null
      };

      let tempOtherRegIECUP: any = {
        id: element.iecId,
        companyId: 0,
        registrationType: "IECUP",
        registrationNumber: element.otherRegiIECUP,
        username: element.otherRegiIECUsername,
        password: element.otherRegiIECPassword,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null
      };

      let tempOtherRegMCA: any = {
        id: element.mcaId,
        companyId: 0,
        registrationType: "MCA",
        registrationNumber: element.otherRegiMCA,
        username: element.otherRegiMCAUsername,
        password: element.otherRegiMCAPassword,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null
      };

      let tempOtherRegMCAV1: any = {
        id: element.mcaV2Id,
        companyId: 0,
        registrationType: "V1",
        registrationNumber: element.otherRegiMCA,
        username: element.otherRegiMCAV1Username,
        password: element.otherRegiMCAV1Password,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null
      };

      let tempOtherRegMCAV2: any = {
        id: element.mcaV3Id,
        companyId: 0,
        registrationType: "V2",
        registrationNumber: element.otherRegiMCA,
        username: element.otherRegiMCAV2Username,
        password: element.otherRegiMCAV2Password,
        createdBy: 0,
        crDate: null,
        modifyBy: 0,
        moDate: null
      };

      companyInfo.otherRegistrationModels.push(tempOtherRegFIRMS);
      companyInfo.otherRegistrationModels.push(tempOtherRegFLA);
      companyInfo.otherRegistrationModels.push(tempOtherRegIECUP);
      companyInfo.otherRegistrationModels.push(tempOtherRegMCA);
      companyInfo.otherRegistrationModels.push(tempOtherRegMCAV1);
      companyInfo.otherRegistrationModels.push(tempOtherRegMCAV2);
    });

    console.log("CompanyDetails");
    console.log(companyInfo);  // This is the variable which contain all the form data
    let isCompanyDataValid = false;
    if (this.companyForm.valid) {
      isCompanyDataValid = true;
    }
    else {
      if (!this.isAssociateChecked || !this.isHoldingChecked || !this.isSubsidiaryChecked) {
        isCompanyDataValid = true;
      }
      isCompanyDataValid = true;
    }

    const formData = new FormData();
    formData.append('companyInfo', JSON.stringify(companyInfo));
    formData.append('CIN', this.fileCIN);
    formData.append('Address', this.fileAddress);
    formData.append('PAN', this.filePAN);
    formData.append('GST', this.fileGST);
    formData.append('ISCI', this.fileISCI);
    formData.append('EPF', this.fileEPF);
    formData.append('PT', this.filePT);

    if (isCompanyDataValid) {
      if (this.companyID == 0) {
        //Add company
        debugger
        console.log("formDataBeforeAPICall", formData)
        this.appService.Add("api/CompanyMaster/AddCompanyDetails", formData).subscribe((data: any) => {
          debugger;
          console.log("formData", formData)
          if (data.message == "Company Details Added Successfully.") {
            //debugger;
            this.successCompanymsg("")
            this.companyID = data.CompanyID;
            this.activeTab = 2;
            this.hideTopTab = true;
          }

          console.log("company return obj ::");
          console.log(data);

        }
        );
        // this.comapnyaddwarningrequiredfields("")
      }
      else {
        //Edit company
        this.appService.edit("api/CompanyMaster/EditCompanyDetails", formData).subscribe((data: any) => {
          //debugger;
          if (data.message == "Company Details Updated Successfully.") {
            //debugger;
            this.UpdateCompany()
            //this.companyID=data.CompanyID;
            this.activeTab = 2;
            // this.router.navigate(['/pages/master/company/companylist'], { relativeTo: this.route });
          }
          console.log("company return obj ::");
          console.log(data);
        });
      }

    }
    else {
      alert("All field required");
    }

    // this.companyID=50;
    // this.activeTab=2;
    //       this.hideTopTab=true;

  }
  UpdateCompany() {
    Swal.fire({
      title: 'Company Information Updated Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
  UpdateDirector() {
    Swal.fire({
      title: 'Director Information Updated Successfully',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  isSubmitted: boolean = false;
  onSubmit() {
    this.DirectorForm.markAllAsTouched();
    this.isSubmitted = true;
    //debugger
    // if(this.DirectorForm.valid)
    // {

    console.log("this.DirectorForm.value", this.DirectorForm.value);
    console.log("file list" + this.selectedFileDocPresentResidentialAddress?.length);

    this.dummayObject
    var formData = new FormData();
    formData.append('formdata', JSON.stringify(this.DirectorForm.value.DirectorsInformation));
    formData.append('addressDoc', JSON.stringify(this.selectedFileDocPresentResidentialAddress));
    formData.append('companyID', JSON.stringify(this.companyID));
    this.appService.Add('api/CompanyMaster/AddEditDirectorDetails', formData).subscribe((data: any) => {
      console.log("API response addDirector", data.message)

      if (data.message == "Director Details Added Successfully.") {
        this.successmsgDirectorSave()
        this.activeTab = 3;
      }
      else {
        alert("Something Went wrong")
      }
    },
    );
    // }
    // else
    // {
    //   alert("All field required")
    // }



  }


  submitAuditorData() {
    debugger;;
    let auditorDetails: any = [],
      tempStudentFormData = JSON.parse(JSON.stringify(this.auditorForm.value));
    tempStudentFormData.auditortList.forEach((element: any) => {
      let tempObj: any =
      {
        auditorId: element.auditorID,
        companyId: this.companyID,
        auditorFirstName: element.auditorFirstName,
        // lastName: element.auditorLastName,
        address: element.auditorAddress,
        countryId: element.auditiorAddressCountryId,
        stateId: element.auditorAddressStateId,
        cityId: element.auditorAddressCityId,
        pinCode: element.auditorAddressPin,
        firmRegistrationNumber: element.firmRegistrationNumber,
        auditorMembershipNumber: element.auditorMembershipNum,
        appointmentDuration: element.auditorDuration,
        firmPannumber: element.firmPAN,
        auditorPannumber: element.auditorPAN,
        emailId: element.auditorEmail,
        phoneNumber: element.auditorPhoneNo,
        contactPersonName: element.contactPerson,
        appointmentModeId: element.auditorAppointmentModeId,
        paidUpCapital: element.paidUpCapital,
        reservesAndSurplus: element.reserves,
        netWorth: element.netWorth,
        netProfit: element.netProfit,
        borrowingAmount: element.borrowingAmount,
        country: element.country,
        state: element.state,
        city: element.city,
        startDate: element.startDate,
        endDate: element.endDate,
        CompanyCIN: "",
        CompanyName: "",
        AppointmentMode: "",
        AudtitorName: "",
      };
      auditorDetails.push(tempObj);
    });
    console.log("auditorDetails");
    console.log(auditorDetails);  // This is the variable which contain all the form data

    this.appService.Add("api/Auditor/AddEditAuditorDetails", auditorDetails).subscribe((data: any) => {
      if (data.message == "Auditor Detail Added Successfully.") {
        this.successAuditormsg("")
        this.router.navigate(['/pages/master/company/companylist'], { relativeTo: this.route });
      }
      else if (data.message == "Auditor Detail Updated Successfully.") {
        this.successUpdateAuditor("")
        this.router.navigate(['/pages/master/company/companylist'], { relativeTo: this.route });
      }
    });
  }


  comapnyaddwarningrequiredfields(message: any) {
    Swal.fire({
      title: 'Warning',
      text: 'Please Enter Required Fields',
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Ok',
      // cancelButtonText: 'No'
    });
  }
  successUpdateAuditor(message: any) {
    Swal.fire({
      title: 'Account & Auditior Information Update Successfully',
      text: message,
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  successAuditormsg(message: any) {
    Swal.fire({
      title: 'Account & Auditior Information Saved Successfully',
      text: message,
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
  successCompanymsg(message: any) {
    Swal.fire({
      title: 'Company Information Saved Successfully',
      text: message,
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#364574',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }
}




