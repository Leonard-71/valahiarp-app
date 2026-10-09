type UpdateSubscriptionInput = {
  name: string;
  servicePackage: string;
  sortOrder: number;
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
