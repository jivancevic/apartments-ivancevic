import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VisitCards from './VisitCards';
import { Location } from '../../types';

interface VisitTabsProps {
  locations: Location[];
}

export function VisitTabs({ locations }: VisitTabsProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('attraction-old-town');

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
            {i18n.language === 'en' ? 'Old Town' : 'Stari grad'}
          </TabsTrigger>
          <TabsTrigger value="attraction-island">
            {i18n.language === 'en' ? 'Island' : 'Otok'}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {i18n.language === 'en' ? 'Activities' : 'Aktivnosti'}
          </TabsTrigger>
          <TabsTrigger value="excursion">
            {i18n.language === 'en' ? 'Excursions' : 'Izleti'}
          </TabsTrigger>
          <TabsTrigger value="restaurant">
            {i18n.language === 'en' ? 'Restaurants' : 'Restorani'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attraction-old-town" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {i18n.language === 'en' ? 'Old Town Attractions' : 'Atrakcije u Starom gradu'}
          </h2>
          <VisitCards 
            locations={locationsByType['attraction-old-town'] || []} 
          />
        </TabsContent>

        <TabsContent value="attraction-island" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {i18n.language === 'en' ? 'Island Attractions' : 'Atrakcije na otoku'}
          </h2>
          <VisitCards 
            locations={locationsByType['attraction-island'] || []} 
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {i18n.language === 'en' ? 'Activities' : 'Aktivnosti'}
          </h2>
          <VisitCards 
            locations={locationsByType['activity'] || []} 
          />
        </TabsContent>

        <TabsContent value="excursion" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {i18n.language === 'en' ? 'Excursions' : 'Izleti'}
          </h2>
          <VisitCards 
            locations={locationsByType['excursion'] || []} 
          />
        </TabsContent>

        <TabsContent value="restaurant" className="mt-0">
          <h2 className="text-2xl font-semibold mb-6">
            {i18n.language === 'en' ? 'Restaurants' : 'Restorani'}
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