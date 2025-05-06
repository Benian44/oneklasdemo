// Educational content data
import { Cycle, Class, Subject, Lesson } from '../contexts/ContentContext';

// Mock data for the educational platform
export const educationalContent = {
  cycles: [
    {
      id: '1',
      name: 'Collège (1er cycle)',
      description: 'De la classe de 6ème à la classe de 3ème',
      icon: 'school'
    },
    {
      id: '2',
      name: 'Lycée (2nd cycle)',
      description: 'Enseignement général et technique',
      icon: 'graduation-cap'
    }
  ] as Cycle[],

  classes: [
    // 1er Cycle (College)
    {
      id: '1',
      cycleId: '1',
      name: '6ème',
      description: 'Première année du collège'
    },
    {
      id: '2',
      cycleId: '1',
      name: '5ème',
      description: 'Deuxième année du collège'
    },
    {
      id: '3',
      cycleId: '1',
      name: '4ème',
      description: 'Troisième année du collège'
    },
    {
      id: '4',
      cycleId: '1',
      name: '3ème',
      description: 'Quatrième année du collège, année du BEPC'
    },

    // 2nd Cycle - Lycée Général
    {
      id: '5',
      cycleId: '2',
      name: '2nd A',
      description: 'Seconde A - Série littéraire'
    },
    {
      id: '6',
      cycleId: '2',
      name: '2nd C',
      description: 'Seconde C - Série scientifique'
    },
    {
      id: '7',
      cycleId: '2',
      name: '1ère A',
      description: 'Première A - Série littéraire'
    },
    {
      id: '8',
      cycleId: '2',
      name: '1ère C',
      description: 'Première C - Série scientifique'
    },
    {
      id: '9',
      cycleId: '2',
      name: '1ère D',
      description: 'Première D - Série scientifique (SVT)'
    },
    {
      id: '10',
      cycleId: '2',
      name: 'Tle A',
      description: 'Terminale A - Série littéraire'
    },
    {
      id: '11',
      cycleId: '2',
      name: 'Tle C',
      description: 'Terminale C - Série scientifique'
    },
    {
      id: '12',
      cycleId: '2',
      name: 'Tle D',
      description: 'Terminale D - Série scientifique (SVT)'
    },

    // 2nd Cycle - Lycée Technique
    {
      id: '13',
      cycleId: '2',
      name: '2nd AB',
      description: 'Seconde AB - Série économique'
    },
    {
      id: '14',
      cycleId: '2',
      name: '2nd G1',
      description: 'Seconde G1 - Série technique de gestion'
    },
    {
      id: '15',
      cycleId: '2',
      name: '2nd G2',
      description: 'Seconde G2 - Série technique comptable'
    },
    {
      id: '16',
      cycleId: '2',
      name: '1ère B',
      description: 'Première B - Série économique'
    },
    {
      id: '17',
      cycleId: '2',
      name: '1ère G1',
      description: 'Première G1 - Série technique de gestion'
    },
    {
      id: '18',
      cycleId: '2',
      name: '1ère G2',
      description: 'Première G2 - Série technique comptable'
    },
    {
      id: '19',
      cycleId: '2',
      name: 'Tle B',
      description: 'Terminale B - Série économique'
    },
    {
      id: '20',
      cycleId: '2',
      name: 'Tle G1',
      description: 'Terminale G1 - Série technique de gestion'
    },
    {
      id: '21',
      cycleId: '2',
      name: 'Tle G2',
      description: 'Terminale G2 - Série technique comptable'
    }
  ] as Class[],

  subjects: [
    // Common subjects
    {
      id: '1',
      classIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
      name: 'Français',
      description: 'Langue et littérature française',
      icon: 'book-open'
    },
    {
      id: '2',
      classIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
      name: 'Anglais',
      description: 'Langue anglaise',
      icon: 'languages'
    },
    {
      id: '3',
      classIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
      name: 'Mathématiques',
      description: 'Algèbre, géométrie et arithmétique',
      icon: 'calculator'
    },
    
    // Science subjects
    {
      id: '4',
      classIds: ['1', '2', '3', '4', '5', '6', '8', '9', '11', '12'],
      name: 'Physique-Chimie',
      description: 'Sciences physiques et chimiques',
      icon: 'flask'
    },
    {
      id: '5',
      classIds: ['1', '2', '3', '4', '5', '6', '9', '10', '12'],
      name: 'SVT',
      description: 'Sciences de la Vie et de la Terre',
      icon: 'microscope'
    },
    
    // Humanities
    {
      id: '6',
      classIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '16', '19'],
      name: 'Histoire',
      description: 'Histoire nationale et mondiale',
      icon: 'landmark'
    },
    {
      id: '7',
      classIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '16', '19'],
      name: 'Géographie',
      description: 'Géographie nationale et mondiale',
      icon: 'globe'
    },
    {
      id: '8',
      classIds: ['7', '8', '9', '10', '11', '12', '16', '17', '18', '19', '20', '21'],
      name: 'Philosophie',
      description: 'Philosophie générale',
      icon: 'brain'
    },
    
    // Technical subjects
    {
      id: '9',
      classIds: ['13', '14', '15', '16', '17', '18', '19', '20', '21'],
      name: 'Économie',
      description: 'Principes d\'économie',
      icon: 'trending-up'
    },
    {
      id: '10',
      classIds: ['14', '15', '17', '18', '20', '21'],
      name: 'Comptabilité Générale',
      description: 'Principes de comptabilité générale',
      icon: 'dollar-sign'
    },
    {
      id: '11',
      classIds: ['14', '15', '17', '18', '20', '21'],
      name: 'Comptabilité Analytique',
      description: 'Comptabilité analytique et de gestion',
      icon: 'pie-chart'
    },
    {
      id: '12',
      classIds: ['14', '15', '17', '18', '20', '21'],
      name: 'Comptabilité Société',
      description: 'Comptabilité des sociétés',
      icon: 'briefcase'
    }
  ] as Subject[],

  // Generate sample lessons (12 per subject)
  lessons: Array(12 * 12).fill(null).map((_, index) => {
    const subjectId = Math.floor(index / 12) + 1;
    const lessonNumber = index % 12 + 1;
    
    return {
      id: (index + 1).toString(),
      subjectId: subjectId.toString(),
      title: `Leçon ${lessonNumber}`,
      description: `Chapitre ${lessonNumber} du cours`,
      courseUrl: `https://example.com/cours/sujet${subjectId}/lecon${lessonNumber}.pdf`,
      exercisesUrl: `https://example.com/exercices/sujet${subjectId}/lecon${lessonNumber}.pdf`
    };
  }) as Lesson[]
};