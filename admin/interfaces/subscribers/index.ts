export interface ISubscriber {
  _id: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  source: "website" | "homepage" | "popup" | "footer" | "campaign";
  verified: boolean;
  isBlocked: boolean;
  blockedAt: Date;
  blockedReason: string;
  createdAt: Date;
  updatedAt: Date;
}
