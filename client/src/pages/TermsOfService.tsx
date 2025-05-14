import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const TermsOfService = () => {
  const { t } = useTranslation();
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  return (
    <section className="py-12 md:py-16">
      <Helmet>
        <title>Terms of Service | Apartments Ivančević</title>
        <meta name="description" content="Terms of Service for Apartments Ivančević - Family vacation apartments in Korčula, Croatia" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8">
          {t("terms.title", "Terms of Service")}
        </h1>
        
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
          <p className="text-gray-500 italic mb-6">
            {t("terms.effectiveDate", "Effective Date:")} {currentDate}
          </p>

          <p className="mb-6">
            {t("terms.welcome", "Welcome to Apartments Ivančević (\"we\", \"us\", \"our\"). By accessing or using our website, https://apartmentsivancevic.com (the \"Site\"), you agree to be bound by the following Terms of Service. Please read them carefully.")}
          </p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section1.title", "1. Use of the Website")}</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("terms.section1.item1", "The Site provides information about our family-owned apartments on the island of Korčula, including descriptions, images, availability, and pricing.")}</li>
            <li className="mb-1">{t("terms.section1.item2", "By using our site, you represent that you are at least 18 years old or are visiting under the supervision of a parent or guardian.")}</li>
            <li className="mb-1">{t("terms.section1.item3", "You may use the Site for lawful purposes only.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section2.title", "2. Booking Inquiries")}</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("terms.section2.item1", "Our website enables users to select check-in and check-out dates, view apartment availability, and send an inquiry using the contact form.")}</li>
            <li className="mb-1">{t("terms.section2.item2", "Submitting an inquiry does not constitute a confirmed booking. We will respond to your inquiry via email to finalize your reservation.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section3.title", "3. Prices")}</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("terms.section3.item1", "Prices vary depending on the season and are clearly displayed in the calendar view.")}</li>
            <li className="mb-1">{t("terms.section3.item2", "The total cost includes the nightly rate and a cleaning fee, which is shown in the price breakdown before confirmation.")}</li>
            <li className="mb-1">{t("terms.section3.item3", "Prices are subject to change and will be confirmed in the final booking email.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section4.title", "4. User Responsibilities")}</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("terms.section4.item1", "You agree to provide accurate, complete, and current information when submitting inquiries.")}</li>
            <li className="mb-1">{t("terms.section4.item2", "You must not use our site to submit false or fraudulent information.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section5.title", "5. Intellectual Property")}</h2>
          <p className="mb-6">{t("terms.section5.content", "All content on the Site including text, images, branding, and design is the property of Apartments Ivančević and may not be copied or used without written permission.")}</p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section6.title", "6. Privacy")}</h2>
          <p className="mb-6">
            {t("terms.section6.content", "We respect your privacy. Please refer to our ")}
            <a href="/privacy-policy" className="text-primary hover:underline">
              {t("terms.section6.privacyLink", "Privacy Policy")}
            </a>
            {t("terms.section6.contentEnd", " for details on how we handle your personal data.")}
          </p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section7.title", "7. Changes to Terms")}</h2>
          <p className="mb-6">{t("terms.section7.content", "We may update these Terms at any time. Changes will be posted on this page with the revised effective date.")}</p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("terms.section8.title", "8. Contact")}</h2>
          <p className="mb-4">{t("terms.section8.intro", "If you have any questions about these Terms, please contact us at:")}</p>
          <p className="mb-6"><strong>{t("terms.section8.email", "Email:")}</strong> <a href="mailto:josip.ivancevic00@gmail.com" className="text-primary hover:underline">josip.ivancevic00@gmail.com</a></p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;