import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VisitCards from './VisitCards';
import { Location } from '../../types';
import { categories, CATEGORY_TO_TYPE_MAP } from '../../lib/categories';

interface VisitTabsProps {
  locations: Location[];
}

export function VisitTabs({ locations }: VisitTabsProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('attraction-old-town');
  const isEnglish = i18n.language === 'en';

  // Group locations by type
  const locationsByType = locations.reduce((acc, location) => {
    const type = location.typeEn;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(location);
    return acc;
  }, {} as Record<string, Location[]>);

  return (
    <div className="container py-8">
      <Tabs defaultValue="attraction-old-town" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="attraction-old-town">
            {isEnglish ? categories.attractionsOldTown.en : categories.attractionsOldTown.hr}
          </TabsTrigger>
          <TabsTrigger value="attraction-island">
            {isEnglish ? categories.attractionsIsland.en : categories.attractionsIsland.hr}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {isEnglish ? categories.activities.en : categories.activities.hr}
          </TabsTrigger>
          <TabsTrigger value="excursion">
            {isEnglish ? categories.excursions.en : categories.excursions.hr}
          </TabsTrigger>
          <TabsTrigger value="restaurant">
            {isEnglish ? categories.restaurants.en : categories.restaurants.hr}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attraction-old-town" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {isEnglish ? categories.attractionsOldTown.en : categories.attractionsOldTown.hr}
          </h2>
          <VisitCards 
            locations={locationsByType['attraction-old-town'] || []} 
          />
        </TabsContent>

        <TabsContent value="attraction-island" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {isEnglish ? categories.attractionsIsland.en : categories.attractionsIsland.hr}
          </h2>
          <VisitCards 
            locations={locationsByType['attraction-island'] || []} 
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {isEnglish ? categories.activities.en : categories.activities.hr}
          </h2>
          <VisitCards 
            locations={locationsByType['activity'] || []} 
          />
        </TabsContent>

        <TabsContent value="excursion" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {isEnglish ? categories.excursions.en : categories.excursions.hr}
          </h2>
          <VisitCards 
            locations={locationsByType['excursion'] || []} 
          />
        </TabsContent>

        <TabsContent value="restaurant" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {isEnglish ? categories.restaurants.en : categories.restaurants.hr}
          </h2>
          <VisitCards 
            locations={locationsByType['restaurant'] || []} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default VisitTabs;