interface HelpRequest {
  id: string;
  userId: string;
  lessonId: string;
  subject: string;
  description: string;
  status: 'pending' | 'inProgress' | 'resolved';
  createdAt: string;
  attachmentUrl?: string;
  response?: {
    text: string;
    respondedBy: string;
    respondedAt: string;
  };
}

const STORAGE_KEY = 'oneklas_help_requests';

class HelpRequestService {
  private getStoredRequests(): HelpRequest[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveRequests(requests: HelpRequest[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }

  async createRequest(request: Omit<HelpRequest, 'id' | 'status' | 'createdAt'>): Promise<HelpRequest> {
    const requests = this.getStoredRequests();
    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...request
    };
    
    requests.push(newRequest);
    this.saveRequests(requests);
    return newRequest;
  }

  async getRequestsByUser(userId: string): Promise<HelpRequest[]> {
    const requests = this.getStoredRequests();
    return requests
      .filter(request => request.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAllRequests(): Promise<HelpRequest[]> {
    const requests = this.getStoredRequests();
    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateRequestStatus(requestId: string, status: HelpRequest['status']): Promise<HelpRequest | null> {
    const requests = this.getStoredRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index === -1) return null;

    requests[index] = {
      ...requests[index],
      status
    };
    
    this.saveRequests(requests);
    return requests[index];
  }

  async respondToRequest(
    requestId: string,
    response: { text: string; respondedBy: string }
  ): Promise<HelpRequest | null> {
    const requests = this.getStoredRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index === -1) return null;

    requests[index] = {
      ...requests[index],
      status: 'resolved',
      response: {
        ...response,
        respondedAt: new Date().toISOString()
      }
    };
    
    this.saveRequests(requests);
    return requests[index];
  }
}

export const helpRequestService = new HelpRequestService();
export type { HelpRequest }; 