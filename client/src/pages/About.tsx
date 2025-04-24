import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <section>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-center mb-12">
          {t("about.title")}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/ivancevici.jpg" 
              alt="Ivančević Family" 
              className="rounded-md shadow-lg w-full"
            />
          </div>
          
          <div>
            <h2 className="font-heading font-semibold text-2xl mb-6">
              {t("about.family.title")}
            </h2>
            
            <p className="mb-4">
              {t("about.family.story1")}
            </p>
            
            <p className="mb-4">
              {t("about.family.story2")}
            </p>
            
            <p className="mb-6">
              {t("about.family.story3")}
            </p>
            
            <div className="bg-neutral p-6 rounded-md">
              <h3 className="font-heading font-medium text-xl mb-4">
                {t("about.mission.title")}
              </h3>
              <p>
                {t("about.mission.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mt-16">
        <h2 className="font-heading font-semibold text-3xl text-center mb-8">
          {t("about.history.title")}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">
            {t("about.history.paragraph1")}
          </p>
          
          <p className="mb-4">
            {t("about.history.paragraph2")}
          </p>
          
          <p>
            {t("about.history.paragraph3")}
          </p>
        </div>
      </section>
      
      <section className="mt-16">
        <h2 className="font-heading font-semibold text-3xl text-center mb-8">
          {t("about.korculaHistory.title")}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">
            {t("about.korculaHistory.paragraph1")}
          </p>
          
          <p className="mb-4">
            {t("about.korculaHistory.paragraph2")}
          </p>
          
          <p>
            {t("about.korculaHistory.paragraph3")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;