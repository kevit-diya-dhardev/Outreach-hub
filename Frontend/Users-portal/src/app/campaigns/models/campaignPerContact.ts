export interface CampaignPerContact {
  messagePerContact: {
    type: string;
    text: string;
    imageUrl?: string;
    contactId: {
      tags: string[];
    };
    contact_name: string;
    phoneNumber: number;
  }[];
  campaignId?: {
    name: string;
    description: string;

    message: {
      message_name: string;
    };
  };
  sentAt: Date;
  tags: string[];
}
