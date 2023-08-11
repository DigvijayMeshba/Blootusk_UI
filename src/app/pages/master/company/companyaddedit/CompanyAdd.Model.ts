// export class CompanyAddEditModel 
// {
// 	companyId: any;
// 	name: any;
// 	cin: any;
// 	incorporationany: any;
// 	companyTypeId: any;
// 	companyType: any;
// 	companyCategoryId: any;
// 	companyCategory: any;
// 	comapnySubTypeId: any;
// 	subTypeName: any;
// 	phoneany: any;
// 	emailId: any;
// 	startanyFinancialYear: any;
// 	endanyFinancialYear: any;
// 	registerdOfficeAddress: any;
// 	city: any;
// 	pincode: any;
// 	stateId: any;
// 	stateName: any;
// 	countryId: any;
// 	countryName: any;
// 	roc: any;
// 	rocname: any;
// 	brancOfficeAddress: any;
// 	otherAddress: any;
// 	rdjurisdiction: any;
// 	rdjurisdictionName: any;
// 	objectClause: any;
// 	businessActivity: any;
// 	pan: any;
// 	gst: any;
// 	esic: any;
// 	epf: any;
// 	iec: any;
// 	firms: any;
// 	fla: any;
// 	demat: any;
// 	isDeleted: any;
// 	comapnyRelationshipModelEx:
// 		{
// 			id: any,
// 			companyId: any,
// 			childCompanyId: any,
// 			relationshipTypeId: any,
// 			comapnyName: any,
// 			companyAddress: any,
// 			country: any,
// 			sharePercentage: any,
// 			shareAcquisitionany: any,
// 			shareCessationany: any,
// 			applicableSection: any,

// 			ultimateHoldingModel:
// 			{
// 				id: any,
// 				companyRelationId: any,
// 				companyName: any,
// 				cin: any,
// 				companyAddress: any,
// 				countryId: any,
// 				isDeleted: any,

// 			}
		
// 		}
	
// 	"directoryMasterModels": [
// 		{
// 			directorId: any,
// 			din: any,
// 			firstName: any,
// 			middleName: any,
// 			lastName: any,
// 			fatherName: any,
// 			emailId: any,
// 			residentialAddress: any,
// 			residentialAddressCountryId: any,
// 			residentialAddressStateId: any,
// 			residentialAddressCityId: any,
// 			residentialAddressPincode: any,
// 			residentialAddressFileName: any,
// 			residentialAddressFilePath: any,
// 			isResidentialAddressPermanent: true,
// 			parmanentAddress: any,
// 			parmanentAddressCountryId: any,
// 			parmanentAddressStateId: any,
// 			parmanentAddressCityId: any,
// 			parmanentAddressPincode: any,
// 			parmanentAddressFileName: any,
// 			parmanentAddressFilePath: any,
// 			mobileany: any,
// 			pan: any,
// 			drivingLicenseany: any,
// 			passportany: any,
// 			aadhaarany: any,
// 			occupation: any,
// 			dob: any,
// 			nationality: any,
// 			particularsMembershipNo: any,
// 			certificatePracticeNo: any,
// 			isDeleted: true,
// 			createdBy: any,
// 			crany: any,
// 			modifyBy: any,
// 			moany: any,
// 			companyDirectors: [
// 				{
// 					id: any,
// 					companyId: any,
// 					directorId: any,
// 					createdBy: any,
// 					designationId: any,
// 					designationCategoryId: any,
// 					designationSubCategoryId: any,
// 					crany:any,
// 					modifyBy: any,
// 					moany: any
// 				}
// 			],
// 			"externalCompanyOfDirectors": [
// 				{
// 					id: any,
// 					directorId: any,
// 					companyName: any,
// 					cin: any,
// 					designationId: any,
// 					appointmentany: any,
// 					cessationany: any,
// 					shareholdingPercentage: any,
// 					shareholdingAmount: any,
// 					isDeleted: true,
// 					createdBy: any,
// 					crany: any,
// 					modifyBy: any,
// 					moany: any
// 				}
// 			]
// 		}
// 	]
// }





export class CompanyAddEditModel {
	companyId: any;
	name: any;
	cin: any;
	incorporation: any;
	companyTypeId: any;
	companyType: any;
	companyCategoryId: any;
	companyCategory: any;
	comapnySubTypeId: any;
	subTypeName: any;
	phoneNumber: any;
	emailId: any;
	startFinancialYear: any;
	endFinancialYear: any;
	registerdOfficeAddress: any;
	city: any;
	pincode: any;
	stateId: any;
	stateName: any;
	countryId: any;
	countryName: any;
	roc: any;
	rocname: any;
	brancOfficeAddress: any;
	otherAddress: any;
	rdjurisdiction: any;
	rdjurisdictionName: any;
	objectClause: any;
	businessActivity: any;
	pan: any;
	gst: any;
	esic: any;
	epf: any;
	iec: any;
	firms: any;
	fla: any;
	demat: any;
	isDeleted: any;
  
	companyRelationshipModelEx: CompanyRelationshipModelEx | undefined;
  
