interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  cycleId: string;
  classId: string;
  userType: 'student' | 'parent' | 'teacher';
  isAdmin?: boolean;
  createdAt: string;
  gender: 'male' | 'female';
  qualifications?: string;
  subjectIds?: string[];
  childrenIds?: string[];
}

interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  cycleId: string;
  classId: string;
  userType: 'student' | 'parent' | 'teacher';
  gender: 'male' | 'female';
  qualifications?: string;
  subjectIds?: string[];
  childrenIds?: string[];
}

const STORAGE_KEY = 'oneklas_users';

class AuthService {
  private getUsers(): User[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  async register(data: RegisterData): Promise<User> {
    const users = this.getUsers();
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.phone === data.phone);
    if (existingUser) {
      throw new Error('Un utilisateur avec ce numéro de téléphone existe déjà');
    }

    const newUser: User = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isAdmin: false,
      ...data
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  async login(phone: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(u => u.phone === phone) || null;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    this.saveUsers(users);
    return users[index];
  }

  async getUserById(userId: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(u => u.id === userId) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.getUsers();
  }
}

export const authService = new AuthService();
export type { User, RegisterData }; 