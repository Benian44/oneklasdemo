import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { homeworkService, type Homework } from '../../services/homeworkService';

const levels = [
  '6ème', '5ème', '4ème', '3ème',
  '2nde', '1ère', 'Terminale'
];

const subjects = [
  'Mathématiques', 'Physique-Chimie', 'SVT',
  'Français', 'Histoire-Géographie', 'Anglais'
];

const HomeworkManager: React.FC = () => {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    level: '',
    trimester: 1,
  });

  useEffect(() => {
    loadHomeworks();
  }, []);

  const loadHomeworks = async () => {
    const data = await homeworkService.getAllHomeworks();
    setHomeworks(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      await homeworkService.addHomework(formData, selectedFile);
      await loadHomeworks();
      setIsAddModalOpen(false);
      setFormData({
        title: '',
        subject: '',
        level: '',
        trimester: 1,
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du devoir:', error);
      // TODO: Afficher un message d'erreur à l'utilisateur
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await homeworkService.deleteHomework(id);
      await loadHomeworks();
    } catch (error) {
      console.error('Erreur lors de la suppression du devoir:', error);
      // TODO: Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Devoirs Corrigés</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter un devoir
        </button>
      </div>

      {/* Liste des devoirs */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matière
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Niveau
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trimestre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'ajout
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {homeworks.map((homework) => (
              <tr key={homework.id}>
                <td className="px-6 py-4 whitespace-nowrap">{homework.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{homework.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{homework.level}</td>
                <td className="px-6 py-4 whitespace-nowrap">{homework.trimester}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(homework.uploadDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDelete(homework.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Ajouter un devoir corrigé</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Matière
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner une matière</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Niveau
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner un niveau</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trimestre
                  </label>
                  <select
                    value={formData.trimester}
                    onChange={(e) => setFormData({ ...formData, trimester: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value={1}>1er Trimestre</option>
                    <option value={2}>2ème Trimestre</option>
                    <option value={3}>3ème Trimestre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fichier PDF
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Télécharger un fichier</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF jusqu'à 10MB</p>
                      {selectedFile && (
                        <p className="text-sm text-green-600">
                          Fichier sélectionné : {selectedFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkManager; 