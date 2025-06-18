import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4">
      <section className="mt-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8">
          {t("about.title")}
        </h2>
        
        <div className="grid grid-cols-1 gap-4 items-center max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl">
            {t("about.family.title")}
          </h2>
          
          <div>
            <img 
              src="/images/ivancevici.jpg" 
              alt="Ivančević Family" 
              className="rounded-md shadow-lg w-full"
            />
          </div>

          <p></p>

          <p className="mb-4">
            {t("about.family.story1")}
          </p>

          <p className="mb-4">
            {t("about.family.story2")}
          </p>

          <p className="mb-4">
            {t("about.family.story3")}
          </p>

          <p className="mb-4">
            {t("about.family.story4")}
          </p>

          <p className="mb-4">
            {t("about.family.story5")}
          </p>

          <p className="mb-4">
            {t("about.family.story6")}
          </p>

          <h3 className="mb-4">
            {t("about.family.story7")}
          </h3>
          
        </div>
         
      </section>
      
    </div>
  );
};

export default About;