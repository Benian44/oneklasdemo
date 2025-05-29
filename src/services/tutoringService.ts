interface TutoringLevel {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  subjects: string[];
}

interface TutoringRegistration {
  id: string;
  userId: string;
  levelId: string;
  subjects: string[];
  paymentStatus: 'pending' | 'completed';
  registrationDate: string;
  paymentDate?: string;
  paymentProof?: string;
}

const LEVELS_STORAGE_KEY = 'oneklas_tutoring_levels';
const REGISTRATIONS_STORAGE_KEY = 'oneklas_tutoring_registrations';
const PAYMENT_INFO = {
  waveNumber: '+221 77 000 00 00',
  instructions: 'Veuillez effectuer le paiement via Wave et envoyer une capture d\'écran comme preuve.'
};

class TutoringService {
  private getLevels(): TutoringLevel[] {
    const stored = localStorage.getItem(LEVELS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveLevels(levels: TutoringLevel[]): void {
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));
  }

  private getRegistrations(): TutoringRegistration[] {
    const stored = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveRegistrations(registrations: TutoringRegistration[]): void {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registrations));
  }

  async getAllLevels(): Promise<TutoringLevel[]> {
    return this.getLevels();
  }

  async createLevel(level: Omit<TutoringLevel, 'id'>): Promise<TutoringLevel> {
    const levels = this.getLevels();
    const newLevel: TutoringLevel = {
      id: Date.now().toString(),
      ...level
    };
    
    levels.push(newLevel);
    this.saveLevels(levels);
    return newLevel;
  }

  async updateLevel(id: string, updates: Partial<TutoringLevel>): Promise<TutoringLevel | null> {
    const levels = this.getLevels();
    const index = levels.findIndex(l => l.id === id);
    if (index === -1) return null;

    levels[index] = { ...levels[index], ...updates };
    this.saveLevels(levels);
    return levels[index];
  }

  async deleteLevel(id: string): Promise<boolean> {
    const levels = this.getLevels();
    const filtered = levels.filter(l => l.id !== id);
    if (filtered.length === levels.length) return false;
    
    this.saveLevels(filtered);
    return true;
  }

  async registerForTutoring(registration: Omit<TutoringRegistration, 'id' | 'registrationDate' | 'paymentStatus'>): Promise<TutoringRegistration> {
    const registrations = this.getRegistrations();
    const newRegistration: TutoringRegistration = {
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
      paymentStatus: 'pending',
      ...registration
    };
    
    registrations.push(newRegistration);
    this.saveRegistrations(registrations);
    return newRegistration;
  }

  async updatePaymentStatus(registrationId: string, status: 'completed', paymentDate: string): Promise<TutoringRegistration | null> {
    const registrations = this.getRegistrations();
    const index = registrations.findIndex(r => r.id === registrationId);
    if (index === -1) return null;

    registrations[index] = {
      ...registrations[index],
      paymentStatus: status,
      paymentDate
    };
    
    this.saveRegistrations(registrations);
    return registrations[index];
  }

  async getRegistrationsByUser(userId: string): Promise<TutoringRegistration[]> {
    const registrations = this.getRegistrations();
    return registrations.filter(r => r.userId === userId);
  }

  async getAllRegistrations(): Promise<TutoringRegistration[]> {
    return this.getRegistrations();
  }

  getPaymentInfo() {
    return PAYMENT_INFO;
  }
}

export const tutoringService = new TutoringService();
export type { TutoringLevel, TutoringRegistration }; 