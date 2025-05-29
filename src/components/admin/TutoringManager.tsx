import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { tutoringService, type TutoringLevel, type TutoringRegistration } from '../../services/tutoringService';
import { Edit, Trash, Plus, CheckCircle, XCircle } from 'lucide-react';

const TutoringManager: React.FC = () => {
  const [levels, setLevels] = useState<TutoringLevel[]>([]);
  const [registrations, setRegistrations] = useState<TutoringRegistration[]>([]);
  const [isAddingLevel, setIsAddingLevel] = useState(false);
  const [newLevel, setNewLevel] = useState({
    name: '',
    description: '',
    pricePerHour: 0,
    subjects: [] as string[]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [levelsData, registrationsData] = await Promise.all([
      tutoringService.getAllLevels(),
      tutoringService.getAllRegistrations()
    ]);
    setLevels(levelsData);
    setRegistrations(registrationsData);
  };

  const handleAddLevel = async () => {
    await tutoringService.createLevel(newLevel);
    setIsAddingLevel(false);
    setNewLevel({ name: '', description: '', pricePerHour: 0, subjects: [] });
    await loadData();
  };

  const handleDeleteLevel = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')) {
      await tutoringService.deleteLevel(id);
      await loadData();
    }
  };

  const handleUpdatePaymentStatus = async (registrationId: string) => {
    await tutoringService.updatePaymentStatus(
      registrationId,
      'completed',
      new Date().toISOString()
    );
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Cours à Domicile</h2>
        <Button
          onClick={() => setIsAddingLevel(true)}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un niveau
        </Button>
      </div>

      {/* Formulaire d'ajout de niveau */}
      {isAddingLevel && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nouveau niveau</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom du niveau</label>
                <Input
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                  placeholder="ex: 6ème"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  placeholder="Description du niveau et des cours proposés"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prix par heure (FCFA)</label>
                <Input
                  type="number"
                  value={newLevel.pricePerHour}
                  onChange={(e) => setNewLevel({ ...newLevel, pricePerHour: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Matières (séparées par des virgules)</label>
                <Input
                  value={newLevel.subjects.join(', ')}
                  onChange={(e) => setNewLevel({ ...newLevel, subjects: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Mathématiques, Physique, Français"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsAddingLevel(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddLevel}>
                  Ajouter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des niveaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <Card key={level.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{level.name}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleDeleteLevel(level.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{level.description}</p>
              <p className="font-medium">{level.pricePerHour.toLocaleString()} FCFA/heure</p>
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Matières :</p>
                <div className="flex flex-wrap gap-2">
                  {level.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste des inscriptions */}
      <h3 className="text-xl font-bold mt-8 mb-4">Inscriptions aux cours</h3>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Niveau</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matières</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrations.map((registration) => {
                const level = levels.find(l => l.id === registration.levelId);
                return (
                  <tr key={registration.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(registration.registrationDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {level?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {registration.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          registration.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {registration.paymentStatus === 'completed' ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Payé
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-1" />
                            En attente
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registration.paymentStatus === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdatePaymentStatus(registration.id)}
                        >
                          Valider le paiement
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {registrations.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Aucune inscription pour le moment
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TutoringManager; 