export interface Campaigns {
  name: string;
  description: string;
  selectedTags: string[];
  _id?: string;
  status?: string;
  workspace_id: string;
  message: {
    message_name: string;
    type: string;
    text: string;
    imageUrl?: string;
    message_id?: string;
  };
}
