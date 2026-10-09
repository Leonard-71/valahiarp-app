type UpdateSubscriptionInput = {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  isRecommended: boolean;
  dependsOnParentId?: number;
  location?: {
    xCoordinate: number;
    yCoordinate: number;
  };
};

export type { UpdateSubscriptionInput };
