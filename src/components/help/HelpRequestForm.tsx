import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { helpRequestService } from '../../services/helpRequestService';

interface HelpRequestFormProps {
  userId: string;
  lessonId: string;
  subject: string;
  onRequestSubmitted?: () => void;
}

const HelpRequestForm: React.FC<HelpRequestFormProps> = ({
  userId,
  lessonId,
  subject,
  onRequestSubmitted
}) => {
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let attachmentUrl;
      if (attachment) {
        // Dans une vraie application, vous téléchargeriez le fichier vers un serveur
        // et obtiendriez une URL
        attachmentUrl = URL.createObjectURL(attachment);
      }

      await helpRequestService.createRequest({
        userId,
        lessonId,
        subject,
        description,
        attachmentUrl
      });

      setDescription('');
      setAttachment(null);
      onRequestSubmitted?.();
      
      alert('Votre demande a été envoyée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre demande.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Besoin d'aide ?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Décrivez votre difficulté
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Expliquez en détail ce que vous ne comprenez pas..."
              required
              className="min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pièce jointe (optionnel)
            </label>
            <Input
              type="file"
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="text-sm text-gray-500 mt-1">
              Vous pouvez joindre une capture d'écran ou un document PDF
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HelpRequestForm; 