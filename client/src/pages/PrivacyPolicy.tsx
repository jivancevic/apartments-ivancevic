import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16">
      <Helmet>
        <title>Privacy Policy | Apartments Ivančević</title>
        <meta name="description" content="Privacy Policy for Apartments Ivančević - Family vacation apartments in Korčula, Croatia" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8">
          {t("privacy.title", "Privacy Policy")}
        </h1>
        
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
          <p className="text-gray-500 italic mb-6">
            {t("privacy.lastUpdated", "Last updated: May 2025")}
          </p>

          <p className="mb-6">
            {t("privacy.welcome", "Welcome to the website of Apartmani Ivančević (\"we\", \"us\", or \"our\"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or contact us.")}
          </p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section1.title", "1. Information We Collect")}</h2>
          <p className="mb-4">{t("privacy.section1.intro", "We collect the following information when you use our website:")}</p>
          
          <h3 className="font-heading font-medium text-lg mb-2">{t("privacy.section1.direct.title", "a) Information You Provide Directly")}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">{t("privacy.section1.direct.item1", "Contact form data: Name, email, phone number (optional), number of guests, check-in and check-out dates, message content.")}</li>
          </ul>
          
          <h3 className="font-heading font-medium text-lg mb-2">{t("privacy.section1.auto.title", "b) Automatically Collected Information")}</h3>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("privacy.section1.auto.item1", "Cookies for session management and user preferences.")}</li>
            <li className="mb-1">{t("privacy.section1.auto.item2", "Website analytics (e.g., Google Analytics) for anonymous visitor behavior tracking.")}</li>
            <li className="mb-1">{t("privacy.section1.auto.item3", "iCal calendar data to show booking availability by syncing with Airbnb and Booking.com.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section2.title", "2. How We Use Your Information")}</h2>
          <p className="mb-4">{t("privacy.section2.intro", "We use your information for the following purposes:")}</p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("privacy.section2.item1", "To respond to your inquiries and booking requests.")}</li>
            <li className="mb-1">{t("privacy.section2.item2", "To show up-to-date availability via integrated calendars.")}</li>
            <li className="mb-1">{t("privacy.section2.item3", "To improve user experience and optimize website performance.")}</li>
            <li className="mb-1">{t("privacy.section2.item4", "To send confirmation emails regarding your inquiry.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section3.title", "3. Who We Share Data With")}</h2>
          <p className="mb-4">{t("privacy.section3.intro", "We do not sell or share your personal data with third parties, except:")}</p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-1">{t("privacy.section3.item1", "Email services (e.g., SMTP provider) used to deliver messages.")}</li>
            <li className="mb-1">{t("privacy.section3.item2", "Analytics providers to understand how visitors use our site.")}</li>
          </ul>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section4.title", "4. Cookies")}</h2>
          <p className="mb-4">{t("privacy.section4.intro", "Our site uses cookies to:")}</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">{t("privacy.section4.item1", "Save your preferences (e.g., language selection).")}</li>
            <li className="mb-1">{t("privacy.section4.item2", "Improve performance and analytics.")}</li>
            <li className="mb-1">{t("privacy.section4.item3", "Enable interactive features like the calendar.")}</li>
          </ul>
          <p className="mb-6">{t("privacy.section4.disable", "You can disable cookies in your browser settings.")}</p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section5.title", "5. Your Rights")}</h2>
          <p className="mb-4">{t("privacy.section5.intro", "If you are an EU/EEA resident, you have rights under GDPR including:")}</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-1">{t("privacy.section5.item1", "Access, correction, or deletion of your personal data.")}</li>
            <li className="mb-1">{t("privacy.section5.item2", "Objection to processing.")}</li>
            <li className="mb-1">{t("privacy.section5.item3", "Data portability.")}</li>
          </ul>
          <p className="mb-6">{t("privacy.section5.exercise", "To exercise these rights, please contact us via the form on the Contact page.")}</p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section6.title", "6. Data Security")}</h2>
          <p className="mb-6">{t("privacy.section6.content", "We implement standard security measures (HTTPS, data access controls) to protect your information. However, no method of transmission is 100% secure.")}</p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section7.title", "7. Third-Party Links")}</h2>
          <p className="mb-6">{t("privacy.section7.content", "Our website links to external booking platforms (e.g., Airbnb, Booking.com). We are not responsible for their privacy practices.")}</p>

          <hr className="my-6 border-gray-200" />

          <h2 className="font-heading font-semibold text-xl mb-4">{t("privacy.section8.title", "8. Contact Us")}</h2>
          <p className="mb-4">{t("privacy.section8.intro", "If you have any questions about this Privacy Policy, please contact us at:")}</p>
          <p className="mb-1"><strong>{t("privacy.section8.email", "Email:")}</strong> <a href="mailto:josip.ivancevic00@gmail.com" className="text-primary hover:underline">josip.ivancevic00@gmail.com</a></p>
          <p className="mb-6"><strong>{t("privacy.section8.phone", "Phone:")}</strong> +385 91 516 2223</p>

          <hr className="my-6 border-gray-200" />

          <p className="text-gray-600 text-sm">
            {t("privacy.update", "We may update this policy occasionally. The latest version will always be available on this page.")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;