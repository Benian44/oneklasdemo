import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Download } from 'lucide-react';
import { homeworkService, type Homework } from '../../services/homeworkService';

interface CorrectedHomeworkProps {
  level: string;
}

const CorrectedHomework: React.FC<CorrectedHomeworkProps> = ({ level }) => {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeworks();
  }, [level]);

  const loadHomeworks = async () => {
    try {
      const data = await homeworkService.getHomeworksByLevel(level);
      setHomeworks(data);
    } catch (error) {
      console.error('Erreur lors du chargement des devoirs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHomeworksByTrimester = (trimester: number) => {
    return homeworks.filter(hw => hw.trimester === trimester);
  };

  const trimesters = [
    { id: 1, name: '1er Trimestre' },
    { id: 2, name: '2ème Trimestre' },
    { id: 3, name: '3ème Trimestre' },
  ];

  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6">Devoirs Corrigés - {level}</h2>
      
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {trimesters.map((trimester) => (
            <TabsTrigger 
              key={trimester.id} 
              value={trimester.id.toString()}
              className="text-lg py-3"
            >
              {trimester.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {trimesters.map((trimester) => (
          <TabsContent key={trimester.id} value={trimester.id.toString()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getHomeworksByTrimester(trimester.id).length > 0 ? (
                getHomeworksByTrimester(trimester.id).map((homework) => (
                  <Card key={homework.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{homework.title}</span>
                        <a 
                          href={homework.fileUrl}
                          className="p-2 rounded-full hover:bg-gray-100"
                          title="Télécharger"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{homework.subject}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(homework.uploadDate).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Aucun devoir corrigé disponible pour ce trimestre.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CorrectedHomework; 