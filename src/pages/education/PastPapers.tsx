import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Eye } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Button from '../../components/ui/Button';

interface PastPaper {
  id: string;
  year: number;
  zone?: string; // For BEPC
  series?: string; // For BAC
  title: string;
  type: 'question' | 'answer';
  fileUrl: string;
}

const PastPapers: React.FC = () => {
  const { examType, subjectId } = useParams<{ examType: string; subjectId: string }>();
  const { getSubjectById } = useContent();
  const subject = subjectId ? getSubjectById(subjectId) : undefined;

  // Mock past papers data organized by exam type
  const getPastPapers = (): PastPaper[] => {
    const years = [2023, 2022, 2021, 2020, 2019];
    const papers: PastPaper[] = [];

    if (examType === 'bepc') {
      const zones = ['Zone 1', 'Zone 2', 'Zone 3'];
      zones.forEach(zone => {
        years.forEach(year => {
          papers.push(
            {
              id: `${year}-${zone}-q`,
              year,
              zone,
              title: `Sujet BEPC ${year} - ${zone}`,
              type: 'question',
              fileUrl: `#`
            },
            {
              id: `${year}-${zone}-a`,
              year,
              zone,
              title: `Corrigé BEPC ${year} - ${zone}`,
              type: 'answer',
              fileUrl: `#`
            }
          );
        });
      });
    } else if (examType === 'bac') {
      const series = ['A', 'B', 'C', 'D', 'G1', 'G2'];
      series.forEach(serie => {
        years.forEach(year => {
          papers.push(
            {
              id: `${year}-${serie}-q`,
              year,
              series: serie,
              title: `Sujet BAC ${serie} ${year}`,
              type: 'question',
              fileUrl: `#`
            },
            {
              id: `${year}-${serie}-a`,
              year,
              series: serie,
              title: `Corrigé BAC ${serie} ${year}`,
              type: 'answer',
              fileUrl: `#`
            }
          );
        });
      });
    }

    return papers;
  };

  const pastPapers = getPastPapers();

  // Group papers by year
  const papersByYear = pastPapers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, PastPaper[]>);

  if (!subject) {
    return (
      <div className="page-container">
        <p>Matière non trouvée</p>
        <Link to="/exam-prep">Retour à la préparation des examens</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link 
        to={`/exam-prep/${examType}/subjects`} 
        className="text-blue-700 hover:text-blue-800 flex items-center mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour aux matières
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {subject.name} - {examType?.toUpperCase()}
        </h1>
        <p className="text-gray-600">
          Sujets et corrigés des années précédentes pour vous aider à préparer votre {examType?.toUpperCase()}.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(papersByYear).map(([year, papers]) => (
          <div key={year} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="font-semibold">Session {year}</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {papers.map((paper) => (
                <div key={paper.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-4 ${
                      paper.type === 'question' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        paper.type === 'question' ? 'text-blue-800' : 'text-green-800'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{paper.title}</h3>
                      <p className="text-sm text-gray-500">
                        {paper.type === 'question' ? 'Sujet d\'examen' : 'Corrigé détaillé'}
                        {paper.zone && ` - ${paper.zone}`}
                        {paper.series && ` - Série ${paper.series}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye className="h-4 w-4" />}
                      onClick={() => window.open(paper.fileUrl, '_blank')}
                    >
                      Aperçu
                    </Button>
                    <Button
                      variant={paper.type === 'question' ? 'primary' : 'secondary'}
                      size="sm"
                      leftIcon={<Download className="h-4 w-4" />}
                      onClick={() => window.open(paper.fileUrl, '_blank')}
                    >
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Study Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold mb-4">Conseils pour cette matière</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
              <FileText className="h-4 w-4 text-blue-800" />
            </div>
            <p>Lisez attentivement les consignes avant de commencer à répondre.</p>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
              <FileText className="h-4 w-4 text-blue-800" />
            </div>
            <p>Gérez bien votre temps en accordant le temps nécessaire à chaque partie.</p>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
              <FileText className="h-4 w-4 text-blue-800" />
            </div>
            <p>Relisez-vous pour éviter les erreurs d'inattention.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PastPapers;