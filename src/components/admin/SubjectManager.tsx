import React, { useState, useEffect } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useContent } from '../../contexts/ContentContext';
import { subjectService, type Subject, type CourseContent } from '../../services/subjectService';

const SubjectManager: React.FC = () => {
  const { cycles, classes, getClassesByCycle } = useContent();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [availableClasses, setAvailableClasses] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    subjectId: '',
    pdfFile: null as File | null,
    youtubeUrl: '',
    exerciseFile: null as File | null,
    homeworkFile: null as File | null
  });

  useEffect(() => {
    if (selectedCycle) {
      const cycleClasses = getClassesByCycle(selectedCycle);
      setAvailableClasses(cycleClasses);
    }
  }, [selectedCycle]);

  useEffect(() => {
    if (selectedCycle && selectedClass) {
      loadSubjects();
    }
  }, [selectedCycle, selectedClass]);

  const loadSubjects = async () => {
    const data = await subjectService.getSubjectsByClass(selectedCycle, selectedClass);
    setSubjects(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pdfFile' | 'exerciseFile' | 'homeworkFile') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simuler le stockage des fichiers (dans un vrai cas, vous utiliseriez un service de stockage)
      const pdfUrl = formData.pdfFile ? URL.createObjectURL(formData.pdfFile) : '';
      const exercisePdfUrl = formData.exerciseFile ? URL.createObjectURL(formData.exerciseFile) : '';
      const homeworkPdfUrl = formData.homeworkFile ? URL.createObjectURL(formData.homeworkFile) : '';

      await subjectService.addCourseContent({
        subjectId: formData.subjectId,
        title: formData.title,
        pdfUrl,
        youtubeUrl: formData.youtubeUrl,
        exercisePdfUrl,
        homeworkPdfUrl
      });

      setIsAddModalOpen(false);
      setFormData({
        title: '',
        subjectId: '',
        pdfFile: null,
        youtubeUrl: '',
        exerciseFile: null,
        homeworkFile: null
      });
      
      // Recharger les matières
      await loadSubjects();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contenu:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Matières</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Cours
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cycle
          </label>
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un cycle</option>
            {cycles.map(cycle => (
              <option key={cycle.id} value={cycle.id}>
                {cycle.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classe
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!selectedCycle}
          >
            <option value="">Sélectionnez une classe</option>
            {availableClasses.map(classe => (
              <option key={classe.id} value={classe.id}>
                {classe.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un Cours</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du cours
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matière
              </label>
              <select
                value={formData.subjectId}
                onChange={(e) => setFormData(prev => ({ ...prev, subjectId: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Sélectionnez une matière</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier du cours (PDF)
              </label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'pdfFile')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien YouTube
              </label>
              <Input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier d'exercices (PDF)
              </label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'exerciseFile')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier de devoir (PDF)
              </label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'homeworkFile')}
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Ajouter
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectManager; 