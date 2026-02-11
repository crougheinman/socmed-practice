export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: string;
  timePlaced: string;
  status: 'baking' | 'preparing' | 'ready';
  actionLabel: string;
  actionIcon: string;
}

export type OrderStatus = Order['status'];