	directoryMasterModels: DirectoryMasterModel[] | undefined;
  }
  
  export class CompanyRelationshipModelEx {
	id: any;
	companyId: any;
	childCompanyId: any;
	relationshipTypeId: any;
	companyName: any;
	companyAddress: any;
	country: any;
	sharePercentage: any;
	shareAcquisition: any;
	shareCessation: any;
	applicableSection: any;
  
	ultimateHoldingModel: UltimateHoldingModel | undefined;
  }
  
  export class UltimateHoldingModel {
	id: any;
	companyRelationId: any;
	companyName: any;
	cin: any;
	companyAddress: any;
	countryId: any;
	isDeleted: any;
  }
  
  export class DirectoryMasterModel {
	directorId: any;
	din: any;
	firstName: any;
	middleName: any;
	lastName: any;
	fatherName: any;
	emailId: any;
	residentialAddress: any;
	residentialAddressCountryId: any;
	residentialAddressStateId: any;
	residentialAddressCityId: any;
	residentialAddressPincode: any;
	residentialAddressFileName: any;
	residentialAddressFilePath: any;
	isResidentialAddressPermanent: any;
	permanentAddress: any;
	permanentAddressCountryId: any;
	permanentAddressStateId: any;
	permanentAddressCityId: any;
	permanentAddressPincode: any;
	permanentAddressFileName: any;
	permanentAddressFilePath: any;
	mobileany: any;
	pan: any;
	drivingLicenseany: any;
	passportany: any;
	aadhaarany: any;
	occupation: any;
	dob: any;
	nationality: any;
	particularsMembershipNo: any;
	certificatePracticeNo: any;
	isDeleted: any;
	
	// companyDirectors: CompanyDirector[] | undefined;
	externalCompanyOfDirectors: ExternalCompanyOfDirector[] | undefined;
  }
  
//   export class CompanyDirector {
// 	// id: any;
// 	// companyId: any;
// 	// directorId: any;
// 	// createdBy: any;
// 	// designationId: any;
// 	// designationCategoryId: any;
// 	// designationSubCategoryId: any;
// 	// crany: any;
// 	// modifyBy: any;
// 	// moany: any;



// 	din:any;
// 	firstName:any;
	
// 	middleName:any;
// 	lastName:any;
// 	fatherName:any;
// 	residentialAddress:any;

// 	DocPresentResidentialAddress:any///Present Residential Address Document
	
// 	residentialaddresscountryId:any;
// 	residentialaddressstateId:any;
// 	residentialaddresscityId:any;

// 	IsResidentialAddressPermanent:any; //Bool checkbox
// 	ParmanentAddress:any;
// 	ParmanentAddressCountryId:any;
// 	ParmanentAddressStateId:any;
// 	ParmanentAddressCityId:any;
// 	ParmanentAddressPincode:any

// 	// emailId:any;
// 	emailIdDirector:any
// 	MobileNumber:any;
// 	PanDirector:any;
// 	DrivingLicenseDirector:any;
// 	PassportNumberDirector:any;
// 	AadhaarNumberDirector:any;
// 	OccupationDirector:any;
// 	DobDirector:any;
// 	NationalityDirector:any;

// 	designationIdDirector:any;
// 	designationcategoryIdDirector:any;
// 	designationsubcategoryIdDirector:any;

// 	ParticularsMembershipNoDirector:any;
// 	CertificatePracticeNoDirector:any;


// ///Other Director
// isOtherDirectorship :any///bool






//   }
  
  export class ExternalCompanyOfDirector {
	id: any;
	directorId: any;
	companyName: any;
	cin: any;
	designationId: any;
	appointmentany: any;
	cessationany: any;
	shareholdingPercentage: any;
	shareholdingAmount: any;
	isDeleted: any;
	createdBy: any;
	crany: any;
	modifyBy: any;
	moany: any;
  }








//   Tufan
  export class CompanyDirectorModel {

	din:any;
	firstName:any;
	middleName:any;
	lastName:any;
	fatherName:any;
	residentialAddress:any;

	DocPresentResidentialAddress:any///Present Residential Address Document
	
	residentialaddresscountryId:any;
	residentialaddressstateId:any;
	residentialaddresscityId:any;

	IsResidentialAddressPermanent:any; //Bool checkbox

	ParmanentAddressDirector:any;
	ParmanentAddressCountryId:any;
	ParmanentAddressStateId:any;
	ParmanentAddressCityId:any;
	ParmanentAddressPincode:any
	uploadPermantAddressDoc:any

	// emailId:any;
	emailIdDirector:any
	MobileNumber:any;
	PanDirector:any;
	DrivingLicenseDirector:any;
	PassportNumberDirector:any;
	AadhaarNumberDirector:any;
	OccupationDirector:any;
	DobDirector:any;
	NationalityDirector:any;

	designationIdDirector:any;
	designationcategoryIdDirector:any;
	designationsubcategoryIdDirector:any;

	ParticularsMembershipNoDirector:any;
	CertificatePracticeNoDirector:any;


///Other Director
isOtherDirectorship :any///bool






  }