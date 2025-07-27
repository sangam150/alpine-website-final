import ReferralForm from "@/components/marketing/ReferralForm";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { OrganizationStructuredData } from "@/components/layout/StructuredData";

export default function ReferralPage() {
  const breadcrumbItems = [{ label: "Referral Program", current: true }];

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Referral Form */}
        <ReferralForm />
      </div>
    </>
  );
}
