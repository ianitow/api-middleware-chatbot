export interface SendMessageResponseProperties {
  query: string;
  answers: [
    {
      answer: string;
      type: string;
      score: number;
      context: string;
      offsets_in_document: [
        {
          start: number;
          end: number;
        }
      ];
      offsets_in_context: [
        {
          start: number;
          end: number;
        }
      ];
      document_id: string;
      meta: {
        _split_id: number;
        name: string;
      };
    }
  ];
}
