using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DCSPolicies
    {
        public int? PolicyId { get; set; }
        public int? ProjectId { get; set; }
        public string? PolicyName { get; set; }
        public string? Description { get; set; }
        public string? UpdateDate { get; set; }
        public string? CreatedDate { get; set; }
        public string? Type { get; set; }
        public bool? Status { get; set; }
    }
	public enum DCSPolicyType
	{
		Admission,
		Discharge,
		Treatment,
		Medication,
		StaffCodeOfConduct,
		PatientRights,
		Confidentiality,
		EmergencyProcedures,
		InfectionControl,
		DataPrivacyAndSecurity,
		BillingAndFinancialManagement,
		QualityAssurance,
		PatientSafety,
		HumanResourcesAndStaffing,
		FacilityManagement,
		CommunicationAndPatientInteraction,
		ResearchAndClinicalTrials,
		LegalAndCompliance,
		ResourceAllocation,
		Telemedicine,
		VolunteerManagement,
		SustainabilityAndEnvironmentalPractices,
		Other
	}

}
