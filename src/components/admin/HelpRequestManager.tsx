import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { helpRequestService, type HelpRequest } from '../../services/helpRequestService';
import { useAuth } from '../../contexts/AuthContext';

const HelpRequestManager: React.FC = () => {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [response, setResponse] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const data = await helpRequestService.getAllRequests();
    setRequests(data);
  };

  const handleStatusChange = async (requestId: string, status: HelpRequest['status']) => {
    await helpRequestService.updateRequestStatus(requestId, status);
    await loadRequests();
  };

  const handleSubmitResponse = async (requestId: string) => {
    if (!user) return;
    
    await helpRequestService.respondToRequest(requestId, {
      text: response,
      respondedBy: user.id
    });
    
    setResponse('');
    setSelectedRequest(null);
    await loadRequests();
  };

  const getStatusBadgeClass = (status: HelpRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Demandes d'aide</h2>

      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Demande d'aide en {request.subject}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                  {request.status === 'pending' ? 'En attente' :
                   request.status === 'inProgress' ? 'En cours' :
                   'Résolu'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{request.description}</p>
              </div>

              {request.attachmentUrl && (
                <div>
                  <h4 className="font-medium mb-2">Pièce jointe</h4>
                  <a
                    href={request.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Voir la pièce jointe
                  </a>
                </div>
              )}

              {request.response ? (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Réponse</h4>
                  <p className="text-gray-600">{request.response.text}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Répondu le {new Date(request.response.respondedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(request.id, 'inProgress')}
                      disabled={request.status === 'inProgress'}
                    >
                      Prendre en charge
                    </Button>
                    <Button
                      onClick={() => setSelectedRequest(request)}
                    >
                      Répondre
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune demande d'aide pour le moment.
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Répondre à la demande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre réponse
                  </label>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="min-h-[150px]"
                    placeholder="Écrivez votre réponse ici..."
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedRequest(null);
                      setResponse('');
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleSubmitResponse(selectedRequest.id)}
                    disabled={!response.trim()}
                  >
                    Envoyer la réponse
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HelpRequestManager; 